#!/usr/bin/env node

import {
  access,
  readFile,
  readdir,
  rename,
  stat,
  unlink,
  writeFile,
} from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import process from "node:process";
import { createInterface } from "node:readline/promises";
import { fileURLToPath } from "node:url";

const RESET = "\u001B[0m";
const BOLD = "\u001B[1m";
const DIM = "\u001B[2m";
const RED = "\u001B[31m";
const GREEN = "\u001B[32m";
const CYAN = "\u001B[36m";
const YELLOW = "\u001B[33m";

const HIGHLIGHT = "\u001B[38;5;219m";
const INFO = "\u001B[38;5;45m";
const SUCCESS = "\u001B[38;5;121m";

const TEMPLATE_PACKAGE_NAME = "typescript-library-template";
const TEMPLATE_ROOT_PACKAGE_NAME = "typescript-library-template-monorepo";
const TEMPLATE_DOCS_PACKAGE_NAME = "typescript-library-template-docs";
const TEMPLATE_EXAMPLE_PACKAGE_NAME = "typescript-library-template-example";
const TEMPLATE_AUTHOR = "Template Maintainers <maintainers@example.com>";
const TEMPLATE_OWNER = "your-org";
const TEMPLATE_JSR_NAME = "@your-scope/typescript-library-template";
const README_TEMPLATE_SECTION_START = "<!-- TEMPLATE_INIT_START -->";
const README_TEMPLATE_SECTION_END = "<!-- TEMPLATE_INIT_END -->";

const JSON_INDENT = 2;
const SUPPORTED_TEXT_EXTENSIONS = new Set([
  ".cjs",
  ".html",
  ".js",
  ".json",
  ".md",
  ".mdx",
  ".mjs",
  ".sh",
  ".ts",
  ".tsx",
  ".yaml",
  ".yml",
]);
const IGNORED_DIRECTORIES = new Set([
  ".git",
  ".pnpm-store",
  "coverage",
  "dist",
  "node_modules",
]);

const scriptPath = fileURLToPath(import.meta.url);
const scriptDirectory = dirname(scriptPath);
const repositoryRoot = resolve(scriptDirectory, "..");

const colorEnabled = process.stdout.isTTY && process.env.NO_COLOR !== "1";
const color = (code, value) => (colorEnabled ? `${code}${value}${RESET}` : value);

const info = value => {
  console.info(`${color(INFO, "●")} ${value}`);
};

const success = value => {
  console.info(`${color(SUCCESS, "✔")} ${value}`);
};

const warning = value => {
  console.warn(`${color(YELLOW, "▲")} ${value}`);
};

const failure = value => {
  console.error(`${color(RED, "✖")} ${value}`);
};

const trimTrailingSlash = value => value.replace(/\/+$/u, "");

const normalizeText = value => value.trim();

const isLowerCaseNpmCharacter = character =>
  (character >= "a" && character <= "z") ||
  (character >= "0" && character <= "9") ||
  character === "." ||
  character === "_" ||
  character === "-";

const splitPackageName = packageName => {
  const parts = packageName.split("/");
  return parts.at(-1) ?? packageName;
};

const titleFromPackageName = packageName => {
  const base = splitPackageName(packageName)
    .replace(/[-._]+/gu, " ")
    .trim();
  if (base.length === 0) return packageName;
  return base
    .split(/\s+/u)
    .map(segment => `${segment.slice(0, 1).toUpperCase()}${segment.slice(1)}`)
    .join(" ");
};

const validateNpmPackageName = value => {
  if (value !== value.toLowerCase()) return "Use lowercase only for npm package names.";

  const scopeIndex = value.startsWith("@") ? value.indexOf("/") : -1;
  if (value.startsWith("@") && scopeIndex <= 1)
    return "Use npm package format: @scope/name.";

  const scope = scopeIndex > -1 ? value.slice(1, scopeIndex) : "";
  const packagePart = scopeIndex > -1 ? value.slice(scopeIndex + 1) : value;
  if (packagePart.length === 0) return "Package name cannot be empty.";

  for (const character of scope) {
    if (!isLowerCaseNpmCharacter(character))
      return "Use npm package format: name or @scope/name.";
  }

  for (const character of packagePart) {
    if (!isLowerCaseNpmCharacter(character))
      return "Use npm package format: name or @scope/name.";
  }

  return packagePart.startsWith(".") || packagePart.startsWith("_")
    ? "Package name cannot start with '.' or '_'."
    : "";
};

