import sharp from "sharp";
import { copyFile, mkdir, stat, unlink } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.resolve("public/images/psychologists");
const MAX_WIDTH = 560;

const downloads = [
  { slug: "dr-priya-nair", copyFrom: "public/images/psychologist.png" },
  {
    slug: "dr-ananya-sharma",
    url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=800&fit=crop",
  },
  {
    slug: "dr-rohit-mehta",
    url: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=800&fit=crop",
  },
  {
    slug: "dr-meera-kapoor",
    url: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&h=800&fit=crop",
  },
  {
    slug: "dr-vikram-singh",
    url: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=800&fit=crop",
  },
];

await mkdir(OUT_DIR, { recursive: true });

for (const { slug, url, copyFrom } of downloads) {
  const pngPath = path.join(OUT_DIR, `${slug}.png`);
  const webpPath = path.join(OUT_DIR, `${slug}.webp`);
  const tmpPath = path.join(OUT_DIR, `${slug}.tmp.png`);

  if (copyFrom) {
    await copyFile(path.resolve(copyFrom), tmpPath);
  } else if (url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${slug}: ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await sharp(buf).toFile(tmpPath);
  } else {
    throw new Error(`No source for ${slug}`);
  }

  const meta = await sharp(tmpPath).metadata();
  const resizeWidth = meta.width && meta.width > MAX_WIDTH ? MAX_WIDTH : undefined;

  await sharp(tmpPath)
    .resize({ width: resizeWidth, withoutEnlargement: true })
    .png({ compressionLevel: 9, quality: 82, effort: 10 })
    .toFile(pngPath);

  await sharp(tmpPath)
    .resize({ width: resizeWidth, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(webpPath);

  const pngSize = (await stat(pngPath)).size;
  const webpSize = (await stat(webpPath)).size;
  console.log(`${slug}: PNG ${Math.round(pngSize / 1024)}KB, WebP ${Math.round(webpSize / 1024)}KB`);

  await unlink(tmpPath).catch(() => {});
}

console.log("Done — images in public/images/psychologists/");
