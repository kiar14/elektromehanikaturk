/**
 * Builds the 1200x630 social preview card shipped at
 * public/images/og-emt.jpg.
 *
 *   node scripts/build-og-image.cjs
 *
 * Its own pass rather than a job in build-images.cjs: everything there is
 * a straight resize/convert, while this one crops, scrims and composites
 * the wordmark onto the hero photograph.
 *
 * The card is the homepage hero rebuilt at card proportions — same
 * photograph, same left-hand ink scrim, same white wordmark. No headline
 * is burned into the pixels on purpose: every platform this is aimed at
 * (WhatsApp, Messenger, LinkedIn, Facebook, X, Slack) renders og:title
 * and og:description as live text beside the image, so repeating the
 * headline inside it is the thing that makes a card look cluttered.
 */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const SRC_PHOTO = ".assets-src/photos/hero-ac-bedroom.png";
// The trimmed mark the navigation itself renders, so the card and the
// site show an identically proportioned wordmark.
const SRC_LOGO = "public/images/emt-logo-white.webp";
const DST = "public/images/og-emt.jpg";

const W = 1200;
const H = 630;

/** Ink and brand accent, straight from the tokens in globals.css. */
const INK = "9,11,14";
const BRAND = "#c0522a";

const LOGO_H = 62;
const MARGIN_X = 72;
const RULE_W = 64;

async function build() {
  for (const src of [SRC_PHOTO, SRC_LOGO]) {
    if (!fs.existsSync(src)) {
      console.error(`missing source: ${src}`);
      process.exitCode = 1;
      return;
    }
  }

  const photo = sharp(SRC_PHOTO);
  const meta = await photo.metadata();

  // The source is 16:9 and the card is 1.91:1, so height is the axis that
  // has to give. The air-conditioner sits high in the frame and is the
  // subject, so the crop is weighted towards the floor rather than
  // centred: a plain centre crop shaves the top of the unit.
  const cropH = Math.round(meta.width / (W / H));
  const cropTop = Math.round((meta.height - cropH) * 0.3);

  const base = await photo
    .extract({ left: 0, top: cropTop, width: meta.width, height: cropH })
    .resize(W, H, { fit: "fill" })
    .toBuffer();

  // Same left-to-right scrim the hero uses from `lg` up, plus a short
  // lift off the bottom edge so the wordmark never sits on a bright
  // patch of floor.
  const scrim = Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="side" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stop-color="rgb(${INK})" stop-opacity="0.92"/>
          <stop offset="34%"  stop-color="rgb(${INK})" stop-opacity="0.7"/>
          <stop offset="62%"  stop-color="rgb(${INK})" stop-opacity="0.2"/>
          <stop offset="82%"  stop-color="rgb(${INK})" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="foot" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%"  stop-color="rgb(${INK})" stop-opacity="0.55"/>
          <stop offset="45%" stop-color="rgb(${INK})" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#side)"/>
      <rect width="${W}" height="${H}" fill="url(#foot)"/>
    </svg>`);

  const logoMeta = await sharp(SRC_LOGO).metadata();
  const logoW = Math.round((logoMeta.width / logoMeta.height) * LOGO_H);
  const logo = await sharp(SRC_LOGO)
    .resize(logoW, LOGO_H, { fit: "fill" })
    .png()
    .toBuffer();

  const logoTop = H - 72 - LOGO_H;
  const ruleTop = logoTop - 28;

  // The `.eyebrow` accent rule, carried over as plain geometry so the
  // card needs no font at build time.
  const rule = Buffer.from(`
    <svg width="${RULE_W}" height="2" xmlns="http://www.w3.org/2000/svg">
      <rect width="${RULE_W}" height="2" fill="${BRAND}"/>
    </svg>`);

  fs.mkdirSync(path.dirname(DST), { recursive: true });

  await sharp(base)
    .composite([
      { input: scrim, top: 0, left: 0 },
      { input: rule, top: ruleTop, left: MARGIN_X },
      { input: logo, top: logoTop, left: MARGIN_X },
    ])
    .jpeg({ quality: 88, chromaSubsampling: "4:4:4", mozjpeg: true })
    .toFile(DST);

  const out = await sharp(DST).metadata();
  console.log(`${DST} ${out.width}x${out.height} ${(fs.statSync(DST).size / 1024) | 0} KB`);
}

build();
