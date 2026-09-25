// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { readFileSync } from "node:fs";
import type { Plugin } from "vite";

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

// The Lovable editor embeds the app in an iframe, so framing is limited to it instead of denied.
const securityHeaders = {
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
  "Content-Security-Policy": [
    "base-uri 'self'",
    "object-src 'none'",
    "form-action 'self'",
    "frame-ancestors 'self' https://lovable.dev https://*.lovable.dev https://gptengineer.app https://*.gptengineer.app",
  ].join("; "),
};

type NitroOptions = Exclude<Parameters<typeof defineConfig>[0], undefined>["nitro"] & object;

export default defineConfig({
  vite: {
    plugins: [programCsv()],
  },
  // routeRules is passed through to Nitro but missing from the Lovable config's types.
  nitro: {
    routeRules: {
      "/**": { headers: securityHeaders },
    },
  } as NitroOptions,
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
