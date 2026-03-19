import { defineConfig } from "vite";
import circularDependency from "vite-plugin-circular-dependency";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    circularDependency({
      circleImportThrowErr: true,
    }),
    tsconfigPaths(),
  ],
});
