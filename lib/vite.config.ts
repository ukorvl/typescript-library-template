import camelCase from "camelcase";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

import packageJson from "./package.json" with { type: "json" };

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageName = packageJson.name;
const packageVersion = packageJson.version;
const packageLicense = packageJson.license;
const umdGlobalName = camelCase(packageName.replace(/^@/u, "").split("/"), {
  pascalCase: true,
});

const banner = `
/**
* ${packageName} v${packageVersion}
*
* This source code is licensed under the MIT license found in the
* LICENSE.md file in the root directory of this source tree.
*
* @license ${packageLicense}
*/`;

export default defineConfig(() => {
  const plugins = [
    tsconfigPaths(),
    dts({
      rollupTypes: true,
      insertTypesEntry: true,
    }),
  ];

  return {
    plugins,
    build: {
      minify: true,
      sourcemap: true,
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        name: umdGlobalName,
        formats: ["es", "umd"],
        fileName: format => {
          if (format === "es") return `${packageName}.mjs`;
          if (format === "umd") return `${packageName}.umd.js`;
          return `${packageName}.js`;
        },
      },
      rollupOptions: {
        output: {
          banner: chunk => {
            return chunk.isEntry ? banner : "";
          },
        },
      },
    },
  };
});
