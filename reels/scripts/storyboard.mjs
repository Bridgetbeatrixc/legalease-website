// Renders one storyboard PNG per video to out/storyboard-<id>.png.
// Usage: npm run storyboard [-- <video-id> ...]
import { getCompositions, renderStill } from "@remotion/renderer";
import { browserExecutable, makeBundle } from "./common.mjs";

const only = process.argv.slice(2);
const serveUrl = await makeBundle();
const comps = await getCompositions(serveUrl, { browserExecutable });
for (const c of comps.filter((c) => c.id.startsWith("storyboard-"))) {
  const id = c.id.replace("storyboard-", "");
  if (only.length && !only.includes(id)) continue;
  const output = `out/storyboard-${id}.png`;
  await renderStill({ serveUrl, composition: c, output, browserExecutable, scale: 1 });
  console.log("wrote", output);
}
