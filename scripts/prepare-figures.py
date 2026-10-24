"""Prepares the hands image used as the halftone figure in the contact section.

Usage (Python 3.10+):
    pip install pillow
    python scripts/prepare-figures.py --hands hands.png

Writes public/figures/hands.png (continuous-tone hands).
"""

import argparse
from pathlib import Path

from PIL import Image, ImageFilter, ImageOps

OUT = Path(__file__).resolve().parent.parent / "public" / "figures"


def hands(src: Path, dest: Path) -> None:
    img = ImageOps.grayscale(Image.open(src))
    # Blur the source dot pattern into continuous tone (avoids moiré when resampled).
    img = img.filter(ImageFilter.GaussianBlur(8))
    img = ImageOps.autocontrast(img, cutoff=0.5)
    img = img.crop(img.point(lambda v: 255 if v > 40 else 0).getbbox())
    img.thumbnail((1200, 1200), Image.LANCZOS)
    img.save(dest, optimize=True)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--hands", type=Path, required=True)
    args = parser.parse_args()
    hands(args.hands, OUT / "hands.png")
