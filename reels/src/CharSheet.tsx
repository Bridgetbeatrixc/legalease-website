import React from "react";
import { AbsoluteFill } from "remotion";
import { Chibi, ChibiLook, ChibiPose, Mood } from "./components/Chibi";
import { Lea } from "./components/Lea";

export const SARI_LOOK: ChibiLook = { hair: "hijab", hijab: "#C2344D", hijabShade: "#9E2440", skin: "#E9B48A", shirt: "#F39A4E", shirtShade: "#D97A32", skirt: "#F39A4E", apron: "#FFFFFF" };
export const TEMAN_LOOK: ChibiLook = { hair: "short", hairColor: "#2B1B17", skin: "#F2C29B", shirt: "#7B61FF", shirtShade: "#5C44D6", pants: "#2D3A6B", lash: false };

const items: [Mood, ChibiPose][] = [
  ["happy", "wave"],
  ["joy", "cheer"],
  ["shock", "handsHead"],
  ["worried", "chin"],
  ["sad", "slump"],
  ["determined", "point"],
];

/** Character sheet for review. */
export const CharSheet: React.FC = () => (
  <AbsoluteFill style={{ background: "#FFF6EC" }}>
    <svg viewBox="0 0 2400 1500" width={2400} height={1500}>
      {items.map(([m, p], i) => (
        <Chibi key={i} {...SARI_LOOK} x={200 + i * 340} y={700} scale={0.78} moods={[[0, m]]} poses={[[0, p]]} />
      ))}
      <Lea x={500} y={1400} scale={0.9} poses={[[0, "wave"]]} />
      <Lea x={900} y={1400} scale={0.9} poses={[[0, "cheer"]]} open={1} />
      <Lea x={1300} y={1400} scale={0.9} poses={[[0, "present"]]} mouth={[0.8]} />
      <Chibi {...TEMAN_LOOK} x={1800} y={1400} scale={0.78} moods={[[0, "happy"]]} poses={[[0, "present"]]} />
      <Chibi {...SARI_LOOK} x={2150} y={1400} scale={0.78} moods={[[0, "neutral"]]} poses={[[0, "stir"]]} mouth={[0.7]} />
    </svg>
  </AbsoluteFill>
);
