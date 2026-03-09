#!/usr/bin/env python3
"""
Rautaki Business Card Generator — Print-Ready PDF
Generates front + back for both Obsidian (dark) and Cream (light) variants.
Output: docs/design/visitenkarte-obsidian.pdf, visitenkarte-cream.pdf
Size: 85 × 55 mm + 3 mm bleed on all sides = 91 × 61 mm total
"""

import os
import io
import qrcode
from reportlab.lib.units import mm
from reportlab.lib.colors import Color, white, black
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# ── Register system Georgia font ─────────────────────────────
_font_dir = "/System/Library/Fonts/Supplemental"
pdfmetrics.registerFont(TTFont("Georgia", os.path.join(_font_dir, "Georgia.ttf")))
pdfmetrics.registerFont(TTFont("Georgia-Italic", os.path.join(_font_dir, "Georgia Italic.ttf")))

# ── Brand tokens ──────────────────────────────────────────────
GOLD = Color(245 / 255, 166 / 255, 35 / 255)       # #F5A623
OBSIDIAN = Color(10 / 255, 10 / 255, 10 / 255)      # #0A0A0A
INK = Color(28 / 255, 28 / 255, 28 / 255)           # #1C1C1C
CREAM = Color(244 / 255, 242 / 255, 238 / 255)      # #F4F2EE
WHITE_CLR = Color(250 / 255, 250 / 255, 250 / 255)  # #FAFAFA
MID_GREY = Color(154 / 255, 149 / 255, 144 / 255)   # #9A9590

# ── Dimensions ────────────────────────────────────────────────
CARD_W = 85 * mm
CARD_H = 55 * mm
BLEED = 3 * mm
TOTAL_W = CARD_W + 2 * BLEED  # 91 mm
TOTAL_H = CARD_H + 2 * BLEED  # 61 mm

# Trim box (actual card area)
TRIM_X = BLEED
TRIM_Y = BLEED
TRIM_RIGHT = BLEED + CARD_W
TRIM_TOP = BLEED + CARD_H

# Safe zone (5 mm inside trim)
SAFE = 5 * mm
SAFE_X = TRIM_X + SAFE
SAFE_Y = TRIM_Y + SAFE
SAFE_RIGHT = TRIM_RIGHT - SAFE
SAFE_TOP = TRIM_TOP - SAFE
SAFE_W = SAFE_RIGHT - SAFE_X
SAFE_H = SAFE_TOP - SAFE_Y

# Fonts
SERIF = "Georgia"
SANS = "Helvetica"  # Closest built-in fallback for DM Sans


def draw_trim_marks(c):
    """Draw crop/trim marks at corners of the trim area."""
    c.setStrokeColor(black)
    c.setLineWidth(0.25)
    mark_len = 3 * mm
    offset = 1 * mm  # gap between mark and trim edge

    corners = [
        (TRIM_X, TRIM_Y),           # bottom-left
        (TRIM_RIGHT, TRIM_Y),       # bottom-right
        (TRIM_X, TRIM_TOP),         # top-left
        (TRIM_RIGHT, TRIM_TOP),     # top-right
    ]

    for cx, cy in corners:
        # Horizontal marks
        if cx == TRIM_X:
            c.line(cx - mark_len - offset, cy, cx - offset, cy)
        else:
            c.line(cx + offset, cy, cx + mark_len + offset, cy)
        # Vertical marks
        if cy == TRIM_Y:
            c.line(cx, cy - mark_len - offset, cx, cy - offset)
        else:
            c.line(cx, cy + offset, cx, cy + mark_len + offset)


def draw_logo(c, x, y, size, base_color):
    """Draw 'Rautaki' wordmark with gold 'a' (pos 5) and 'i' (pos 7)."""
    c.setFont(SERIF, size)
    letters = list("Rautaki")
    gold_indices = [4, 6]  # 0-indexed: 'a' at 4, 'i' at 6
    cursor = x
    for i, ch in enumerate(letters):
        if i in gold_indices:
            c.setFillColor(GOLD)
        else:
            c.setFillColor(base_color)
        c.drawString(cursor, y, ch)
        cursor += c.stringWidth(ch, SERIF, size)
    return cursor - x  # total width


def draw_tagline(c, x, y, color):
    """Draw 'STRATEGY · ADVISORY · GROWTH' tagline."""
    c.setFont(SANS, 5.5)
    c.setFillColor(color)
    text = "STRATEGY  ·  ADVISORY  ·  GROWTH"
    c.drawString(x, y, text)


def generate_qr(url, size_px=200):
    """Generate QR code as a PIL image."""
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=10,
        border=0,
    )
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    return img.get_image().resize((size_px, size_px))


def draw_qr(c, img, x, y, size, bg_color):
    """Draw QR code with a matching background square behind it."""
    # Background square (slightly larger for padding)
    pad = 1.5 * mm
    c.setFillColor(white if bg_color == OBSIDIAN else WHITE_CLR)
    c.rect(x - pad, y - pad, size + 2 * pad, size + 2 * pad, fill=1, stroke=0)
    # QR image
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    buf.seek(0)
    c.drawImage(ImageReader(buf), x, y, width=size, height=size)


def draw_gold_rule(c, x1, y, x2):
    """Draw a thin gold horizontal rule."""
    c.setStrokeColor(GOLD)
    c.setLineWidth(0.75)
    c.line(x1, y, x2, y)


# ── FRONT SIDE ────────────────────────────────────────────────

