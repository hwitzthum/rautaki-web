#!/usr/bin/env python3
"""
Rautaki Logo Generator
Generates all logo variants as SVG + PNG (200/500/1200px wide).

Variants:
  - obsidian:          Obsidian background, white+gold text
  - cream:             Cream background, ink+gold text
  - transparent-dark:  Transparent bg, ink+gold text (for light surfaces)
  - transparent-light: Transparent bg, white+gold text (for dark surfaces)

Each variant: with and without tagline.
Output: docs/design/logos/
"""

import os
from PIL import Image, ImageDraw, ImageFont

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "logos")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# ── Brand tokens ──────────────────────────────────────────────
GOLD = "#F5A623"
OBSIDIAN_HEX = "#0A0A0A"
INK = "#1C1C1C"
CREAM_HEX = "#F4F2EE"
WHITE_HEX = "#FAFAFA"
MID_GREY = "#9A9590"

# System fonts
GEORGIA_PATH = "/System/Library/Fonts/Supplemental/Georgia.ttf"
HELVETICA_PATH = "/System/Library/Fonts/Helvetica.ttc"

# PNG export widths
PNG_SIZES = {"200": 200, "500": 500, "1200": 1200}

# ── Logo variant definitions ──────────────────────────────────
VARIANTS = {
    "logo-obsidian": {
        "bg": OBSIDIAN_HEX,
        "transparent": False,
        "base_color": WHITE_HEX,
        "gold_color": GOLD,
        "tagline_color": MID_GREY,
    },
    "logo-cream": {
        "bg": CREAM_HEX,
        "transparent": False,
        "base_color": INK,
        "gold_color": GOLD,
        "tagline_color": MID_GREY,
    },
    "logo-transparent-dark": {
        "bg": None,
        "transparent": True,
        "base_color": INK,
        "gold_color": GOLD,
        "tagline_color": MID_GREY,
    },
    "logo-transparent-light": {
        "bg": None,
        "transparent": True,
        "base_color": WHITE_HEX,
        "gold_color": GOLD,
        "tagline_color": MID_GREY,
    },
}


def hex_to_rgba(hex_color, alpha=255):
    """Convert hex color to RGBA tuple."""
    h = hex_color.lstrip("#")
    return (int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16), alpha)


def build_svg(variant, with_tagline):
    """Build an SVG string for a logo variant."""
    v = VARIANTS[variant]
    base = v["base_color"]
    gold = v["gold_color"]
    tagline_color = v["tagline_color"]
    bg = v["bg"]

    font_size = 48
    tagline_size = 11

    # "Rautaki" — letters with gold on index 4 ('a') and 6 ('i')
    letters = [
        ("R", base), ("a", base), ("u", base), ("t", base),
        ("a", gold), ("k", base), ("i", gold),
    ]

    # Approximate Georgia character widths at 48px
    char_widths = {"R": 33, "a": 26, "u": 27, "t": 18, "k": 27, "i": 14}
    wordmark_w = sum(char_widths[ch] for ch, _ in letters)

    pad_x = 20
    pad_top = 20
    pad_bottom = 20

    tagline_text = "STRATEGY  \u00b7  ADVISORY  \u00b7  GROWTH"
    tagline_gap = 10

    # Tagline width: ~32 chars × (tagline_size × 0.6 + tagline_size × 0.22) per char
    # With 0.22em letter-spacing, each char is effectively ~0.82em wide
    tagline_w = len(tagline_text) * tagline_size * 0.82

    wordmark_h = font_size
    if with_tagline:
        total_content_h = wordmark_h + tagline_gap + tagline_size + 4
    else:
        total_content_h = wordmark_h

    content_w = max(wordmark_w, tagline_w) if with_tagline else wordmark_w
    svg_w = content_w + 2 * pad_x
    svg_h = total_content_h + pad_top + pad_bottom
    baseline_y = pad_top + font_size * 0.82

    parts = []
    parts.append(f'<svg xmlns="http://www.w3.org/2000/svg" '
                 f'viewBox="0 0 {svg_w} {svg_h}" '
                 f'width="{svg_w}" height="{svg_h}">')

    if bg is not None:
        parts.append(f'  <rect width="{svg_w}" height="{svg_h}" fill="{bg}"/>')

    cursor_x = pad_x
    for ch, color in letters:
        parts.append(
            f'  <text x="{cursor_x}" y="{baseline_y}" '
            f'font-family="Georgia, \'Times New Roman\', serif" '
            f'font-size="{font_size}" '
            f'font-weight="400" '
            f'letter-spacing="-0.03em" '
            f'fill="{color}">{ch}</text>'
        )
        cursor_x += char_widths[ch]

    if with_tagline:
        tag_y = baseline_y + tagline_gap + tagline_size
        parts.append(
            f'  <text x="{pad_x}" y="{tag_y}" '
            f'font-family="\'DM Sans\', Helvetica, Arial, sans-serif" '
            f'font-size="{tagline_size}" '
            f'font-weight="500" '
            f'letter-spacing="0.22em" '
            f'fill="{tagline_color}">{tagline_text}</text>'
        )

    parts.append('</svg>')
    return "\n".join(parts)


