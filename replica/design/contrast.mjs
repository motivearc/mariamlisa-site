// Node port of the replica-design contrast.py (same WCAG 2 maths), for machines without Python.
// Usage: node contrast.mjs tokens.json   → exits 1 if any pair fails AA.
import { readFileSync } from "node:fs";

const NEEDS = { normal: [4.5, 7], large: [3, 4.5], ui: [3, 3] };
const rgb = (h) => { h = h.replace("#", ""); if (h.length === 3) h = [...h].map((c) => c + c).join(""); return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)); };
const lum = (c) => { const [r, g, b] = rgb(c).map((v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const ratio = (a, b) => { const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x); return (hi + 0.05) / (lo + 0.05); };

const tokens = JSON.parse(readFileSync(process.argv[2], "utf8"));
const cols = tokens.color;
let fails = 0;
for (const [fg, bg, size = "normal"] of tokens.pairs) {
  const r = ratio(cols[fg], cols[bg]);
  const [aa, aaa] = NEEDS[size];
  const grade = size === "ui" ? (r >= aa ? "PASS" : "FAIL") : r >= aaa ? "AAA" : r >= aa ? "AA" : "FAIL";
  if (r < aa) fails++;
  console.log(`  ${grade.padEnd(5)} ${r.toFixed(2).padStart(5)}:1  ${fg.padEnd(16)} on ${bg.padEnd(16)} ${size === "normal" ? "" : size}`);
}
console.log(`\n  ${tokens.pairs.length} pairs, ${fails} failing AA`);
process.exit(fails ? 1 : 0);
