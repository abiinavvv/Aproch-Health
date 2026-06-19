import sharp from "sharp";
import { stat, rename, unlink } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve("public/videos");
const MAX_WIDTH = 1400;

const images = [
  {
    png: "Gemini_Generated_Image_8iaulf8iaulf8iau.png",
    webp: "Gemini_Generated_Image_8iaulf8iaulf8iau.webp",
  },
  {
    png: "Gemini_Generated_Image_sr7ukusr7ukusr7u.png",
    webp: "Gemini_Generated_Image_sr7ukusr7ukusr7u.webp",
  },
];

function formatBytes(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

for (const { png, webp } of images) {
  const inputPath = path.join(ROOT, png);
  const pngOutPath = path.join(ROOT, `${path.parse(png).name}.optimized.png`);
  const webpPath = path.join(ROOT, webp);

  const meta = await sharp(inputPath).metadata();
  const resizeWidth = meta.width && meta.width > MAX_WIDTH ? MAX_WIDTH : undefined;

  await sharp(inputPath)
    .resize({ width: resizeWidth, withoutEnlargement: true })
    .png({ compressionLevel: 9, quality: 82, effort: 10 })
    .toFile(pngOutPath);

  await sharp(inputPath)
    .resize({ width: resizeWidth, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(webpPath);

  const before = (await stat(inputPath)).size;
  const afterPng = (await stat(pngOutPath)).size;
  const afterWebp = (await stat(webpPath)).size;

  await rename(pngOutPath, inputPath);

  console.log(`${png}:`);
  console.log(`  ${meta.width}x${meta.height} -> max width ${resizeWidth ?? meta.width}`);
  console.log(`  PNG:  ${formatBytes(before)} -> ${formatBytes(afterPng)}`);
  console.log(`  WebP: ${formatBytes(afterWebp)} (${webp})`);
}
