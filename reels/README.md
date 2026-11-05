# LegalEase Reels (Remotion)

Six animated 2D storytelling Reels (1080×1920, 30 fps) from the November–December 2026 content calendar. Each video follows the same five beats: hook, character, conflict, lesson, and the pitch at the end.

| Post date | Composition id | Title |
| --- | --- | --- |
| Fri 13 Nov | `mitos-usaha-rumahan` | Mitos: Usaha Rumahan Tidak Perlu Izin |
| Mon 16 Nov | `cari-kbli-30-detik` | Cari KBLI Usahamu dalam 30 Detik |
| Fri 20 Nov | `salah-pilih-kbli` | Salah Pilih KBLI, Izinnya Ikut Salah |
| Mon 23 Nov | `kuis-pirt-atau-bpom` | PIRT atau BPOM? Tebak Produk Ini |
| Mon 30 Nov | `hitung-pph-tanpa-rumus` | Hitung PPh Usahamu Tanpa Rumus |
| Wed 2 Dec | `mitos-belum-untung-spt` | Mitos: Belum Untung, Tidak Perlu Lapor SPT |

## Setup

```bash
cd reels
npm install
npm run studio        # live preview in the browser
```

## Dubbing

1. Read the lines in [NASKAH-DUBBING.md](NASKAH-DUBBING.md). There is one file per scene.
2. Save each recording as `public/audio/<composition id>/<scene id>.mp3` (`.wav` and `.m4a` also work), e.g. `public/audio/mitos-usaha-rumahan/01-hook.mp3`.
3. Reload the studio. Each scene stretches to the length of its recording plus a short pause, and the subtitles follow it. A scene with no recording uses an estimated reading time.

The narration text lives in `src/videos/*.tsx` (`text` on each scene). If you change what you say, change it there too so the subtitles match. Words between `*asterisks*` are highlighted in gold.

## Review and render

```bash
npm run storyboard    # out/storyboard-<id>.png: one still per scene, for approval
npm run render        # out/<id>.mp4: final videos with the dub
npm run render -- mitos-usaha-rumahan   # just one
```

On a machine without a downloadable Chrome, point Remotion at an existing one with `REMOTION_BROWSER=/path/to/chrome`.

## Structure

- `src/components/Person.tsx`: the flat 2D character (hair, outfit, mood, pose, idle animation).
- `src/components/Props.tsx`: jars, documents, phone, washer, coffee, bottles, envelopes and so on.
- `src/components/Stage.tsx`: backgrounds, headline, subtitles, logo.
- `src/components/EndCard.tsx`: the closing WhatsApp call to action.
- `src/videos/`: one file per video with its scenes and narration.
- `src/timing.ts`: reads dub lengths and sets each scene's duration.

Remotion is free for individuals and companies with up to 3 employees; larger teams need a company license (remotion.pro).