const validateWorkspacePackageName = value => {
  if (value !== value.toLowerCase()) return "Use lowercase only.";
  if (value.length === 0)
    return "Use a valid package name fragment (letters, numbers, ., _, -).";
  for (const character of value) {
    if (!isLowerCaseNpmCharacter(character)) {
      return "Use a valid package name fragment (letters, numbers, ., _, -).";
    }
  }
  const firstCharacter = value.slice(0, 1);
  if (firstCharacter === "." || firstCharacter === "_")
    return "Use a valid package name fragment (letters, numbers, ., _, -).";
  return "";
};

const validateEmail = value => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;
  return pattern.test(value) ? "" : "Use a valid email address format.";
};

const validateGithubOwner = value => {
  if (value.length === 0 || value.length > 39)
    return "Use a valid GitHub owner/org name.";
  if (value.startsWith("-") || value.endsWith("-"))
    return "Use a valid GitHub owner/org name.";
  for (const character of value) {
    const isAlpha =
      (character >= "a" && character <= "z") || (character >= "A" && character <= "Z");
    const isNumeric = character >= "0" && character <= "9";
    if (!isAlpha && !isNumeric && character !== "-")
      return "Use a valid GitHub owner/org name.";
  }
  return "";
};

const validateGithubRepo = value => {
  const pattern = /^[A-Za-z0-9_.-]+$/u;
  return pattern.test(value) ? "" : "Use a valid repository name.";
};

const validateJsrPackageName = value => {
  if (!value.startsWith("@"))
    return "Use JSR format: @scope/package (lowercase, hyphen allowed).";
  const slashIndex = value.indexOf("/");
  if (slashIndex <= 1 || slashIndex === value.length - 1)
    return "Use JSR format: @scope/package (lowercase, hyphen allowed).";

  const scope = value.slice(1, slashIndex);
  const packageName = value.slice(slashIndex + 1);
  const isAllowed = character =>
    (character >= "a" && character <= "z") ||
    (character >= "0" && character <= "9") ||
    character === "-";

  for (const character of scope) {
    if (!isAllowed(character))
      return "Use JSR format: @scope/package (lowercase, hyphen allowed).";
  }
  for (const character of packageName) {
    if (!isAllowed(character))
      return "Use JSR format: @scope/package (lowercase, hyphen allowed).";
  }

  if (scope.startsWith("-") || scope.endsWith("-")) {
    return "Use JSR format: @scope/package (lowercase, hyphen allowed).";
  }
  if (packageName.startsWith("-") || packageName.endsWith("-")) {
    return "Use JSR format: @scope/package (lowercase, hyphen allowed).";
  }

  return "";
};

const parseAuthor = authorField => {
  const trimmedValue = authorField.trim();
  const openBracketIndex = trimmedValue.lastIndexOf("<");
  const closeBracketIndex = trimmedValue.lastIndexOf(">");

  if (
    openBracketIndex > 0 &&
    closeBracketIndex === trimmedValue.length - 1 &&
    closeBracketIndex > openBracketIndex
  ) {
    return {
      email: trimmedValue.slice(openBracketIndex + 1, closeBracketIndex).trim(),
      name: trimmedValue.slice(0, openBracketIndex).trim(),
    };
  }

  return {
    email: "",
    name: trimmedValue,
  };
};

const inferGithubRepository = repositoryUrl => {
  const raw = repositoryUrl.replace(/^git\+/u, "");
  const clean = raw.replace(/\.git$/u, "");
  const match = /github\.com\/(?<owner>[^/]+)\/(?<repo>[^/]+)/u.exec(clean)?.groups;
  return {
    owner: (match?.owner ?? TEMPLATE_OWNER).trim(),
    repo: (match?.repo ?? TEMPLATE_PACKAGE_NAME).trim(),
  };
};

const ensureWritable = async paths => {
  for (const path of paths) {
    await access(path, constants.W_OK);
  }
};

