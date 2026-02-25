---
name: image_to_webp
description: Download one or more remote images from direct URLs, resize them to web-ready dimensions, and convert them to optimized WebP files in the project's public directory. Use when preparing stock images (for example Pexels/Unsplash) for production performance, including batch processing multiple URLs at once.
---

# image_to_webp

Use `scripts/image_to_webp.py` to fetch remote images, resize, and export `.webp` files into `public/`.

## Defaults

- Default output size: `800x600`
- Default fit mode: `cover` (produces exact `800x600` output by cropping as needed)
- Default output directory: `public/images/stock`

## Quick Start

1. Convert one image URL:

```bash
python3 .claude/skills/image_to_webp/scripts/image_to_webp.py \
  --url "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=2000&q=80"
```

2. Batch convert multiple URLs from a text file (`urls.txt`, one URL per line):

```bash
python3 .claude/skills/image_to_webp/scripts/image_to_webp.py \
  --urls-file .claude/skills/image_to_webp/urls.txt
```

3. Batch convert multiple URLs passed directly:

```bash
python3 .claude/skills/image_to_webp/scripts/image_to_webp.py \
  --url "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=2000&q=80" \
  --url "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=2000&q=80" \
  --url "https://images.unsplash.com/photo-1552664730-d307ca884978?w=2000&q=80"
```

## Common Options

- `--output-dir public/...` to choose a different public subfolder.
- `--width` and `--height` to override size (defaults are `800` and `600`).
- `--fit inside|cover|contain` to control resizing behavior.
- `--quality` for lossy WebP quality (default `82`).
- `--lossless` for lossless WebP.
- `--name` to force a specific basename (single URL only).
- `--prefix` to prepend a label to output filenames.
- `--no-hash` to disable URL hash suffixes.

## URL File Format

For `--urls-file`, use one URL per line. Empty lines and lines starting with `#` are ignored.

```text
# Homepage hero
https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=2000&q=80

# Services cards
https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=2000&q=80
https://images.unsplash.com/photo-1552664730-d307ca884978?w=2000&q=80
```
