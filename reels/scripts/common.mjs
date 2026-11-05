import { bundle } from "@remotion/bundler";
import path from "node:path";

// Set REMOTION_BROWSER to use an existing Chrome/Chromium instead of the
// one Remotion downloads on first run.
export const browserExecutable = process.env.REMOTION_BROWSER || null;

export const makeBundle = () =>
  bundle({ entryPoint: path.resolve("src/index.ts"), publicDir: path.resolve("public") });
