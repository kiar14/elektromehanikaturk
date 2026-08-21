/**
 * Builds the manufacturer logos in their ORIGINAL brand colours.
 *
 *   node scripts/build-brand-logos.cjs
 *
 * The sources arrive in three shapes and each needs different handling
 * before the marks can float on the off-white background:
 *
 *   asIs        – already colour on transparency (the SVGs, Zanussi's
 *                 yellow plate, Elmont's red badge). Rasterise and trim.
 *   whiteToAlpha– opaque white plate behind the mark (the two JPEGs).
 *                 Alpha is taken from the distance to white and the
 *                 colour is un-premultiplied, so a red mark stays fully
 *                 saturated red rather than going pink.
 *   inkFromAlpha– a WHITE mark on transparency (Icematic). Its "original
 *                 colour" is invisible on a light surface, so the shape
 *                 (its alpha) is painted in ink instead. This is the one
 *                 logo that cannot be shown as supplied.
 *
 * Reads  .assets-src/brands/*
 * Writes public/images/znamke/*.webp
 * Prints the BRANDS array for src/lib/content.ts.
 */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const MODES = {
  "aeg.svg": "asIs",
  "beko.svg": "asIs",
  "bosch.svg": "asIs",
  "daikin.svg": "asIs",
  "electrolux.svg": "asIs",
  "liebherr.svg": "asIs",
  "mitsubishi.svg": "asIs",
  "samsung.svg": "asIs",
  "siemens.svg": "asIs",
  "toshiba.svg": "asIs",
  "zanussi.png": "asIs",
  "elmont.webp": "asIs",
  "alpfrigo.jpg": "whiteToAlpha",
  "mw-power.jpg": "whiteToAlpha",
  "icematic.png": "inkFromAlpha",
};

const NAMES = {
  aeg: "AEG",
  beko: "Beko",
  bosch: "Bosch",
  daikin: "Daikin",
  electrolux: "Electrolux",
  liebherr: "Liebherr",
  mitsubishi: "Mitsubishi Electric",
  samsung: "Samsung",
  siemens: "Siemens",
  toshiba: "Toshiba",
  alpfrigo: "Alpfrigo",
  "mw-power": "MW Power",
  zanussi: "Zanussi",
  icematic: "Icematic",
  elmont: "Elmont",
};

const INK = [0x12, 0x15, 0x1a];
const OUT_DIR = path.join("public", "images", "znamke");
const clamp = (v) => (v < 0 ? 0 : v > 255 ? 255 : v | 0);

/** Rendered height in px. Optical height is normalised, not width, so
 *  wide wordmarks stay wide and square badges stay compact. */
function renderedHeight(aspectRatio) {
  if (aspectRatio >= 6) return 36;
  if (aspectRatio >= 3) return 42;
  if (aspectRatio >= 1.5) return 46;
  return 50;
}

async function build() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const rows = [];

  for (const [file, mode] of Object.entries(MODES)) {
    const src = path.join(".assets-src", "brands", file);

    const { data, info } = await sharp(src, { density: 900 })
      .resize({ width: 900, height: 420, fit: "inside" })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const pixels = info.width * info.height;
    const out = Buffer.alloc(pixels * 4);

    for (let p = 0; p < pixels; p++) {
      const i = p * 4;
      const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];

      if (mode === "asIs") {
        out[i] = r; out[i + 1] = g; out[i + 2] = b; out[i + 3] = a;
      } else if (mode === "whiteToAlpha") {
        // Distance from white drives opacity; colour is then
        // un-premultiplied so saturated marks stay saturated.
        const alpha = Math.max(255 - r, 255 - g, 255 - b);
        out[i + 3] = clamp(alpha);
        if (alpha === 0) {
          out[i] = 255; out[i + 1] = 255; out[i + 2] = 255;
        } else {
          const k = 255 / alpha;
          out[i] = clamp(255 - (255 - r) * k);
          out[i + 1] = clamp(255 - (255 - g) * k);
          out[i + 2] = clamp(255 - (255 - b) * k);
        }
      } else {
        // White-on-transparent: keep the shape, repaint it in ink.
        out[i] = INK[0]; out[i + 1] = INK[1]; out[i + 2] = INK[2];
        out[i + 3] = a;
      }
    }

    const key = file.replace(/\.[a-z]+$/i, "");
    const dst = path.join(OUT_DIR, `${key}.webp`);

    const trimmed = await sharp(out, {
      raw: { width: info.width, height: info.height, channels: 4 },
    })
      .trim({ threshold: 6 })
      .png()
      .toBuffer();

    // A second resize in one sharp pipeline replaces the first, so the
    // downscale to ~3x display size has to be its own pass.
    await sharp(trimmed)
      .resize({ width: 420, height: 160, fit: "inside" })
      .webp({ quality: 94, alphaQuality: 100, effort: 6 })
      .toFile(dst);

    const meta = await sharp(dst).metadata();
    rows.push({ key, name: NAMES[key], w: meta.width, h: meta.height, mode });
    console.log(
      `${key.padEnd(12)} ${String(meta.width).padStart(3)}x${String(meta.height).padEnd(3)} ` +
        `ar=${(meta.width / meta.height).toFixed(2).padStart(5)}  ${mode.padEnd(13)} ` +
        `${(fs.statSync(dst).size / 1024).toFixed(1)}KB`,
    );
  }

  console.log("\n--- BRANDS for src/lib/content.ts ---");
  rows.sort((a, b) => a.name.localeCompare(b.name, "sl"));
  for (const r of rows) {
    console.log(
      `  { name: ${JSON.stringify(r.name)}, file: "/images/znamke/${r.key}.webp", w: ${r.w}, h: ${r.h}, size: ${renderedHeight(r.w / r.h)} },`,
    );
  }

  // Contact sheet on the real surface colour so the result can be checked.
  const COLS = 5, CELL_W = 320, CELL_H = 120;
  const nRows = Math.ceil(rows.length / COLS);
  const tiles = [];
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    const buf = await sharp(path.join(OUT_DIR, r.key + ".webp"))
      .resize({ width: 210, height: renderedHeight(r.w / r.h) * 2, fit: "inside" })
      .toBuffer();
    const m = await sharp(buf).metadata();
    tiles.push({
      input: buf,
      left: (i % COLS) * CELL_W + Math.round((CELL_W - m.width) / 2),
      top: Math.floor(i / COLS) * CELL_H + Math.round((CELL_H - m.height) / 2),
    });
  }
  await sharp({
    create: { width: COLS * CELL_W, height: nRows * CELL_H, channels: 3, background: "#f7f8f8" },
  })
    .composite(tiles)
    .png()
    .toFile("logo-sheet.png");
  console.log("\ncontact sheet -> logo-sheet.png");
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
