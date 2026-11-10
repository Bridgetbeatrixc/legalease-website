import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, interpolate, Easing } from "remotion";
import { Backdrop, Caption, camAt, Foreground, Kicker, Letterbox, Look, Watermark, Wipe } from "./components/Stage";
import { C } from "./theme";
import type { ReelProps, SceneDef } from "./types";
import { VIDEOS } from "./videos";

export const SceneFrame: React.FC<{ scene: SceneDef; dur: number; first?: boolean; last?: boolean }> = ({ scene, dur, first = false, last = false }) => {
  const f = useCurrentFrame();
  const dark = scene.setting === "navy";
  const { Visual } = scene;
  const cam = camAt(scene.camera, f, dur);
  // settle-in after each cut: slight overshoot zoom and blur clearing
  const settle = first ? 0 : interpolate(f, [0, 12], [1, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const zoom = cam.zoom + settle * 0.12;
  const blur = settle * 10;
  const origin = `${cam.focus[0]}px ${cam.focus[1]}px`;
  const world = (depth: number) =>
    `translate(${(cam.pan + cam.sx) * depth}px, ${(cam.tilt + cam.sy) * depth}px) scale(${1 + (zoom - 1) * depth})`;
  const grade = scene.camera?.grade ?? (dark ? "night" : "bright");
  return (
    <AbsoluteFill style={{ background: C.cream, overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: world(cam.shots ? 0.92 : 0.55), transformOrigin: origin, filter: scene.vivid ? (blur > 0.3 ? `blur(${blur}px)` : undefined) : `blur(${1.2 + blur}px)` }}>
        <Backdrop setting={scene.setting ?? "room"} wall={scene.wall} floor={scene.floor} vivid={scene.vivid} />
      </AbsoluteFill>
      <AbsoluteFill style={{ transform: world(1), transformOrigin: origin, filter: blur > 0.3 ? `blur(${blur}px)` : undefined }}>
        <Visual dur={dur} />
      </AbsoluteFill>
      {scene.vivid ? null : (
        <AbsoluteFill style={{ transform: world(1.6), transformOrigin: origin }}>
          <Foreground seed={scene.id} dark={dark} />
        </AbsoluteFill>
      )}
      {scene.vivid ? null : <Look grade={grade} />}
      {scene.Overlay ? <scene.Overlay dur={dur} /> : null}
      <Watermark dark={dark || scene.vivid} center={scene.vivid} />
      {scene.kicker ? <Kicker {...scene.kicker} dark={dark} /> : null}
      <Caption text={scene.text} dur={dur} dark={dark} />
      {first ? <Letterbox /> : null}
      <Wipe dur={dur} first={first} last={last} />
    </AbsoluteFill>
  );
};

export const Reel: React.FC<ReelProps> = ({ videoId, durations, audio }) => {
  const video = VIDEOS.find((v) => v.id === videoId)!;
  let from = 0;
  const n = video.scenes.length;
  return (
    <AbsoluteFill style={{ background: C.cream }}>
      {video.scenes.map((scene, i) => {
        const dur = durations[i];
        const seq = (
          <Sequence key={scene.id} from={from} durationInFrames={dur} name={scene.id}>
            <SceneFrame scene={scene} dur={dur} first={i === 0} last={i === n - 1} />
            {audio[i] ? <Audio src={staticFile(audio[i]!)} /> : null}
          </Sequence>
        );
        from += dur;
        return seq;
      })}
    </AbsoluteFill>
  );
};