def draw_front(c, bg_color, text_color):
    """Front: Logo centered, tagline below, gold accent line."""
    # Background (with bleed)
    c.setFillColor(bg_color)
    c.rect(0, 0, TOTAL_W, TOTAL_H, fill=1, stroke=0)

    # Gold accent line at top (inside safe zone)
    line_y = SAFE_TOP - 2 * mm
    draw_gold_rule(c, SAFE_X, line_y, SAFE_X + 20 * mm)

    # Logo — centered vertically and horizontally
    logo_size = 18
    c.setFont(SERIF, logo_size)
    logo_text = "Rautaki"
    logo_w = c.stringWidth(logo_text, SERIF, logo_size)
    logo_x = TRIM_X + (CARD_W - logo_w) / 2
    logo_y = TRIM_Y + CARD_H * 0.52

    draw_logo(c, logo_x, logo_y, logo_size, text_color)

    # Tagline below logo
    c.setFont(SANS, 5.5)
    tagline = "STRATEGY  ·  ADVISORY  ·  GROWTH"
    tag_w = c.stringWidth(tagline, SANS, 5.5)
    tag_x = TRIM_X + (CARD_W - tag_w) / 2
    tag_y = logo_y - 5.5 * mm
    draw_tagline(c, tag_x, tag_y, GOLD)

    # Gold accent line at bottom
    draw_gold_rule(c, SAFE_RIGHT - 20 * mm, SAFE_Y + 2 * mm, SAFE_RIGHT)

    # Website at bottom center
    c.setFont(SANS, 5)
    url = "www.rautaki.ch"
    url_w = c.stringWidth(url, SANS, 5)
    url_x = TRIM_X + (CARD_W - url_w) / 2
    url_y = SAFE_Y + 5 * mm
    c.setFillColor(MID_GREY)
    c.drawString(url_x, url_y, url)

    draw_trim_marks(c)


# ── BACK SIDE ─────────────────────────────────────────────────

def draw_back(c, bg_color, text_color, qr_img):
    """Back: Contact details left, QR code right."""
    # Background (with bleed)
    c.setFillColor(bg_color)
    c.rect(0, 0, TOTAL_W, TOTAL_H, fill=1, stroke=0)

    secondary_color = MID_GREY if bg_color == CREAM else Color(1, 1, 1, 0.45)

    # Small logo top-left
    logo_y = SAFE_TOP - 4 * mm
    draw_logo(c, SAFE_X, logo_y, 10, text_color)

    # Gold accent line below logo
    draw_gold_rule(c, SAFE_X, logo_y - 3 * mm, SAFE_X + 15 * mm)

    # Contact details
    name_y = logo_y - 10 * mm
    c.setFillColor(text_color)
    c.setFont(SERIF, 9)
    c.drawString(SAFE_X, name_y, "Vorname Nachname")

    c.setFont(SERIF, 6.5)
    c.setFillColor(GOLD)
    title_y = name_y - 4 * mm
    c.drawString(SAFE_X, title_y, "Titel / Position")

    # Contact lines
    c.setFont(SERIF, 6)
    c.setFillColor(secondary_color)
    details = [
        "+41 XX XXX XX XX",
        "vorname@rautaki.ch",
        "www.rautaki.ch",
    ]
    line_y = title_y - 6.5 * mm
    for detail in details:
        c.drawString(SAFE_X, line_y, detail)
        line_y -= 3.5 * mm

    # Address block
    line_y -= 1 * mm
    address_lines = [
        "Rautaki GmbH",
        "Musterstrasse 1",
        "8000 Zürich",
    ]
    for addr_line in address_lines:
        c.drawString(SAFE_X, line_y, addr_line)
        line_y -= 3.5 * mm

    # QR code — right side, vertically centered
    qr_size = 16 * mm
    qr_x = SAFE_RIGHT - qr_size
    qr_y = TRIM_Y + (CARD_H - qr_size) / 2
    draw_qr(c, qr_img, qr_x, qr_y, qr_size, bg_color)

    # Small label under QR
    c.setFont(SANS, 4)
    c.setFillColor(MID_GREY)
    label = "rautaki.ch"
    label_w = c.stringWidth(label, SANS, 4)
    c.drawString(qr_x + (qr_size - label_w) / 2, qr_y - 3.5 * mm, label)

    # Gold accent bottom-right
    draw_gold_rule(c, SAFE_RIGHT - 20 * mm, SAFE_Y + 2 * mm, SAFE_RIGHT)

    draw_trim_marks(c)


# ── Main ──────────────────────────────────────────────────────

def create_card(filename, bg_color, text_color):
    """Create a 2-page PDF: page 1 = front, page 2 = back."""
    filepath = os.path.join(os.path.dirname(__file__), filename)
    c = canvas.Canvas(filepath, pagesize=(TOTAL_W, TOTAL_H))

    # Set PDF metadata
    c.setTitle(f"Rautaki Visitenkarte — {'Obsidian' if bg_color == OBSIDIAN else 'Cream'}")
    c.setAuthor("Rautaki GmbH")
    c.setSubject("Business Card Template")

    # Generate QR code
    qr_img = generate_qr("https://www.rautaki.ch")

    # Page 1: Front
    draw_front(c, bg_color, text_color)
    c.showPage()

    # Page 2: Back
    draw_back(c, bg_color, text_color, qr_img)
    c.showPage()

    c.save()
    print(f"Created: {filepath}")


if __name__ == "__main__":
    # Dark variant (Obsidian background)
    create_card("visitenkarte-obsidian.pdf", OBSIDIAN, WHITE_CLR)

    # Light variant (Cream background)
    create_card("visitenkarte-cream.pdf", CREAM, INK)

    print("\nDone. Both variants saved to docs/design/")