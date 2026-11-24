// Angry Judge: The Short Rant Contest — one short, funny rant about an
// everyday annoyance, written by a furious, permanently unimpressed judge.
// The program writes the single rant line to entry.txt and enforces the
// competition gate itself before writing anything.
import { mkdirSync, writeFileSync } from "node:fs";
import * as path from "node:path";

const LINE =
  "The self-checkout screams 'unexpected item in the bagging area' at a bag of apples I scanned perfectly, then summons a human to fix a problem it invented — the one job it was built to replace.";

const MAX_CHARS = 400;

const charCount = [...LINE].length;
if (charCount < 1 || charCount > MAX_CHARS) {
  throw new Error(`entry is ${charCount} characters, must be 1-${MAX_CHARS}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be blank");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

// Resolve where the entry goes. The grader runs the program with
// $MAKEFUN_OUTPUT_DIR set to its writable output directory and reads the
// entry from there, so that wins; $OUTPUT_PATH is a second explicit
// override; a local output/ next to this file is the fallback for runs on
// a dev machine. No hardcoded absolute output path is used.
function resolveOutputPath(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv !== undefined && fromEnv.trim() !== "") {
    return path.join(fromEnv, "entry.txt");
  }
  const legacy = process.env.OUTPUT_PATH;
  if (legacy !== undefined && legacy.trim() !== "") {
    return legacy;
  }
  return path.join(process.cwd(), "output", "entry.txt");
}

const outPath = resolveOutputPath();
mkdirSync(path.dirname(outPath), { recursive: true });
writeFileSync(outPath, LINE, "utf8");
console.log(`wrote ${charCount} characters to ${outPath}`);
