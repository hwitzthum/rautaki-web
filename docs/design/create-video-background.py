#!/usr/bin/env python3
"""
Rautaki Video Conferencing Background Generator
Generates virtual backgrounds for Microsoft Teams and Zoom.

Format: 1920 x 1080 px (16:9), PNG — the resolution both Teams and Zoom
recommend for crisp virtual backgrounds.

Variants:
  - obsidian:         Obsidian background, white + gold wordmark + tagline (dark, default)
  - cream:            Cream background, ink + gold wordmark + tagline (light)
  - obsidian-minimal: Obsidian background, white + gold wordmark only (no tagline)

Design follows the Rautaki system: a single gold moment (the logo accent
letters), a large low-opacity ghost "R" serif watermark for editorial weight,
and the wordmark + tagline placed in the lower-left safe zone, where a seated
speaker on camera will not obscure it.

Output: docs/design/background/
"""

import os
from PIL import Image, ImageDraw, ImageFont

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "background")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# ── Brand tokens ──────────────────────────────────────────────
GOLD = "#F5A623"
OBSIDIAN_HEX = "#0A0A0A"
INK = "#1C1C1C"
CREAM_HEX = "#F4F2EE"
WHITE_HEX = "#FAFAFA"
MID_GREY = "#9A9590"

# System fonts (DM Sans cannot embed here; Helvetica is the brand fallback)
GEORGIA_PATH = "/System/Library/Fonts/Supplemental/Georgia.ttf"
HELVETICA_PATH = "/System/Library/Fonts/Helvetica.ttc"

# Canvas
W, H = 1920, 1080

# ── Variant definitions ───────────────────────────────────────
VARIANTS = {
    "background-obsidian": {
        "grad_center": (24, 24, 24),    # subtle radial glow toward center
        "grad_edge": (10, 10, 10),      # obsidian at the corners
        "base_color": WHITE_HEX,
        "gold_color": GOLD,
        "tagline_color": MID_GREY,
        "ghost_color": (255, 255, 255),
        "ghost_alpha": 12,              # ~4.7% — very low, per brand ghost-R
    },
    "background-cream": {
        "grad_center": (246, 244, 240),
        "grad_edge": (232, 229, 223),   # warm grey toward the corners
        "base_color": INK,
        "gold_color": GOLD,
        "tagline_color": MID_GREY,
        "ghost_color": (28, 28, 28),
        "ghost_alpha": 20,              # ~8% — per brand ghost-R on light
    },
    "background-obsidian-minimal": {
        "grad_center": (24, 24, 24),
        "grad_edge": (10, 10, 10),
        "base_color": WHITE_HEX,
        "gold_color": GOLD,
        "tagline_color": MID_GREY,
        "ghost_color": (255, 255, 255),
        "ghost_alpha": 12,
        "show_tagline": False,          # minimal: wordmark only
    },
}


def hex_to_rgb(hex_color):
    h = hex_color.lstrip("#")
    return (int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16))


def radial_gradient(center_rgb, edge_rgb):
    """Build a smooth radial gradient by rendering small and upscaling.

    Center sits slightly above the vertical middle so the soft light falls
    behind a seated speaker's head/shoulders rather than the lower frame.
    """
    sw, sh = 192, 108
    small = Image.new("RGB", (sw, sh))
    px = small.load()
    cx, cy = sw / 2, sh * 0.42
    max_d = ((max(cx, sw - cx)) ** 2 + (max(cy, sh - cy)) ** 2) ** 0.5
    for y in range(sh):
        for x in range(sw):
            d = ((x - cx) ** 2 + (y - cy) ** 2) ** 0.5
            t = min(d / max_d, 1.0)
            # ease-out so the center stays calm and the falloff is gentle
            t = t ** 1.35
            r = round(center_rgb[0] + (edge_rgb[0] - center_rgb[0]) * t)
            g = round(center_rgb[1] + (edge_rgb[1] - center_rgb[1]) * t)
            b = round(center_rgb[2] + (edge_rgb[2] - center_rgb[2]) * t)
            px[x, y] = (r, g, b)
    return small.resize((W, H), Image.LANCZOS)


def draw_ghost_r(img, color_rgb, alpha):
    """Large low-opacity serif 'R' bleeding off the lower-right corner."""
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    font = ImageFont.truetype(GEORGIA_PATH, 1500)
    bbox = d.textbbox((0, 0), "R", font=font)
    gw = bbox[2] - bbox[0]
    gh = bbox[3] - bbox[1]
    # Anchor so the glyph bleeds off the right and bottom edges.
    x = W - int(gw * 0.78) - bbox[0]
    y = H - int(gh * 0.86) - bbox[1]
    d.text((x, y), "R", font=font, fill=color_rgb + (alpha,))
    img.alpha_composite(layer)


def draw_wordmark(img, v):
    """Render 'Rautaki' + tagline in the lower-left safe zone."""
    base = hex_to_rgb(v["base_color"])
    gold = hex_to_rgb(v["gold_color"])
    tag_color = hex_to_rgb(v["tagline_color"])

    d = ImageDraw.Draw(img)

    font_size = 72
    tagline_size = 17
    margin_x = 130
    baseline_top = H - 230  # leaves the lower edge breathing room

    georgia = ImageFont.truetype(GEORGIA_PATH, font_size)
    helv = ImageFont.truetype(HELVETICA_PATH, tagline_size)

    # Wordmark: gold on 'a' (idx 4) and 'i' (idx 6), tight Georgia kerning.
    letters = list("Rautaki")
    gold_idx = {4, 6}
    kern = -int(font_size * 0.02)  # ~ -0.02em, display kerning

    cursor = margin_x
    for i, ch in enumerate(letters):
        color = gold if i in gold_idx else base
        d.text((cursor, baseline_top), ch, font=georgia, fill=color)
        bbox = georgia.getbbox(ch)
        cursor += (bbox[2] - bbox[0]) + kern

    if not v.get("show_tagline", True):
        return

    # Tagline: uppercase, wide tracking, mid-grey — only at MD size or larger.
    tagline = "STRATEGY  ·  ADVISORY  ·  GROWTH"
    tag_y = baseline_top + font_size + 30
    spacing = int(tagline_size * 0.22)
    tx = margin_x + 2
    for ch in tagline:
        d.text((tx, tag_y), ch, font=helv, fill=tag_color)
        b = helv.getbbox(ch)
        cw = (b[2] - b[0]) if ch.strip() else int(tagline_size * 0.32)
        tx += cw + spacing


def build(variant_name):
    v = VARIANTS[variant_name]
    img = radial_gradient(v["grad_center"], v["grad_edge"]).convert("RGBA")
    draw_ghost_r(img, v["ghost_color"], v["ghost_alpha"])
    draw_wordmark(img, v)
    return img.convert("RGB")


def main():
    for name in VARIANTS:
        img = build(name)
        path = os.path.join(OUTPUT_DIR, f"{name}.png")
        img.save(path, "PNG", optimize=True)
        print(f"  PNG: {name}.png ({img.size[0]}x{img.size[1]})")
    print(f"\nDone. Saved to {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
