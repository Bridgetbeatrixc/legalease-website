// Splits voprompter takes into one WAV per scene for the Reels.
//
//   node scripts/import-vo.mjs [takesDir]      (default: vo/takes)
//
// Reads <video-id>.wav + <video-id>.json (a part recorded on its own) and,
// for any video without a part take, the matching lines of vo.wav + vo.json
// (a full take). Each marker starts a scene; the scene runs until the next
// marker, with leading/trailing silence trimmed. Output:
// public/audio/<video-id>/<scene-id>.wav
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const takes = path.resolve(process.argv[2] ?? path.join(root, "vo", "takes"));
const script = JSON.parse(fs.readFileSync(path.join(root, "vo", "legalease-reels.json"), "utf8"));
const videos = [...new Set(script.map((l) => l.scene))];

function readWav(file) {
  const buf = fs.readFileSync(file);
  let off = 12, fmt = null, data = null;
  while (off + 8 <= buf.length) {
    const id = buf.toString("ascii", off, off + 4);
    const size = buf.readUInt32LE(off + 4);
    if (id === "fmt ") fmt = { ch: buf.readUInt16LE(off + 10), sr: buf.readUInt32LE(off + 12), bits: buf.readUInt16LE(off + 22) };
    if (id === "data") data = buf.subarray(off + 8, Math.min(buf.length, off + 8 + size));
    off += 8 + size + (size & 1);
  }
  if (!fmt || !data || fmt.bits !== 16) throw new Error(`expected a 16-bit PCM WAV: ${file}`);
  return { ...fmt, data };
}

function writeWav(file, fmt, data) {
  const h = Buffer.alloc(44);
  const ba = fmt.ch * 2;
  h.write("RIFF", 0); h.writeUInt32LE(36 + data.length, 4); h.write("WAVE", 8);
  h.write("fmt ", 12); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(fmt.ch, 22);
  h.writeUInt32LE(fmt.sr, 24); h.writeUInt32LE(fmt.sr * ba, 28); h.writeUInt16LE(ba, 32); h.writeUInt16LE(16, 34);
  h.write("data", 36); h.writeUInt32LE(data.length, 40);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, Buffer.concat([h, data]));
}

/** Cuts [a, b) seconds, trims silence at both ends (keeps a little air). */
function cut(wav, a, b) {
  const ba = wav.ch * 2;
  const total = wav.data.length / ba;
  let s = Math.max(0, Math.round(a * wav.sr)), e = Math.min(total, Math.round(b * wav.sr));
  const loud = (i) => {
    for (let c = 0; c < wav.ch; c++) if (Math.abs(wav.data.readInt16LE(i * ba + c * 2)) > 1000) return true;
    return false;
  };
  let fs0 = s; while (fs0 < e && !loud(fs0)) fs0++;
  let le = e - 1; while (le > fs0 && !loud(le)) le--;
  if (fs0 >= le) return null;
  s = Math.max(s, fs0 - Math.round(0.08 * wav.sr));
  e = Math.min(e, le + Math.round(0.25 * wav.sr));
  return wav.data.subarray(s * ba, e * ba);
}

const load = (base) => {
  const w = path.join(takes, `${base}.wav`), j = path.join(takes, `${base}.json`);
  if (!fs.existsSync(w) || !fs.existsSync(j)) return null;
  return { wav: readWav(w), markers: JSON.parse(fs.readFileSync(j, "utf8")).markers };
};

const full = load("vo");
let done = 0;
for (const video of videos) {
  const part = load(video);
  const src = part ?? full;
  if (!src) { console.log(`- ${video}: no take yet`); continue; }
  // last marker per cue wins (clicking a line re-starts it)
  const ms = src.markers.filter((m) => m.scene === video);
  const end = (m) => {
    const later = src.markers.filter((n) => n.t > m.t).sort((x, y) => x.t - y.t)[0];
    return later ? later.t : src.wav.data.length / (src.wav.ch * 2) / src.wav.sr;
  };
  const byCue = new Map();
  for (const m of ms) byCue.set(m.cue, m);
  for (const l of script.filter((x) => x.scene === video)) {
    const m = byCue.get(l.cue);
    if (!m) { console.log(`  ! ${video}/${l.cue}: no marker`); continue; }
    const data = cut(src.wav, m.t, end(m));
    if (!data) { console.log(`  ! ${video}/${l.cue}: silent`); continue; }
    const out = path.join(root, "public", "audio", video, `${l.cue}.wav`);
    for (const ext of ["mp3", "m4a"]) fs.rmSync(out.replace(/\.wav$/, `.${ext}`), { force: true });
    writeWav(out, src.wav, data);
    done++;
    console.log(`  ${video}/${l.cue}.wav  ${(data.length / (src.wav.ch * 2) / src.wav.sr).toFixed(2)}s`);
  }
}
console.log(`\n${done} scene files written to public/audio/. Next: npm run render`);