const readJson = async path => JSON.parse(await readFile(path, "utf8"));

const writeJson = async (path, value) => {
  const formatted = `${JSON.stringify(value, null, JSON_INDENT)}\n`;
  await writeTextAtomically(path, formatted);
};

const writeTextAtomically = async (path, content) => {
  const currentStat = await stat(path);
  const temporaryPath = `${path}.tmp-${process.pid}-${Date.now()}`;
  await writeFile(temporaryPath, content, { encoding: "utf8", mode: currentStat.mode });
  await rename(temporaryPath, path);
};

const renameDependencyKey = (dependencies, previousKey, nextKey) => {
  const nextDependencies = {};
  const entries = Object.entries(dependencies ?? {});

  for (const [key, value] of entries) {
    if (key === previousKey) {
      nextDependencies[nextKey] = value;
      continue;
    }
    nextDependencies[key] = value;
  }

  if (!(nextKey in nextDependencies)) {
    nextDependencies[nextKey] = "workspace:*";
  }

  return nextDependencies;
};

const renderSummary = values =>
  [
    `${color(BOLD, "Review the planned customization:")}`,
    `  ${color(CYAN, "Package")}          ${values.packageName}`,
    `  ${color(CYAN, "Title")}            ${values.projectTitle}`,
    `  ${color(CYAN, "Description")}      ${values.libraryDescription}`,
    `  ${color(CYAN, "Author")}           ${values.authorName} <${values.authorEmail}>`,
    `  ${color(CYAN, "License")}          ${values.license}`,
    `  ${color(CYAN, "Repository")}       https://github.com/${values.githubOwner}/${values.githubRepo}`,
    `  ${color(CYAN, "Root package")}     ${values.rootPackageName}`,
    `  ${color(CYAN, "Docs package")}     ${values.docsWorkspacePackageName}`,
    `  ${color(CYAN, "Example package")}  ${values.exampleWorkspacePackageName}`,
    `  ${color(CYAN, "JSR package")}      ${values.jsrPackageName}`,
  ].join("\n");

const promptText = async (rl, options) => {
  const { defaultValue, label, normalize = normalizeText, validator } = options;
  const resolvedDefault = typeof defaultValue === "string" ? defaultValue : "";
  while (true) {
    const defaultLabel =
      resolvedDefault.length > 0 ? ` ${color(DIM, `(${resolvedDefault})`)}` : "";
    const raw = await rl.question(
      `${color(HIGHLIGHT, "?")} ${color(BOLD, label)}${defaultLabel}: `
    );
    const selectedValue = normalize(raw.length > 0 ? raw : resolvedDefault);

    if (selectedValue.length === 0) {
      failure("This value is required.");
      continue;
    }

    const issue = validator(selectedValue);
    if (issue.length > 0) {
      failure(issue);
      continue;
    }

    return selectedValue;
  }
};

const promptConfirm = async (rl, label, defaultChoice) => {
  const defaultSuffix = defaultChoice ? "Y/n" : "y/N";
  while (true) {
    const raw = await rl.question(
      `${color(HIGHLIGHT, "?")} ${color(BOLD, label)} ${color(DIM, `(${defaultSuffix})`)}: `
    );
    const value = raw.trim().toLowerCase();
    if (value.length === 0) return defaultChoice;
    if (["y", "yes"].includes(value)) return true;
    if (["n", "no"].includes(value)) return false;
    failure("Please answer with yes or no.");
  }
};

const updateReadmeTemplateBlock = readmeContent =>
  readmeContent.replace(
    new RegExp(
      `${README_TEMPLATE_SECTION_START}[\\s\\S]*?${README_TEMPLATE_SECTION_END}\\n?\\n?`,
      "u"
    ),
    ""
  );

