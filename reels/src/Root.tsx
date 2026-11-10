import React from "react";
import { CalculateMetadataFunction, Composition, continueRender, delayRender } from "remotion";
import { fontsReady } from "./fonts";
import { Reel } from "./Reel";
import { Storyboard } from "./Storyboard";
import { FPS, H, W } from "./theme";
import { sceneTiming } from "./timing";
import type { ReelProps } from "./types";
import { VIDEOS } from "./videos";

const handle = delayRender("fonts");
fontsReady.then(() => continueRender(handle));

const reelMeta: CalculateMetadataFunction<ReelProps> = async ({ props }) => {
  const video = VIDEOS.find((v) => v.id === props.videoId)!;
  const t = await sceneTiming(video);
  return { durationInFrames: t.durations.reduce((a, b) => a + b, 0), props: { ...props, ...t } };
};

const boardMeta: CalculateMetadataFunction<ReelProps> = async ({ props }) => {
  const video = VIDEOS.find((v) => v.id === props.videoId)!;
  const t = await sceneTiming(video);
  const rows = Math.ceil(video.scenes.length / 3);
  return { durationInFrames: 100000, height: 160 + rows * 820, props: { ...props, ...t } };
};

export const RemotionRoot: React.FC = () => (
  <>
    {VIDEOS.map((v) => (
      <Composition
        key={v.id}
        id={v.id}
        component={Reel}
        fps={FPS}
        width={W}
        height={H}
        durationInFrames={300}
        defaultProps={{ videoId: v.id, durations: [], audio: [] }}
        calculateMetadata={reelMeta}
      />
    ))}
    {VIDEOS.map((v) => (
      <Composition
        key={`sb-${v.id}`}
        id={`storyboard-${v.id}`}
        component={Storyboard}
        fps={FPS}
        width={1240}
        height={1800}
        durationInFrames={1}
        defaultProps={{ videoId: v.id, durations: [], audio: [] }}
        calculateMetadata={boardMeta}
      />
    ))}
  </>
);
