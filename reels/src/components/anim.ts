import { interpolate, spring } from "remotion";
import { FPS } from "../theme";

/** 0 → 1 spring that starts at `delay` frames. */
export const pop = (frame: number, delay = 0, damping = 12) =>
  spring({ frame: frame - delay, fps: FPS, config: { damping, mass: 0.7 } });

/** Linear 0 → 1 between two frames, clamped. */
export const ramp = (frame: number, from: number, to: number) =>
  interpolate(frame, [from, to], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Gentle looping sine, for idle motion. */
export const wave = (frame: number, period = 60, amp = 1, phase = 0) =>
  Math.sin(((frame + phase) / period) * Math.PI * 2) * amp;
