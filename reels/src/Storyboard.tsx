import React from "react";
import { AbsoluteFill, Freeze } from "remotion";
import { plain } from "./components/Stage";
import { SceneFrame } from "./Reel";
import { C, FONT, H, W } from "./theme";
import type { ReelProps } from "./types";
import { VIDEOS } from "./videos";

const PW = 360;
const PH = 640;

/** One still per video: every scene frozen near its end, with its line. */
export const Storyboard: React.FC<ReelProps> = ({ videoId, durations }) => {
  const video = VIDEOS.find((v) => v.id === videoId)!;
  const total = durations.reduce((a, b) => a + b, 0) / 30;
  return (
    <AbsoluteFill style={{ background: C.cream, fontFamily: FONT, padding: 40 }}>
      <div style={{ fontSize: 40, fontWeight: 900, color: C.navy }}>{video.title}</div>
      <div style={{ fontSize: 24, fontWeight: 600, color: C.cobalt, marginTop: 6 }}>
        {video.date} · {video.scenes.length} adegan · ±{Math.round(total)} detik (sebelum dubbing)
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 30, marginTop: 30 }}>
        {video.scenes.map((s, i) => (
          <div key={s.id} style={{ width: PW }}>
            <div style={{ width: PW, height: PH, overflow: "hidden", borderRadius: 18, position: "relative", boxShadow: "0 6px 0 rgba(16,31,62,0.12)" }}>
              <div style={{ width: W, height: H, transform: `scale(${PW / W})`, transformOrigin: "top left", position: "absolute" }}>
                <Freeze frame={Math.round(durations[i] * 0.7)}>
                  <SceneFrame scene={s} dur={durations[i]} />
                </Freeze>
              </div>
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: C.cobalt, marginTop: 12 }}>
              {i + 1}. {s.id} · {(durations[i] / 30).toFixed(1)} dtk
            </div>
            <div style={{ fontSize: 19, fontWeight: 600, color: C.navy, marginTop: 4, lineHeight: 1.35 }}>{plain(s.text)}</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
