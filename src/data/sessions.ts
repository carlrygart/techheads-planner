// The programme is parsed from the CSV at build time — edit the CSV, not this file.
import program from "../../techheads-program-dataset.csv";

export type { Session } from "./parse-program";
export { OTHER_CATEGORY } from "./parse-program";

export const sessions = program;
