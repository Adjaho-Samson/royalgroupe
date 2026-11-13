"""Contrôles des métadonnées de partage, sans réseau ni dépendance externe."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import struct
import unittest

ROOT = Path(__file__).resolve().parents[1]


class HeadParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.meta = {}
        self.canonical = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "meta":
            key = attrs.get("property", attrs.get("name"))
            if key:
                self.meta.setdefault(key, []).append(attrs.get("content", ""))
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonical.append(attrs.get("href", ""))


def jpeg_size(path):
    """Lit les dimensions SOF du JPEG avec la bibliothèque standard."""
    with path.open("rb") as image:
        if image.read(2) != b"\xff\xd8":
            raise ValueError("L'image n'est pas un JPEG")
        while True:
            if image.read(1) != b"\xff":
                raise ValueError("Marqueur JPEG manquant")
            marker = image.read(1)
            while marker == b"\xff":
                marker = image.read(1)
            length = struct.unpack(">H", image.read(2))[0]
            data = image.read(length - 2)
            if marker in (b"\xc0", b"\xc1", b"\xc2"):
                height, width = struct.unpack(">HH", data[1:5])
                return width, height


class SocialMetadataTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.head = HeadParser()
        cls.head.feed((ROOT / "index.html").read_text().split("</head>")[0])

    def value(self, key):
        values = self.head.meta.get(key, [])
        self.assertEqual(len(values), 1, f"Balise unique requise : {key}")
        self.assertTrue(values[0].strip(), key)
        return values[0]

    def test_page_identity(self):
        self.assertEqual(self.head.canonical, [self.value("og:url")])
        self.assertEqual(self.value("og:type"), "website")
        self.assertEqual(self.value("og:locale"), "fr_FR")
        self.assertEqual(self.value("og:site_name"), "Royal Group")
        url = urlsplit(self.value("og:url"))
        self.assertEqual(url.scheme, "https")
        self.assertTrue(url.netloc)
        self.assertFalse(url.fragment)

    def test_text_consistency(self):
        for field in ("title", "description", "image:alt"):
            self.assertEqual(self.value(f"og:{field}"), self.value(f"twitter:{field}"))
        self.assertEqual(self.value("twitter:card"), "summary_large_image")

    def test_image(self):
        image_url = self.value("og:image")
        self.assertEqual(image_url, self.value("og:image:secure_url"))
        self.assertEqual(image_url, self.value("twitter:image"))
        url = urlsplit(image_url)
        page = urlsplit(self.value("og:url"))
        self.assertEqual((url.scheme, url.netloc), ("https", page.netloc))
        image = ROOT / url.path.lstrip("/")
        self.assertTrue(image.is_file())
        self.assertEqual(self.value("og:image:type"), "image/jpeg")
        self.assertEqual(jpeg_size(image), (1200, 630))
        self.assertEqual(jpeg_size(image), (
            int(self.value("og:image:width")), int(self.value("og:image:height"))))
        self.assertLess(image.stat().st_size, 300_000)


if __name__ == "__main__":
    unittest.main()
