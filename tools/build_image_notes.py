"""Sinh data/image-notes.js từ các thư mục ảnh học tập.

Chạy:
    python tools/build_image_notes.py

Công cụ hỗ trợ cả assets/notes và tên assests/notes đang có trong project.
"""

from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "data" / "image-notes.js"
IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp", ".gif"}

TITLE_OVERRIDES = {
    "docker": "Docker",
    "dsa": "Cấu trúc dữ liệu & Thuật toán",
    "java core": "Java Core",
    "kn system design": "Kiến thức System Design",
    "oops": "OOP",
    "pv backend": "Phỏng vấn Backend",
    "pv cicd": "Phỏng vấn CI/CD",
    "pv system design": "Phỏng vấn System Design",
    "sql": "SQL",
}

DESCRIPTION_OVERRIDES = {
    "docker": "Ghi chú Docker từ nền tảng, image và container đến cách vận hành ứng dụng.",
    "dsa": "Tổng hợp cấu trúc dữ liệu, thuật toán và cách phân tích độ phức tạp.",
    "java core": "Ghi chú tổng hợp các khái niệm Java nền tảng.",
    "kn system design": "Kiến thức nền để phân tích và thiết kế hệ thống.",
    "oops": "Ghi chú về lập trình hướng đối tượng và cách áp dụng.",
    "pv backend": "Kiến thức thường gặp trong phỏng vấn Backend.",
    "pv cicd": "Ghi chú CI/CD và quy trình đưa ứng dụng lên môi trường chạy.",
    "pv system design": "Gợi ý phân tích bài toán System Design khi phỏng vấn.",
    "sql": "Ghi chú SQL từ nền tảng đến truy vấn dữ liệu.",
}


def find_notes_dir() -> Path:
    for candidate in (ROOT / "assets" / "notes", ROOT / "assests" / "notes"):
        if candidate.is_dir():
            return candidate
    return ROOT / "assets" / "notes"


def slugify(value: str) -> str:
    normalized = unicodedata.normalize("NFD", value)
    ascii_value = normalized.encode("ascii", "ignore").decode("ascii").lower()
    return re.sub(r"[^a-z0-9]+", "-", ascii_value).strip("-") or "bo-tai-lieu"


def page_sort_key(path: Path) -> tuple:
    stem = path.stem.lower().strip()
    if stem == "image":
        return (0, stem)
    if stem == "image copy":
        return (1, stem)
    trailing_number = re.search(r"(\d+)\s*$", stem)
    if trailing_number:
        return (int(trailing_number.group(1)), stem)
    parts = re.split(r"(\d+)", stem)
    natural = tuple(int(part) if part.isdigit() else part for part in parts)
    return (10_000, natural)


def infer_domain(folder_name: str) -> str:
    value = folder_name.lower()
    if value == "dsa" or "algorithm" in value or "thuật toán" in value:
        return "algorithms"
    if "docker" in value or "container" in value:
        return "delivery"
    if "sql" in value:
        return "data"
    if "system design" in value:
        return "architecture"
    if "cicd" in value or "ci cd" in value or "devops" in value:
        return "delivery"
    if "backend" in value:
        return "operations"
    return "java-language"


def build_catalog() -> list[dict]:
    notes_dir = find_notes_dir()
    if not notes_dir.is_dir():
        return []

    catalog = []
    used_ids: set[str] = set()
    for folder in sorted((item for item in notes_dir.iterdir() if item.is_dir()), key=lambda p: p.name.lower()):
        images = sorted(
            (item for item in folder.rglob("*") if item.is_file() and item.suffix.lower() in IMAGE_EXTENSIONS),
            key=page_sort_key,
        )
        if not images:
            continue

        base_id = slugify(folder.name)
        collection_id = base_id
        suffix = 2
        while collection_id in used_ids:
            collection_id = f"{base_id}-{suffix}"
            suffix += 1
        used_ids.add(collection_id)

        key = folder.name.lower()
        relative_images = [item.relative_to(ROOT).as_posix() for item in images]
        catalog.append(
            {
                "id": collection_id,
                "title": TITLE_OVERRIDES.get(key, folder.name.replace("_", " ").strip().title()),
                "description": DESCRIPTION_OVERRIDES.get(
                    key, f"Bộ ghi chú hình ảnh trong thư mục {folder.name}."
                ),
                "domain": infer_domain(folder.name),
                "folder": folder.relative_to(ROOT).as_posix(),
                "cover": relative_images[0],
                "images": relative_images,
            }
        )
    return catalog


def main() -> None:
    catalog = build_catalog()
    content = (
        "// Tệp được sinh tự động bởi tools/build_image_notes.py.\n"
        "window.IMAGE_NOTE_COLLECTIONS = "
        + json.dumps(catalog, ensure_ascii=False, indent=2)
        + ";\n"
    )
    OUTPUT.write_text(content, encoding="utf-8")
    page_count = sum(len(item["images"]) for item in catalog)
    print(f"Created {OUTPUT.relative_to(ROOT)}: {len(catalog)} collections, {page_count} image pages.")


if __name__ == "__main__":
    main()
