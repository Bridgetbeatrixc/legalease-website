import type React from "react";
import type { Cam, Setting } from "./components/Stage";

export type SceneDef = {
  /** File name of the dub for this scene: public/audio/<video id>/<scene id>.mp3 */
  id: string;
  /** Narration. Shown as subtitles and read for the dub. *word* = highlight. */
  text: string;
  kicker?: { pill?: string; text?: string; pillColor?: string };
  setting?: Setting;
  /** Camera move and look for this scene. Times are fractions of the scene (0..1). */
  camera?: Cam;
  Visual: React.FC<{ dur: number }>;
};

export type VideoDef = {
  id: string;
  title: string;
  /** Posting date from the content calendar. */
  date: string;
  scenes: SceneDef[];
};

export type ReelProps = {
  videoId: string;
  /** Filled in by calculateMetadata: frames per scene and the dub file, if any. */
  durations: number[];
  audio: (string | null)[];
};
