// CSV files are turned into typed sessions at build time (see vite.config.ts).
declare module "*.csv" {
  const sessions: import("./parse-program").Session[];
  export default sessions;
}
