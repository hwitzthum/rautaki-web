#!/usr/bin/env python3
"""
Rautaki OpenGraph-Bild Generator
Erzeugt das Site-weite Social-Preview-Bild (1200 × 630 PNG) für
layout.tsx (openGraph.images / twitter.images → /og-image.png).

Dark-Variante analog zum Booklet-Cover und zur LinkedIn-Social-Card:
Obsidian-Fläche, Logo (bestehendes PNG-Asset als Single Source of Truth),
Georgia-Headline mit gold-kursiver Hervorhebung (die Site-H1), Ghost-„R"
rechts, Gold-Gradient-Rule und rautaki.ch unten.

Ausführen:  uv run --with pillow docs/design/create-og-image.py
Output:     public/og-image.png
"""

import os
from PIL import Image, ImageDraw, ImageFont

BASE_DIR = os.path.dirname(__file__)
LOGO_PATH = os.path.join(BASE_DIR, "logos", "logo-transparent-light-tagline-1200.png")
OUTPUT_PATH = os.path.join(BASE_DIR, "..", "..", "public", "og-image.png")

# ── Brand tokens ──────────────────────────────────────────────
GOLD = "#F5A623"
OBSIDIAN_HEX = "#0A0A0A"
WHITE_HEX = "#FAFAFA"
MID_GREY = "#9A9590"

GEORGIA_PATH = "/System/Library/Fonts/Supplemental/Georgia.ttf"
GEORGIA_ITALIC_PATH = "/System/Library/Fonts/Supplemental/Georgia Italic.ttf"
# DM Sans ist nicht als TTF verfügbar — Helvetica ist der etablierte Fallback
# (siehe create-visitenkarte.py / Skill-Konvention für PDF/PNG-Exporte).
HELVETICA_PATH = "/System/Library/Fonts/Helvetica.ttc"

W, H = 1200, 630
MARGIN_X = 80


def hex_to_rgba(hex_color, alpha=255):
    h = hex_color.lstrip("#")
    return (int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16), alpha)


def draw_tracked(draw, pos, text, font, fill, tracking_em):
    """Text mit Letter-Spacing zeichnen (PIL kennt kein Tracking nativ)."""
    x, y = pos
    tracking = font.size * tracking_em
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += font.getlength(ch) + tracking
    return x


def tracked_width(text, font, tracking_em):
    tracking = font.size * tracking_em
    return sum(font.getlength(ch) + tracking for ch in text) - tracking


img = Image.new("RGBA", (W, H), hex_to_rgba(OBSIDIAN_HEX))
draw = ImageDraw.Draw(img)

# ── Ghost-„R" — rechts angeschnitten, 4 % Weiss (Spec Social Card, dark) ──
ghost_font = ImageFont.truetype(GEORGIA_PATH, 560)
ghost_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
ImageDraw.Draw(ghost_layer).text(
    (W - 320, H // 2 - 330), "R",
    font=ghost_font, fill=hex_to_rgba(WHITE_HEX, 10),  # ≈ 4 % auf Obsidian
)
img = Image.alpha_composite(img, ghost_layer)
draw = ImageDraw.Draw(img)

# ── Logo oben links (bestehendes Asset, XL-Grösse) ─────────────────────────
logo = Image.open(LOGO_PATH).convert("RGBA")
logo_w = 330
logo = logo.resize((logo_w, round(logo.height * logo_w / logo.width)), Image.LANCZOS)
img.alpha_composite(logo, (MARGIN_X - 20, 48))  # -20 gleicht das Asset-Padding aus

# ── Section-Label: 28px Gold-Linie + Text (Label-Pattern) ──────────────────
label_font = ImageFont.truetype(HELVETICA_PATH, 20)
label_y = 300
draw.rectangle([MARGIN_X, label_y + 9, MARGIN_X + 28, label_y + 11], fill=hex_to_rgba(GOLD))
draw_tracked(
    draw, (MARGIN_X + 42, label_y),
    "FÜR GESCHÄFTSLEITUNGEN & VERWALTUNGSRÄTE",
    label_font, hex_to_rgba(WHITE_HEX, 66), 0.22,  # ≈ white/26 Label-Alpha
)

# ── Headline — die Site-H1, Kerning -0.03em, „KI-Zeitalter" gold-kursiv ────
h_size = 78
serif = ImageFont.truetype(GEORGIA_PATH, h_size)
serif_italic = ImageFont.truetype(GEORGIA_ITALIC_PATH, h_size)
line_h = round(h_size * 1.12)
y = label_y + 52

x = draw_tracked(draw, (MARGIN_X, y), "Strategie im ", serif, hex_to_rgba(WHITE_HEX), -0.03)
draw_tracked(draw, (x, y), "KI-Zeitalter", serif_italic, hex_to_rgba(GOLD), -0.03)
draw_tracked(draw, (MARGIN_X, y + line_h), "mit Wirkung.", serif, hex_to_rgba(WHITE_HEX), -0.03)

# ── Footer: 3px Gold-Gradient-Rule + rautaki.ch ────────────────────────────
rule_y = H - 84
rule_w = W - 2 * MARGIN_X
gradient = Image.new("RGBA", (rule_w, 3), (0, 0, 0, 0))
gpx = gradient.load()
for gx in range(rule_w):
    alpha = round(255 * (1 - gx / rule_w))
    for gy in range(3):
        gpx[gx, gy] = hex_to_rgba(GOLD, alpha)
img.alpha_composite(gradient, (MARGIN_X, rule_y))
draw = ImageDraw.Draw(img)

site_font = ImageFont.truetype(HELVETICA_PATH, 18)
site_text = "RAUTAKI.CH"
site_w = tracked_width(site_text, site_font, 0.22)
draw_tracked(
    draw, (W - MARGIN_X - site_w, rule_y + 22),
    site_text, site_font, hex_to_rgba(MID_GREY), 0.22,
)

os.makedirs(os.path.dirname(os.path.abspath(OUTPUT_PATH)), exist_ok=True)
img.convert("RGB").save(OUTPUT_PATH, "PNG", optimize=True)
print(f"OK → {os.path.abspath(OUTPUT_PATH)} ({W}×{H})")
