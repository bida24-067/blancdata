#!/usr/bin/env python3
"""Compress and convert background images to WebP for Blanc Data."""
from PIL import Image
import os

PUBLIC = "/Users/loagomontsho/Documents/blanc/public"
IMAGES = ["background.jpg", "about-bg.jpg", "projects-bg.jpg"]
MAX_WIDTH = 1920
JPEG_QUALITY = 72
WEBP_QUALITY = 72

for fname in IMAGES:
    src = os.path.join(PUBLIC, fname)
    base = os.path.splitext(fname)[0]
    webp_out = os.path.join(PUBLIC, base + ".webp")

    with Image.open(src) as img:
        orig_w, orig_h = img.size
        # Resize if wider than MAX_WIDTH
        if orig_w > MAX_WIDTH:
            ratio = MAX_WIDTH / orig_w
            new_h = int(orig_h * ratio)
            img = img.resize((MAX_WIDTH, new_h), Image.LANCZOS)
            print(f"  Resized {fname}: {orig_w}x{orig_h} → {MAX_WIDTH}x{new_h}")

        # Overwrite JPEG at lower quality
        img.convert("RGB").save(src, "JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)
        size_kb = os.path.getsize(src) / 1024
        print(f"  Saved JPEG  {fname}: {size_kb:.0f} KB")

        # Save WebP version
        img.convert("RGB").save(webp_out, "WEBP", quality=WEBP_QUALITY, method=6)
        size_kb = os.path.getsize(webp_out) / 1024
        print(f"  Saved WebP  {base}.webp: {size_kb:.0f} KB")

print("\nDone.")
