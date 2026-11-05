#!/usr/bin/env bash
# Light voice polish for voprompter takes, before import-vo.mjs splits them.
#   scripts/vo-fx.sh <rawTakesDir> [outDir=vo/takes]
# Chain: rumble cut, gentle denoise, de-mud, presence, de-ess, 3:1 compression,
# a very short room tail, then loudness to -16 LUFS (Reels). Markers are copied as-is.
set -euo pipefail
IN="$1"; OUT="${2:-vo/takes}"; mkdir -p "$OUT"
FX="highpass=f=85,afftdn=nr=10:nf=-45,equalizer=f=300:t=q:w=1.2:g=-2.5,equalizer=f=3200:t=q:w=1.0:g=3,treble=g=1.5:f=9000,deesser=i=0.35,acompressor=threshold=-20dB:ratio=3:attack=8:release=120:makeup=3dB,aecho=0.9:0.6:35|60:0.10|0.06,loudnorm=I=-16:TP=-1.5:LRA=9,aresample=48000"
for w in "$IN"/*.wav; do
  b=$(basename "$w" .wav); [[ "$b" == *-take-* ]] && continue
  ffmpeg -hide_banner -loglevel error -y -i "$w" -af "$FX" -ac 1 -c:a pcm_s16le "$OUT/$b.wav"
  [ -f "$IN/$b.json" ] && cp "$IN/$b.json" "$OUT/$b.json"
  echo "fx $b"
done
