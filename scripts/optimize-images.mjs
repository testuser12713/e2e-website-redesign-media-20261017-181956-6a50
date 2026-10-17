import { mkdir, copyFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceDir = path.join(root, "design", "site-assets");
const outputDir = path.join(root, "src", "assets", "images");
const publicDir = path.join(root, "public");

const logoSource = "3a55ef-56b2d617ae9e4f099fa00df188d90770.svg";
const socialImageSource = "3a55ef-66029c8cf4e342be872013bef2b385b4-mv2.jpg";

const images = [
  {
    name: "hero",
    source: "3a55ef-66029c8cf4e342be872013bef2b385b4-mv2.jpg",
    widths: [960, 1600, 2740],
  },
  {
    name: "plant",
    source: "3a55ef-12e8654dd7424476a506c0e5f67670fd-mv2.jpg",
    widths: [720, 1200, 1440],
  },
  {
    name: "reference-neubau",
    source: "3a55ef-fc3d47482d204345a36da00e723fcd45f000.jpg",
    widths: [640, 1080, 1440],
  },
  {
    name: "team",
    source: "equicrew-team-compressed.jpg",
    widths: [900, 1600, 2228],
  },
  {
    name: "portrait-michael",
    source: "250717-michael-square.jpg",
    widths: [320, 596],
  },
  {
    name: "portrait-christian-hinterdorfer",
    source: "250717-hinterdorfer-square.jpg",
    widths: [320, 596],
  },
  {
    name: "portrait-christian-hinterreiter",
    source: "250717-hinterreiter-square.jpg",
    widths: [320, 596],
  },
  {
    name: "cube",
    source: "equicube-offen-draft.png",
    widths: [600, 900, 1215],
    transparent: true,
  },
  {
    name: "cube-reverse",
    source: "equicube-offen-draft-reverse.png",
    widths: [600, 900, 1215],
    transparent: true,
  },
];

async function renderVariants(image) {
  const input = path.join(sourceDir, image.source);
  const metadata = await sharp(input).metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error(`Cannot read image dimensions for ${image.source}`);
  }

  for (const requestedWidth of image.widths) {
    const width = Math.min(requestedWidth, metadata.width);
    const height = Math.round((metadata.height * width) / metadata.width);
    const baseName = `${image.name}-${width}`;
    const resized = sharp(input).resize({ width, withoutEnlargement: true });

    await resized
      .clone()
      .avif({ quality: 58, effort: 5 })
      .toFile(path.join(outputDir, `${baseName}.avif`));

    await resized
      .clone()
      .webp({ quality: 80, effort: 5 })
      .toFile(path.join(outputDir, `${baseName}.webp`));

    if (image.transparent) {
      await resized
        .clone()
        .png({ compressionLevel: 9, palette: true, quality: 90, effort: 8 })
        .toFile(path.join(outputDir, `${baseName}.png`));
    } else {
      await resized
        .clone()
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(path.join(outputDir, `${baseName}.jpg`));
    }

    console.log(`${baseName}: ${width}x${height}`);
  }
}

async function buildSocialImage() {
  await sharp(path.join(sourceDir, socialImageSource))
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(publicDir, "og-image.jpg"));
  console.log("og-image.jpg: 1200x630");
}

async function main() {
  await mkdir(outputDir, { recursive: true });
  await mkdir(publicDir, { recursive: true });

  for (const image of images) {
    await renderVariants(image);
  }

  await buildSocialImage();
  await copyFile(path.join(sourceDir, logoSource), path.join(publicDir, "favicon.svg"));
  console.log("favicon.svg copied from the logo asset");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
