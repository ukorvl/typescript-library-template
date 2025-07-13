import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";
import packageJson from "./package.json" with { type: "json" };

const __dirname = dirname(fileURLToPath(import.meta.url));

const banner = `
/**
* ${packageJson.name} v${packageJson.version}
*
* This source code is licensed under the MIT license found in the
* LICENSE.md file in the root directory of this source tree.
*
* @license MIT
*/`;

export default defineConfig(() => {
  const plugins = [
    tsconfigPaths(),
    dts({ rollupTypes: true, insertTypesEntry: true }),
  ];

  return {
    plugins,
    build: {
      minify: true,
      sourcemap: true,
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        name: "LightweightChartsVue",
        formats: ["es", "umd"],
        fileName: format => {
          if (format === "es") return `${packageJson.name}.mjs`;
          if (format === "umd") return `${packageJson.name}.umd.js`;
          return `${packageJson.name}.js`;
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
