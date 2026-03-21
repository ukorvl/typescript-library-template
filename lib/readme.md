**Template notice:** Replace package metadata (name, URLs, emails, owners, and publish settings) before your first public release.

<p align="center">
  <a href="https://shields.io/docs/static-badges">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/version-0.0.0--template-1e2029?style=flat&logo=npm&logoColor=ffffff">
      <img src="https://img.shields.io/badge/version-0.0.0--template-ffcc00?style=flat&logo=npm&logoColor=000000" alt="Version">
    </picture>
  </a>

  <a href="https://shields.io/docs/static-badges">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/downloads-mock-1e2029?style=flat&logo=npm&logoColor=ffffff">
      <img src="https://img.shields.io/badge/downloads-mock-ffcc00?style=flat&logo=npm&logoColor=000000" alt="Downloads">
    </picture>
  </a>

  <a href="https://shields.io/docs/static-badges">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/build-mock--passing-1e2029?style=flat&logo=githubactions&logoColor=ffffff">
      <img src="https://img.shields.io/badge/build-mock--passing-ffcc00?style=flat&logo=githubactions&logoColor=000000" alt="Build Status">
    </picture>
  </a>

  <a href="https://shields.io/docs/static-badges">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/license-MIT-1e2029?style=flat">
      <img src="https://img.shields.io/badge/license-MIT-ffcc00?style=flat" alt="License">
    </picture>
  </a>

  <a href="https://shields.io/docs/static-badges">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/bundle-size%20mock-1e2029?style=flat">
      <img src="https://img.shields.io/badge/bundle-size%20mock-ffcc00?style=flat" alt="Minified size">
    </picture>
  </a>

  <a href="https://shields.io/docs/static-badges">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/code%20style-eslint-1e2029?style=flat">
      <img src="https://img.shields.io/badge/code%20style-eslint-ffcc00?style=flat" alt="Code Style">
    </picture>
  </a>

  <a href="https://shields.io/docs/static-badges">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/module-ESM--only-1e2029?style=flat">
      <img src="https://img.shields.io/badge/module-ESM--only-ffcc00?style=flat" alt="ESM Only">
    </picture>
  </a>

  <a href="https://shields.io/docs/static-badges">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/contributions-welcome-1e2029?style=flat">
      <img src="https://img.shields.io/badge/contributions-welcome-ffcc00?style=flat" alt="Contributions">
    </picture>
  </a>

  <a href="https://shields.io/docs/static-badges">
    <picture>
      <source
        media="(prefers-color-scheme: dark)"
        srcset="https://img.shields.io/badge/coverage-100%25%20mock-1e2029?style=flat&logo=coveralls&logoColor=ffffff"
      >
      <img
        src="https://img.shields.io/badge/coverage-100%25%20mock-ffcc00?style=flat&logo=coveralls&logoColor=000000"
        alt="Coverage"
      >
    </picture>
  </a>

  <a href="https://shields.io/docs/static-badges">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/jsr-template-1e2029?style=flat&logo=javascript&logoColor=ffffff">
      <img src="https://img.shields.io/badge/jsr-template-ffcc00?style=flat&logo=javascript&logoColor=000000" alt="Jsr version">
    </picture>
  </a>
</p>

<div align="center">
  <h1>TypeScript Library Template</h1>
  <p>
    This is a template for TypeScript ESM-only library projects. It includes guidelines and configurations to help you get started quickly and keep a consistent codebase. It can be used to ship Node.js libraries, browser libraries, or both.
  </p>
  <img
    alt="Illustration of a TypeScript library template as a stack of hotcakes"
    src="https://raw.githubusercontent.com/ukorvl/design/master/typescript-library-template/typescript-hotcake.png"
    loading="lazy"
    width="200"
    height="200"
  />
  <p>
    Churn out your own TypeScript libraries with this template - like hotcakes!
  </p>
  <br />
</div>

## What you get with this template

- _AI-friendly by default_ - the repository already includes _deterministic_ instructions for coding agents, making it easier to use AI tools.
- _Start fast_ without wiring the basics from scratch - the template already gives you a modern TypeScript library foundation, so you can focus on building your package instead of assembling tooling for days.
- _Strong code quality from day one_ - strict linting, formatting, and type-checking help catch problems early and keep the codebase consistent. All linters configs are carefully curated to balance strictness with developer experience.
- A library setup that feels _production-minded_ - build, test, package validation, and workspace structure are already in place.
- Confidence in your _package output_ - included checks help validate typings, exports, and package quality before you publish.
- Better _dependency hygiene_ - the repo includes tooling that helps detect unused files.
- _Future-facing TypeScript support_ - the setup is designed to stay aligned with current and upcoming TypeScript versions and best practices.

## Workspace layout

- `lib/` publishable package workspace.
- `docs/` minimal Vite docs shell that uses package imports.
- `example/` minimal Vite consumer integration workspace.

## Quick start

To get started with this template, use GitHub's **"Use this template"** button to create a new repository based on this template. Then, clone your new repository and install the dependencies.

<!-- TEMPLATE_INIT_START -->

Run the template initializer once before your first install:

```sh
pnpm run init:template
```

<!-- TEMPLATE_INIT_END -->

```sh
git clone your-new-repo
cd your-new-repo
pnpm install
pnpm run setup-repo
```

This template intentionally uses generic placeholder metadata and repository links. Update them to your organization values before publishing.

## Core commands

```sh
pnpm run setup-repo
pnpm run lint
pnpm run typecheck
pnpm run test
pnpm run build
pnpm run verify:package
```

Workspace-specific commands:

```sh
pnpm -C docs run dev
pnpm -C docs run build
pnpm -C example run dev
pnpm -C example run build
```

In addition, the project uses pnpm workspaces to manage dependencies across multiple packages, allowing for efficient development and testing.

There is also a GitHub action setup to run tests and build the library on every push to the main branch. This ensures that the code remains stable and functional. Additionally, it includes labels configuration and a basic issue template to help users report issues effectively.

## License

This project is licensed under the [MIT License](./LICENSE). You can freely use, modify, and distribute this template as per the terms of the license.
