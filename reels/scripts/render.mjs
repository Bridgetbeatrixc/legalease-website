// Renders the final MP4s to out/<id>.mp4, with any dub files found.
// Usage: npm run render [-- <video-id> ...]
import { getCompositions, renderMedia } from "@remotion/renderer";
import { browserExecutable, makeBundle } from "./common.mjs";

const only = process.argv.slice(2);
const serveUrl = await makeBundle();
const comps = await getCompositions(serveUrl, { browserExecutable });
for (const c of comps.filter((c) => !c.id.startsWith("storyboard-"))) {
  if (only.length && !only.includes(c.id)) continue;
  const output = `out/${c.id}.mp4`;
  await renderMedia({
    serveUrl,
    composition: c,
    codec: "h264",
    output,
    browserExecutable,
    onProgress: ({ progress }) => process.stdout.write(`\r${c.id} ${Math.round(progress * 100)}%`),
  });
  console.log("\nwrote", output);
}
