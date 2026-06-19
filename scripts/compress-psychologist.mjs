import sharp from "sharp";
import { stat } from "node:fs/promises";
import path from "node:path";

const inputPath = path.resolve("public/images/psychologist.png");
const webpPath = path.resolve("public/images/psychologist.webp");
const MAX_WIDTH = 560;

const meta = await sharp(inputPath).metadata();
const resizeWidth = meta.width && meta.width > MAX_WIDTH ? MAX_WIDTH : undefined;

await sharp(inputPath)
  .resize({ width: resizeWidth, withoutEnlargement: true })
  .webp({ quality: 82, effort: 6 })
  .toFile(webpPath);

const before = (await stat(inputPath)).size;
const after = (await stat(webpPath)).size;

console.log(`psychologist.png: ${(before / 1024).toFixed(0)} KB`);
console.log(`psychologist.webp: ${(after / 1024).toFixed(0)} KB (${webpPath})`);