const applyTextTransformations = async (values, version) => {
  const fileReplacements = new Map([
    [
      ".github/copilot-instructions.md",
      content =>
        content
          .replace(/^# .+?$/u, `# ${values.projectTitle} — AI Source of Truth`)
          .replace(/`typescript-library-template`/gu, `\`${values.packageName}\``)
          .replace(TEMPLATE_PACKAGE_NAME, values.packageName),
    ],
    [
      ".github/instructions/docs.instructions.md",
      content =>
        content.replace(/`typescript-library-template`/gu, `\`${values.packageName}\``),
    ],
    [
      ".github/instructions/example.instructions.md",
      content =>
        content.replace(/`typescript-library-template`/gu, `\`${values.packageName}\``),
    ],
    [
      ".github/CODEOWNERS",
      content => content.replaceAll(TEMPLATE_OWNER, values.githubOwner),
    ],
    [
      "docs/readme.md",
      content =>
        content.replace(
          "This workspace provides a minimal Vite-powered docs shell for the template.",
          `This workspace provides a minimal Vite-powered docs shell for ${values.projectTitle}.`
        ),
    ],
    [
      "example/readme.md",
      content => content.replaceAll(TEMPLATE_PACKAGE_NAME, values.packageName),
    ],
    [
      "docs/src/content.ts",
      content => content.replaceAll(TEMPLATE_PACKAGE_NAME, values.packageName),
    ],
    [
      "example/src/index.ts",
      content => content.replaceAll(TEMPLATE_PACKAGE_NAME, values.packageName),
    ],
    [
      "docs/src/main.ts",
      content => content.replaceAll(TEMPLATE_PACKAGE_NAME, values.packageName),
    ],
    [
      "example/src/main.ts",
      content => content.replaceAll(TEMPLATE_PACKAGE_NAME, values.packageName),
    ],
    [
      "docs/index.html",
      content => content.replaceAll(TEMPLATE_PACKAGE_NAME, values.packageName),
    ],
    [
      "example/index.html",
      content => content.replaceAll(TEMPLATE_PACKAGE_NAME, values.packageName),
    ],
    [
      "lib/readme.md",
      content =>
        updateReadmeTemplateBlock(content)
          .replace(/^\*\*Template notice:\*\*.*\n\n/u, "")
          .replaceAll("TypeScript Library Template", values.projectTitle)
          .replaceAll("0.0.0--template", version)
          .replaceAll("jsr-template", `jsr-${encodeURIComponent(values.jsrPackageName)}`),
    ],
  ]);

  for (const [relativePath, transformer] of fileReplacements.entries()) {
    const absolutePath = join(repositoryRoot, relativePath);
    const existingContent = await readFile(absolutePath, "utf8");
    const nextContent = transformer(existingContent);
    if (nextContent !== existingContent) {
      await writeTextAtomically(absolutePath, nextContent);
      info(`Updated ${relativePath}`);
    }
  }
};

const replaceKnownTemplateTokens = async values => {
  const replacements = new Map([
    [TEMPLATE_ROOT_PACKAGE_NAME, values.rootPackageName],
    [TEMPLATE_DOCS_PACKAGE_NAME, values.docsWorkspacePackageName],
    [TEMPLATE_EXAMPLE_PACKAGE_NAME, values.exampleWorkspacePackageName],
    [TEMPLATE_AUTHOR, `${values.authorName} <${values.authorEmail}>`],
    [TEMPLATE_OWNER, values.githubOwner],
    [TEMPLATE_JSR_NAME, values.jsrPackageName],
  ]);

  const queue = [repositoryRoot];
  const pendingUpdates = [];
  while (queue.length > 0) {
    const currentPath = queue.pop() ?? repositoryRoot;
    const directoryEntries = await readdir(currentPath, { withFileTypes: true });

    for (const entry of directoryEntries) {
      if (entry.isDirectory()) {
        if (!IGNORED_DIRECTORIES.has(entry.name)) {
          queue.push(join(currentPath, entry.name));
        }
        continue;
      }

      if (!entry.isFile()) continue;

      const extension = extname(entry.name);
      if (!SUPPORTED_TEXT_EXTENSIONS.has(extension)) continue;

      const absoluteFilePath = join(currentPath, entry.name);
      if (absoluteFilePath === scriptPath) continue;

      const originalContent = await readFile(absoluteFilePath, "utf8");
      let nextContent = originalContent;

      for (const [from, to] of replacements.entries()) {
        if (from === to) continue;
        nextContent = nextContent.replaceAll(from, to);
      }

      if (nextContent !== originalContent) {
        pendingUpdates.push({
          absoluteFilePath,
          nextContent,
        });
      }
    }
  }

  await ensureWritable(pendingUpdates.map(update => update.absoluteFilePath));

  for (const update of pendingUpdates) {
    await writeTextAtomically(update.absoluteFilePath, update.nextContent);
  }
};

const main = async () => {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    failure("Run this script in an interactive terminal.");
    process.exitCode = 1;
    return;
  }

  info(color(BOLD, "Template initializer"));
  info("This one-time CLI customizes package metadata and removes itself afterward.");

  const rootPackagePath = join(repositoryRoot, "package.json");
  const libPackagePath = join(repositoryRoot, "lib/package.json");
  const docsPackagePath = join(repositoryRoot, "docs/package.json");
  const examplePackagePath = join(repositoryRoot, "example/package.json");
  const jsrConfigPath = join(repositoryRoot, "lib/jsr.json");
  const readmePath = join(repositoryRoot, "lib/readme.md");

  await ensureWritable([
    rootPackagePath,
    libPackagePath,
    docsPackagePath,
    examplePackagePath,
    jsrConfigPath,
    readmePath,
    scriptPath,
  ]);

  const rootPackageJson = await readJson(rootPackagePath);
  const libPackageJson = await readJson(libPackagePath);
  const docsPackageJson = await readJson(docsPackagePath);
  const examplePackageJson = await readJson(examplePackagePath);
  const jsrConfig = await readJson(jsrConfigPath);

  const currentAuthor = parseAuthor(libPackageJson.author ?? TEMPLATE_AUTHOR);
  const currentRepository = inferGithubRepository(libPackageJson.repository?.url ?? "");

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    const packageName = await promptText(rl, {
      defaultValue: libPackageJson.name ?? TEMPLATE_PACKAGE_NAME,
      label: "NPM package name",
      validator: validateNpmPackageName,
    });
    const packageBaseName = splitPackageName(packageName);
    const projectTitle = await promptText(rl, {
      defaultValue: titleFromPackageName(packageName),
      label: "Project title",
      validator: () => "",
    });
    const libraryDescription = await promptText(rl, {
      defaultValue: libPackageJson.description ?? "",
      label: "Library description",
      validator: () => "",
    });
    const authorName = await promptText(rl, {
      defaultValue: currentAuthor.name.length > 0 ? currentAuthor.name : "Your Team",
      label: "Author name",
      validator: () => "",
    });
    const authorEmail = await promptText(rl, {
      defaultValue:
        currentAuthor.email.length > 0 ? currentAuthor.email : "maintainers@example.com",
      label: "Author email",
      validator: validateEmail,
    });
    const githubOwner = await promptText(rl, {
      defaultValue: currentRepository.owner,
      label: "GitHub owner or org",
      validator: validateGithubOwner,
    });
    const githubRepo = await promptText(rl, {
      defaultValue: currentRepository.repo,
      label: "GitHub repository name",
      validator: validateGithubRepo,
    });
    const license = await promptText(rl, {
      defaultValue: libPackageJson.license ?? "MIT",
      label: "License",
      validator: () => "",
    });
    const rootPackageName = await promptText(rl, {
      defaultValue: `${packageBaseName}-monorepo`,
      label: "Root workspace package name",
      validator: validateWorkspacePackageName,
    });
    const docsWorkspacePackageName = await promptText(rl, {
      defaultValue: `${packageBaseName}-docs`,
      label: "Docs workspace package name",
      validator: validateWorkspacePackageName,
    });
    const exampleWorkspacePackageName = await promptText(rl, {
      defaultValue: `${packageBaseName}-example`,
      label: "Example workspace package name",
      validator: validateWorkspacePackageName,
    });
    const jsrPackageName = await promptText(rl, {
      defaultValue:
        jsrConfig.name === TEMPLATE_JSR_NAME
          ? `@${githubOwner.toLowerCase()}/${packageBaseName}`
          : jsrConfig.name,
      label: "JSR package name",
      validator: validateJsrPackageName,
    });

    const values = {
      authorEmail,
      authorName,
      docsWorkspacePackageName,
      exampleWorkspacePackageName,
      githubOwner,
      githubRepo,
      jsrPackageName,
      libraryDescription,
      license,
      packageName,
      projectTitle,
      rootPackageName,
    };

    console.info("");
    console.info(renderSummary(values));
    console.info("");

    const confirmed = await promptConfirm(
      rl,
      "Apply these changes and remove the initializer script?",
      true
    );
    if (!confirmed) {
      warning("Aborted by user. No files were changed.");
      return;
    }

    const repositoryHttpUrl = trimTrailingSlash(
      `https://github.com/${githubOwner}/${githubRepo}`
    );
    const repositoryGitUrl = `git+${repositoryHttpUrl}.git`;
    const bugsUrl = `${repositoryHttpUrl}/issues`;
    const author = `${authorName} <${authorEmail}>`;
    const packageFileBaseName = splitPackageName(packageName);
    const esmBundlePath = `dist/${packageFileBaseName}.mjs`;
    const umdBundlePath = `dist/${packageFileBaseName}.umd.js`;
    const esmBundleExportPath = `./${esmBundlePath}`;

    rootPackageJson.name = rootPackageName;
    rootPackageJson.description = `Monorepo for ${packageName}`;
    rootPackageJson.author = author;
    rootPackageJson.license = license;
    if (rootPackageJson.scripts) {
      delete rootPackageJson.scripts["init:template"];
    }
    await writeJson(rootPackagePath, rootPackageJson);
    info("Updated package.json");

    libPackageJson.name = packageName;
    libPackageJson.description = libraryDescription;
    libPackageJson.author = author;
    libPackageJson.license = license;
    libPackageJson.homepage = repositoryHttpUrl;
    libPackageJson.bugs = {
      ...(libPackageJson.bugs ?? {}),
      url: bugsUrl,
    };
    libPackageJson.repository = {
      ...(libPackageJson.repository ?? {}),
      directory: "lib",
      type: "git",
      url: repositoryGitUrl,
    };
    libPackageJson.exports = {
      ...(libPackageJson.exports ?? {}),
      ".": {
        ...(libPackageJson.exports?.["."] ?? {}),
        default: esmBundleExportPath,
        import: esmBundleExportPath,
        types: "./dist/index.d.ts",
      },
      "./package.json": "./package.json",
    };
    libPackageJson.main = esmBundlePath;
    libPackageJson.module = esmBundlePath;
    libPackageJson.unpkg = umdBundlePath;
    await writeJson(libPackagePath, libPackageJson);
    info("Updated lib/package.json");

    docsPackageJson.name = docsWorkspacePackageName;
    docsPackageJson.description = `Documentation workspace for ${projectTitle}`;
    docsPackageJson.author = author;
    docsPackageJson.license = license;
    docsPackageJson.dependencies = renameDependencyKey(
      docsPackageJson.dependencies,
      TEMPLATE_PACKAGE_NAME,
      packageName
    );
    await writeJson(docsPackagePath, docsPackageJson);
    info("Updated docs/package.json");

    examplePackageJson.name = exampleWorkspacePackageName;
    examplePackageJson.description = `Example workspace for ${projectTitle}`;
    examplePackageJson.author = author;
    examplePackageJson.license = license;
    examplePackageJson.dependencies = renameDependencyKey(
      examplePackageJson.dependencies,
      TEMPLATE_PACKAGE_NAME,
      packageName
    );
    await writeJson(examplePackagePath, examplePackageJson);
    info("Updated example/package.json");

    jsrConfig.license = license;
    jsrConfig.name = jsrPackageName;
    await writeJson(jsrConfigPath, jsrConfig);
    info("Updated lib/jsr.json");

    await applyTextTransformations(values, libPackageJson.version);
    await replaceKnownTemplateTokens(values);

    await unlink(scriptPath);
    success("Template customization completed.");
    success("Initializer script removed.");
    info("Next steps:");
    console.info(`  1. ${color(CYAN, "pnpm install")}`);
    console.info(`  2. ${color(CYAN, "pnpm run setup-repo")}`);
    console.info(
      `  3. ${color(CYAN, "pnpm run lint && pnpm run typecheck && pnpm run test")}`
    );
  } finally {
    rl.close();
  }
};

main().catch(error => {
  failure(
    `Initialization failed: ${error instanceof Error ? error.message : String(error)}`
  );
  process.exitCode = 1;
});
