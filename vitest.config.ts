import { defineConfig } from "vitest/config";
import tsConfigPaths from "vite-tsconfig-paths";

import { programCsv } from "./vite.config";

// Separate from vite.config.ts so tests skip the TanStack Start / Nitro plugins.
export default defineConfig({
  plugins: [programCsv(), tsConfigPaths({ projects: ["./tsconfig.json"] })],
  test: {
    include: ["src/**/*.test.ts"],
    environment: "node",
  },
});
