import { readFileSync } from "node:fs";

import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig, type Plugin } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

import { parseProgram } from "./src/data/parse-program";

// Parses `import x from "*.csv"` into a typed session array at build time, so
// the programme ships as plain JS and no CSV parsing happens in the browser.
function programCsv(): Plugin {
  return {
    name: "techheads-program-csv",
    enforce: "pre",
    load(id) {
      const file = id.split("?")[0]!;
      if (!file.endsWith(".csv")) return null;
      this.addWatchFile(file);
      const sessions = parseProgram(readFileSync(file, "utf8"));
      return { code: `export default ${JSON.stringify(sessions)};`, map: null };
    },
  };
}

const securityHeaders = {
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
  "Content-Security-Policy": [
    "base-uri 'self'",
    "object-src 'none'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join("; "),
};

export default defineConfig({
  server: { port: 8080 },
  plugins: [
    programCsv(),
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      // Build the server bundle from src/server.ts (our SSR error wrapper).
      server: { entry: "server" },
      importProtection: {
        behavior: "error",
        client: { files: ["**/server/**"], specifiers: ["server-only"] },
      },
    }),
    // Nitro picks the deploy target from the environment (e.g. Vercel) or NITRO_PRESET.
    nitro({ routeRules: { "/**": { headers: securityHeaders } } }),
    viteReact(),
  ],
  resolve: {
    dedupe: ["react", "react-dom", "@tanstack/react-query", "@tanstack/query-core"],
  },
});
