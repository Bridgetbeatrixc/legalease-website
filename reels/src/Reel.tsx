import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Backdrop, Caption, Kicker, SceneIn, Watermark } from "./components/Stage";
import { C } from "./theme";
import type { ReelProps, SceneDef } from "./types";
import { VIDEOS } from "./videos";

export const SceneFrame: React.FC<{ scene: SceneDef; dur: number }> = ({ scene, dur }) => {
  const dark = scene.setting === "navy";
  const { Visual } = scene;
  return (
    <SceneIn>
      <Backdrop setting={scene.setting ?? "room"} />
      <Visual dur={dur} />
      <Watermark dark={dark} />
      {scene.kicker ? <Kicker {...scene.kicker} dark={dark} /> : null}
      <Caption text={scene.text} dur={dur} dark={dark} />
    </SceneIn>
  );
};

export const Reel: React.FC<ReelProps> = ({ videoId, durations, audio }) => {
  const video = VIDEOS.find((v) => v.id === videoId)!;
  let from = 0;
  return (
    <AbsoluteFill style={{ background: C.cream }}>
      {video.scenes.map((scene, i) => {
        const dur = durations[i];
        const seq = (
          <Sequence key={scene.id} from={from} durationInFrames={dur} name={scene.id}>
            <SceneFrame scene={scene} dur={dur} />
            {audio[i] ? <Audio src={staticFile(audio[i]!)} /> : null}
          </Sequence>
        );
        from += dur;
        return seq;
      })}
    </AbsoluteFill>
  );
};
