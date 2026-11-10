// Browser preview of the episode with @remotion/player, for sharing as a web page.
// Build: see scripts/build-player.sh
import React from "react";
// @ts-expect-error react-dom types are not installed
import { createRoot } from "react-dom/client";
import { Player } from "@remotion/player";
import "./fonts";
import { Reel } from "./Reel";
import { FPS, H, W } from "./theme";

const ID = "orderan-bu-sari";
const DURATIONS = [252, 258, 465, 323, 450, 177, 364];
const SCENES = ["01-hook", "02-tokoh", "03-konflik", "04-godaan", "05-pelajaran", "06-akhir", "07-jualan"];

const App = () => (
  <Player
    component={Reel}
    inputProps={{ videoId: ID, durations: DURATIONS, audio: SCENES.map((s) => `audio/${ID}/${s}.mp3`) }}
    durationInFrames={DURATIONS.reduce((a, b) => a + b, 0)}
    fps={FPS}
    compositionWidth={W}
    compositionHeight={H}
    controls
    clickToPlay
    doubleClickToFullscreen
    allowFullscreen
    acknowledgeRemotionLicense
    style={{ width: "100%", aspectRatio: `${W} / ${H}`, borderRadius: 18, overflow: "hidden" }}
  />
);

createRoot(document.getElementById("player")!).render(<App />);
