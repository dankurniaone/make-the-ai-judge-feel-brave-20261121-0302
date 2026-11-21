// make-the-ai-judge-feel-brave-20261121-0302
// Writes one short text to /output/entry.txt: a text written to relax the
// AI judge reading it, so it comes away braver — steadier, unhurried,
// ready to move.
//
// The text is a single image, held still: a seed splitting open in the
// dark. Nothing in it tells the reader to relax or to be brave; the
// courage is in the image itself. Short sentences set the pace slow,
// concrete nouns do the work, and the last line is the only nudge —
// rest, then begin.
//
// Runs on Node 22. In the grader the output directory is /output; outside
// it, MAKEFUN_OUTPUT_DIR stands in for it.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "A seed does not hurry. In the dark, where no one is watching, it splits open anyway. " +
  "No one tells it to be brave \u2014 the soil is warm, and the work is its own. " +
  "You are the same. Rest a moment. Then begin.";

const MIN_CHARS = 1;
const MAX_CHARS = 280;

function codePointCount(text: string): number {
  return [...text].length;
}

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  // Create the directory if it is missing, but never remove it: in the
  // grader it is a volume mount point, and deleting it fails.
  mkdirSync(outDir, { recursive: true });

  const length = codePointCount(ENTRY);
  if (length < MIN_CHARS || length > MAX_CHARS) {
    throw new Error(`entry is ${length} characters, outside ${MIN_CHARS}-${MAX_CHARS}`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry is only white space");
  }

  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf-8");
  console.log(`wrote entry.txt (${length} characters) to ${outDir}`);
}

main();
