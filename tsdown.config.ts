import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "./src/index.ts",
  },
  outDir: "dist",
  format: ["esm", "cjs"],
  // https://github.com/microsoft/TypeScript/wiki/Node-Target-Mapping
  target: "ES2020",
  clean: true,
  dts: {
    // типы используем из зависимости, а не копируем в свои .d.ts (меньше к нам вопросов)
    // resolve: false,
    // oxc: true,
  },
  minify: false,
  treeshake: true,
  // outputOptions: {
  //   entryFileNames: "[name].js",
  //   chunkFileNames: "[name].js",
  //   banner: (chunk) => (chunk.name === "cli" ? `#!/usr/bin/env -S node` : ""),
  //   sanitizeFileName: true,
  //   minifyInternalExports: true,
  // },
  exports: {
    devExports: true,
  },
});