def render_png(variant, with_tagline, target_width):
    """Render logo as a PIL Image at a given width using Pillow."""
    v = VARIANTS[variant]
    base = v["base_color"]
    gold = v["gold_color"]
    tagline_color = v["tagline_color"]
    is_transparent = v["transparent"]
    bg_hex = v["bg"]

    # Scale factor based on target width
    # Base design width ~211px (wordmark + padding)
    # We render at high res then resize
    scale = max(target_width / 211, 1.0)
    font_size = int(48 * scale)
    tagline_size = int(11 * scale)
    pad_x = int(20 * scale)
    pad_top = int(20 * scale)
    pad_bottom = int(20 * scale)
    tagline_gap = int(10 * scale)

    # Load fonts
    try:
        georgia = ImageFont.truetype(GEORGIA_PATH, font_size)
        georgia_tag = ImageFont.truetype(HELVETICA_PATH, tagline_size)
    except OSError:
        georgia = ImageFont.load_default()
        georgia_tag = ImageFont.load_default()

    # Measure wordmark width by drawing each letter
    letters = list("Rautaki")
    gold_indices = {4, 6}

    # Measure total width
    total_w = 0
    for ch in letters:
        bbox = georgia.getbbox(ch)
        total_w += bbox[2] - bbox[0] + int(1 * scale)  # small kerning adjustment

    tagline_text = "STRATEGY  \u00b7  ADVISORY  \u00b7  GROWTH"

    # Image dimensions — measure tagline width with letter-spacing
    wordmark_w = total_w
    if with_tagline:
        # Simulate wide letter-spacing: measure each char and add spacing
        tag_total_w = 0
        for ch in tagline_text:
            ch_bbox = georgia_tag.getbbox(ch)
            ch_w = ch_bbox[2] - ch_bbox[0] if ch.strip() else int(tagline_size * 0.3)
            tag_total_w += ch_w + int(tagline_size * 0.22)  # 0.22em spacing
        tag_bbox = georgia_tag.getbbox(tagline_text)
        tag_h = tag_bbox[3] - tag_bbox[1]
        content_w = max(wordmark_w, tag_total_w)
        content_h = font_size + tagline_gap + tag_h
    else:
        content_w = wordmark_w
        content_h = font_size
    img_w = content_w + 2 * pad_x
    img_h = content_h + pad_top + pad_bottom

    # Create image
    if is_transparent:
        img = Image.new("RGBA", (img_w, img_h), (0, 0, 0, 0))
    else:
        img = Image.new("RGBA", (img_w, img_h), hex_to_rgba(bg_hex))

    draw = ImageDraw.Draw(img)

    # Draw wordmark letter by letter
    cursor_x = pad_x
    for i, ch in enumerate(letters):
        color = hex_to_rgba(gold) if i in gold_indices else hex_to_rgba(base)
        draw.text((cursor_x, pad_top), ch, fill=color, font=georgia)
        bbox = georgia.getbbox(ch)
        cursor_x += bbox[2] - bbox[0] + int(1 * scale)

    # Draw tagline with manual letter-spacing (0.22em)
    if with_tagline:
        tag_y = pad_top + font_size + tagline_gap
        spacing = int(tagline_size * 0.22)
        tx = pad_x
        for ch in tagline_text:
            draw.text((tx, tag_y), ch, fill=hex_to_rgba(tagline_color), font=georgia_tag)
            ch_bbox = georgia_tag.getbbox(ch)
            ch_w = ch_bbox[2] - ch_bbox[0] if ch.strip() else int(tagline_size * 0.3)
            tx += ch_w + spacing

    # Resize to exact target width, maintaining aspect ratio
    aspect = img_h / img_w
    final_w = target_width
    final_h = int(target_width * aspect)
    img = img.resize((final_w, final_h), Image.LANCZOS)

    return img


def save_svg(svg_content, filepath):
    """Save SVG string to file."""
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(svg_content)


def main():
    count = 0
    for variant_name in VARIANTS:
        for with_tagline in [False, True]:
            suffix = "-tagline" if with_tagline else ""
            base_name = f"{variant_name}{suffix}"

            # Save SVG
            svg_content = build_svg(variant_name, with_tagline)
            svg_path = os.path.join(OUTPUT_DIR, f"{base_name}.svg")
            save_svg(svg_content, svg_path)
            print(f"  SVG: {base_name}.svg")
            count += 1

            # Save PNGs at each size
            for size_label, width in PNG_SIZES.items():
                png_path = os.path.join(OUTPUT_DIR, f"{base_name}-{size_label}.png")
                img = render_png(variant_name, with_tagline, width)
                img.save(png_path, "PNG", optimize=True)
                print(f"  PNG: {base_name}-{size_label}.png ({img.size[0]}x{img.size[1]})")
                count += 1

    print(f"\nDone. {count} files saved to docs/design/logos/")


if __name__ == "__main__":
    main()