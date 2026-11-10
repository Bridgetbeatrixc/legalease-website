import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { staticFile } from "remotion";
import { plain } from "./components/Stage";
import { FPS } from "./theme";
import type { VideoDef } from "./types";

const EXTS = ["mp3", "wav", "m4a"];
/** Silence after each dubbed line, in seconds. */
const TAIL = 0.45;

const exists = async (path: string) => {
  try {
    const r = await fetch(staticFile(path), { method: "HEAD" });
    return r.ok;
  } catch {
    return false;
  }
};

/** Without a dub, estimate how long the line takes to read aloud. */
const estimate = (text: string) => {
  const words = plain(text).split(/\s+/).filter(Boolean).length;
  return Math.max(2.4, words / 2.5 + 0.8);
};

/**
 * Each scene lasts as long as its dub (public/audio/<video>/<scene>.mp3)
 * plus a short tail. Scenes without a dub use a reading-speed estimate.
 */
export const sceneTiming = async (video: VideoDef) => {
  const durations: number[] = [];
  const audio: (string | null)[] = [];
  for (const scene of video.scenes) {
    let found: string | null = null;
    for (const ext of EXTS) {
      const p = `audio/${video.id}/${scene.id}.${ext}`;
      if (await exists(p)) {
        found = p;
        break;
      }
    }
    const secs = found ? (await getAudioDurationInSeconds(staticFile(found))) + TAIL : estimate(scene.text);
    durations.push(Math.ceil(secs * FPS));
    audio.push(found);
  }
  return { durations, audio };
};
