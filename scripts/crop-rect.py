#!/usr/bin/env python3
"""Crop a rectangle from an image."""

from pathlib import Path

from PIL import Image

# --- edit these ---
SRC = "public/images/Gemini_Doc backup.png"
OUT = "public/images/small-doc5.png"
X = 360       # center x (px)
Y = 515      # center y (px)
WIDTH = 200
HEIGHT = 200


def main() -> None:
    src = Path(SRC)
    out = Path(OUT)

    img = Image.open(src).convert("RGBA")
    width, height = img.size

    left = X - WIDTH // 2
    top = Y - HEIGHT // 2
    right = left + WIDTH
    bottom = top + HEIGHT

    cropped = img.crop((left, top, right, bottom))

    out.parent.mkdir(parents=True, exist_ok=True)
    cropped.save(out)

    print(f"source: {src} ({width}x{height})")
    print(f"center: ({X}, {Y})")
    print(f"crop box: ({left}, {top}, {right}, {bottom})")
    print(f"saved: {out} ({cropped.size[0]}x{cropped.size[1]})")


if __name__ == "__main__":
    main()
