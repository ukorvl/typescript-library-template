import type { SizeLimitConfig } from "size-limit";

export default [
  {
    name: "ESM",
    path: "dist/fill-me.mjs", // Replace with your actual ESM output file
    limit: "5000 kB", // Adjust the limit as needed
    import: "*",
    brotli: true,
  },
  {
    name: "UMD",
    path: "dist/fill-me.umd.js", // Replace with your actual UMD output file
    limit: "5000 kB", // Adjust the limit as needed
    import: "*",
    brotli: true,
  },
] satisfies SizeLimitConfig;
