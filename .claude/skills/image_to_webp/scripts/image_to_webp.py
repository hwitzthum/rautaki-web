#!/usr/bin/env python3
"""Download image URLs, resize, and convert to WebP for web delivery."""

from __future__ import annotations

import argparse
import hashlib
import io
import re
import sys
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Iterable, List

from PIL import Image, ImageOps, UnidentifiedImageError


DEFAULT_WIDTH = 800
DEFAULT_HEIGHT = 600


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Download image URL(s), resize (default 800x600), and convert to WebP "
            "in public/."
        )
    )
    parser.add_argument("--url", action="append", help="Input image URL (repeatable)")
    parser.add_argument(
        "--urls-file",
        type=Path,
        help="Text file with one URL per line; lines starting with # are ignored",
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=Path("public/images/stock"),
        help="Output directory (default: public/images/stock)",
    )
    parser.add_argument(
        "--width",
        type=int,
        default=DEFAULT_WIDTH,
        help=f"Target width (default: {DEFAULT_WIDTH})",
    )
    parser.add_argument(
        "--height",
        type=int,
        default=DEFAULT_HEIGHT,
        help=f"Target height (default: {DEFAULT_HEIGHT})",
    )
    parser.add_argument(
        "--fit",
        choices=("inside", "cover", "contain"),
        default="cover",
        help="Resize behavior when width and height are both set (default: cover)",
    )
    parser.add_argument(
        "--quality",
        type=int,
        default=82,
        help="WebP quality 1-100 (default: 82)",
    )
    parser.add_argument(
        "--name",
        help="Output base name for single URL mode (no extension)",
    )
    parser.add_argument(
        "--prefix",
        default="",
        help="Prefix for output file names (for example: homepage-)",
    )
    parser.add_argument(
        "--no-hash",
        action="store_true",
        help="Disable short URL hash suffix in output names",
    )
    parser.add_argument(
        "--lossless",
        action="store_true",
        help="Use lossless WebP",
    )
    parser.add_argument(
        "--timeout",
        type=float,
        default=20.0,
        help="Download timeout in seconds (default: 20)",
    )

    args = parser.parse_args()

    if args.quality < 1 or args.quality > 100:
        parser.error("--quality must be between 1 and 100")

    if args.width <= 0:
        parser.error("--width must be a positive integer")
    if args.height <= 0:
        parser.error("--height must be a positive integer")

    return args


def read_urls_from_file(path: Path) -> List[str]:
    if not path.exists():
        raise FileNotFoundError(f"URL file not found: {path}")

    urls: List[str] = []
    for line in path.read_text(encoding="utf-8").splitlines():
        value = line.strip()
        if not value or value.startswith("#"):
            continue
        urls.append(value)
    return urls


def collect_urls(cli_urls: Iterable[str] | None, file_urls: Iterable[str] | None) -> List[str]:
    urls: List[str] = []
    if cli_urls:
        urls.extend(cli_urls)
    if file_urls:
        urls.extend(file_urls)

    if not urls:
        raise ValueError("Provide at least one --url or --urls-file")

    return urls


def sanitize_slug(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return slug or "image"


def derive_base_name(url: str) -> str:
    parsed = urllib.parse.urlparse(url)
    path_name = Path(parsed.path).stem
    if path_name:
        return sanitize_slug(path_name)
    host = parsed.netloc.replace(":", "-")
    return sanitize_slug(host) or "image"


def hashed_suffix(url: str) -> str:
    return hashlib.sha1(url.encode("utf-8")).hexdigest()[:10]


def unique_output_path(path: Path) -> Path:
    if not path.exists():
        return path

    stem = path.stem
    suffix = path.suffix
    counter = 2
    while True:
        candidate = path.with_name(f"{stem}-{counter}{suffix}")
        if not candidate.exists():
            return candidate
        counter += 1


def download_image_bytes(url: str, timeout: float) -> bytes:
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0 (image_to_webp skill)"},
    )
    with urllib.request.urlopen(request, timeout=timeout) as response:
        return response.read()


def resize_image(
    image: Image.Image,
    width: int,
    height: int,
    fit: str,
) -> Image.Image:
    if fit == "cover":
        return ImageOps.fit(image, (width, height), method=Image.Resampling.LANCZOS)
    if fit == "contain":
        return ImageOps.contain(image, (width, height), method=Image.Resampling.LANCZOS)

    copy = image.copy()
    copy.thumbnail((width, height), Image.Resampling.LANCZOS)
    return copy


def prepare_image_for_webp(image: Image.Image) -> Image.Image:
    # Keep alpha when present. Convert palette/CMYK/etc. to web-safe modes.
    if image.mode in ("RGBA", "LA"):
        return image.convert("RGBA")
    return image.convert("RGB")


def build_output_name(
    *,
    index: int,
    url: str,
    explicit_name: str | None,
    prefix: str,
    include_hash: bool,
    total_urls: int,
) -> str:
    if explicit_name:
        if total_urls != 1:
            raise ValueError("--name can only be used when processing a single URL")
        base = sanitize_slug(explicit_name)
    else:
        base = derive_base_name(url)

    if include_hash:
        return f"{prefix}{base}-{hashed_suffix(url)}.webp"

    if total_urls > 1:
        return f"{prefix}{base}-{index + 1}.webp"

    return f"{prefix}{base}.webp"


def convert_url(
    *,
    url: str,
    output_dir: Path,
    width: int,
    height: int,
    fit: str,
    quality: int,
    lossless: bool,
    output_name: str,
    timeout: float,
) -> Path:
    data = download_image_bytes(url, timeout=timeout)

    try:
        image = Image.open(io.BytesIO(data))
    except UnidentifiedImageError as exc:
        raise ValueError(f"Unsupported or invalid image data from URL: {url}") from exc

    image = prepare_image_for_webp(image)
    image = resize_image(image, width=width, height=height, fit=fit)

    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = unique_output_path(output_dir / output_name)

    save_kwargs = {
        "format": "WEBP",
        "optimize": True,
        "method": 6,
        "lossless": lossless,
    }
    if not lossless:
        save_kwargs["quality"] = quality

    image.save(output_path, **save_kwargs)
    return output_path


def main() -> int:
    args = parse_args()

    try:
        file_urls = read_urls_from_file(args.urls_file) if args.urls_file else []
        urls = collect_urls(args.url, file_urls)
    except (FileNotFoundError, ValueError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2

    results: List[Path] = []
    errors: List[str] = []

    for index, url in enumerate(urls):
        try:
            output_name = build_output_name(
                index=index,
                url=url,
                explicit_name=args.name,
                prefix=args.prefix,
                include_hash=not args.no_hash,
                total_urls=len(urls),
            )
            output_path = convert_url(
                url=url,
                output_dir=args.output_dir,
                width=args.width,
                height=args.height,
                fit=args.fit,
                quality=args.quality,
                lossless=args.lossless,
                output_name=output_name,
                timeout=args.timeout,
            )
            results.append(output_path)
            print(f"OK  {url} -> {output_path}")
        except Exception as exc:  # pragma: no cover - CLI safety net
            errors.append(f"FAILED {url} :: {exc}")

    print("\nSummary")
    print(f"- Converted: {len(results)}")
    print(f"- Failed: {len(errors)}")

    if errors:
        for err in errors:
            print(err, file=sys.stderr)
        return 1

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
