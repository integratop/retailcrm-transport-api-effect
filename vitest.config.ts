import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    sequence: { hooks: "list" },
    testTimeout: 60_000,
    clearMocks: true,
    passWithNoTests: true,
    setupFiles: ["dotenv/config"],
    projects: [
      {
        extends: true,
        test: { name: "unit", include: ["**/*.test.ts"], exclude: ["**/*e2e*"] },
      },
      {
        extends: true,
        test: { name: "e2e", include: ["**/*e2e.test.ts", "**/e2e/**/*.test.ts"] },
      },
    ],
  },
});

//
