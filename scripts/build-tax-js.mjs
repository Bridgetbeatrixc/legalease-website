// Turns lib/tax.ts into public/js/tax.js (window.LegalEaseTax), so the calculator page runs the
// same rules in the Next.js site and in the plain-HTML copy. Runs before `npm run dev` and `build`.
import { readFileSync, writeFileSync } from "node:fs";
import ts from "typescript";

const src = readFileSync(new URL("../lib/tax.ts", import.meta.url), "utf8");
const js = ts.transpileModule(src, { compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ESNext } }).outputText;
const names = [...js.matchAll(/^export (?:const|function) (\w+)/gm)].map((m) => m[1]);
const body = js.replace(/^export /gm, "");
writeFileSync(
  new URL("../public/js/tax.js", import.meta.url),
  `// Generated from lib/tax.ts by scripts/build-tax-js.mjs. Edit lib/tax.ts, not this file.\n` +
    `window.LegalEaseTax = (function () {\n${body}\nreturn { ${names.join(", ")} };\n})();\n`,
);
console.log("public/js/tax.js:", names.length, "exports");
