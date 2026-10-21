#!/usr/bin/env bash
# Turn the finished engine film (one continuous clip) into scroll frames for the homepage.
#   bash scripts/make-film.sh <clip.mp4> [fps]
# Writes public/film/engine/d/*.webp (1280x720, desktop) and public/film/engine/m/*.webp (540x960, phones,
# centre crop: keep the engine in the middle of the frame). Then set `frames` in src/data/film.ts.
# Needs ffmpeg. Default 10 fps keeps the download sensible; raise it for a smoother scrub.
set -euo pipefail
src="${1:?usage: make-film.sh <clip.mp4> [fps]}"; fps="${2:-10}"
out="public/film/engine"; rm -rf "$out"; mkdir -p "$out/d" "$out/m"
ffmpeg -v error -i "$src" -an -vf "fps=$fps,scale=1280:720:flags=lanczos:force_original_aspect_ratio=increase,crop=1280:720" -c:v libwebp -quality 62 "$out/d/%03d.webp"
ffmpeg -v error -i "$src" -an -vf "fps=$fps,scale=-2:960:flags=lanczos,crop=540:960" -c:v libwebp -quality 62 "$out/m/%03d.webp"
n=$(ls "$out/d" | wc -l)
echo "frames: $n  ($(du -sh "$out" | cut -f1) total). Set frames: $n in src/data/film.ts"
