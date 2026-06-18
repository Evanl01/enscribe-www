#!/usr/bin/env python3
"""Crop the BAA PROVIDED badge from a screenshot."""

from pathlib import Path

from PIL import Image, ImageDraw

# --- edit these ---
SRC = "public/images/Gemini_Generated_Image_h6eph6h6eph6h6ep.png"
OUT = "public/images/baa-provided.png"
RADIUS = 250
Y_OFFSET = 20  # center y = height / 2 + Y_OFFSET
PAD = 8        # extra padding around circle for shadow
CX = None      # set to int to override; default is width / 2
CY = None      # set to int to override; default is height / 2 + Y_OFFSET
SQUARE_ONLY = False  # True = square crop only, no circular mask


def main() -> None:
    src = Path(SRC)
    out = Path(OUT)

    img = Image.open(src).convert("RGBA")
    width, height = img.size

    cx = CX if CX is not None else width // 2
    cy = CY if CY is not None else height // 2 + Y_OFFSET

    left = cx - RADIUS - PAD
    top = cy - RADIUS - PAD
    right = cx + RADIUS + PAD
    bottom = cy + RADIUS + PAD

    cropped = img.crop((left, top, right, bottom))
    size = cropped.size[0]

    if SQUARE_ONLY:
        result = cropped
    else:
        mask = Image.new("L", (size, size), 0)
        ImageDraw.Draw(mask).ellipse(
            (PAD, PAD, size - PAD - 1, size - PAD - 1),
            fill=255,
        )
        result = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        result.paste(cropped, (0, 0))
        result.putalpha(mask)

    out.parent.mkdir(parents=True, exist_ok=True)
    result.save(out)

    print(f"source: {src} ({width}x{height})")
    print(f"center: ({cx}, {cy})")
    print(f"crop box: ({left}, {top}, {right}, {bottom})")
    print(f"saved: {out} ({size}x{size})")


if __name__ == "__main__":
    main()
