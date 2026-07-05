import fs from "fs";
import path from "path";

const logoPath = path.join("public", "images", "aproch-logo.svg");
const iconPath = path.join("app", "icon.svg");
const logo = fs.readFileSync(logoPath, "utf8");

const paths = [...logo.matchAll(/<path fill="currentColor"[^>]*\s+d="\s*([^"]+)"/gs)].map(
  (match) => match[1].replace(/\s+/g, " ").trim()
);

const pathMarkup = paths
  .map((d) => `    <path fill="#1c1008" d="${d}"/>`)
  .join("\n");

const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 336 336">
  <rect width="336" height="336" rx="48" fill="#f8f1e8"/>
  <g transform="translate(19, 119) scale(0.291)">
${pathMarkup}
  </g>
</svg>
`;

fs.writeFileSync(iconPath, icon);
