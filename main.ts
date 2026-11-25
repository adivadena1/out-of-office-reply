// Out-of-Office Reply — make.fun bounty entry.
//
// Writes one out-of-office auto-reply, a single line, to /output/entry.txt.
// Deterministic: no input, no network, no randomness, no clock. The same
// bytes come out on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "I'm away until Monday, or until someone admits they took the good pens. Whichever comes last.";

// Gate (sealed scorer): UTF-8 text of 1 to 160 characters, not only
// whitespace, a single line. Fail hard rather than emit an invalid entry.
if (LINE.length < 1 || LINE.length > 160) {
  throw new Error(`entry must be 1-160 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
// No leading/trailing whitespace: every character must earn its place,
// and stray spaces would survive into the judged text.
if (LINE !== LINE.trim()) {
  throw new Error("entry must not start or end with whitespace");
}

const OUT = "/output/entry.txt";
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, LINE, "utf8");
