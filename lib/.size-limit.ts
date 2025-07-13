import type { SizeLimitConfig } from "size-limit";

export default [
  {
    name: "ESM",
    path: "dist/index.mjs",
    limit: "5000 kB", // Adjust the limit as needed
    import: "*",
    brotli: true,
  },
  {
    name: "UMD",
    path: "dist/index.umd.js",
    limit: "5000 kB", // Adjust the limit as needed
    import: "*",
    brotli: true,
  },
] satisfies SizeLimitConfig;
