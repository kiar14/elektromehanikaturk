/**
 * Converts the supplied source imagery into the optimised WebP assets
 * the site ships.
 *
 *   node scripts/build-images.cjs
 *
 * Sources live in .assets-src/ (product shots, logo and payment strip
 * pulled from the live EMT shop) and in the photography folder passed as
 * PHOTO_DIR. Manufacturer logos have their own pass — see
 * scripts/normalize-brand-logos.cjs.
 */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

/** Directory holding the supplied hero and service photographs. */
const PHOTO_DIR = process.env.PHOTO_DIR || ".assets-src/photos";

const JOBS = [
  // Hero. Kept at native resolution: it is the LCP element and the
  // source is only 1672px wide, so there is nothing to gain by going
  // smaller and nothing to upscale from.
  { src: `${PHOTO_DIR}/hero-ac-bedroom.png`, dst: "public/images/hero-ac-bedroom.webp", w: 1672, q: 88 },

  { src: `${PHOTO_DIR}/servis-klimatskih-naprav.png`, dst: "public/images/storitve/servis-klimatskih-naprav.webp", w: 1200, q: 82 },
  { src: `${PHOTO_DIR}/montaza-klimatskih-naprav.png`, dst: "public/images/storitve/montaza-klimatskih-naprav.webp", w: 1200, q: 82 },
  { src: `${PHOTO_DIR}/servis-bele-tehnike.png`, dst: "public/images/storitve/servis-bele-tehnike.webp", w: 1200, q: 82 },
  { src: `${PHOTO_DIR}/gostinska-in-hladilna-oprema.png`, dst: "public/images/storitve/gostinska-in-hladilna-oprema.webp", w: 1200, q: 82 },

  { src: ".assets-src/products/mitsubishi-msz-hr35vfk2.png", dst: "public/images/izdelki/mitsubishi-msz-hr35vfk2.webp", w: 1100, q: 86 },
  { src: ".assets-src/products/mitsubishi-msz-hr71vfk2.png", dst: "public/images/izdelki/mitsubishi-msz-hr71vfk2.webp", w: 1100, q: 86 },
  { src: ".assets-src/products/mw-power-alfa-12k.png", dst: "public/images/izdelki/mw-power-alfa-12k.webp", w: 1100, q: 86 },
  { src: ".assets-src/products/mw-power-alfa-24k.webp", dst: "public/images/izdelki/mw-power-alfa-24k.webp", w: 560, q: 88 },

  // Trimmed: the supplied file wraps the wordmark in ~80px of vertical
  // padding, so the mark filled only half the image height and every
  // rendered height was effectively halved. Trimming lets CSS height mean
  // the height of the mark itself.
  { src: ".assets-src/emt-logo-white.png", dst: "public/images/emt-logo-white.webp", w: 800, q: 92, trim: true },
  { src: ".assets-src/nacini-placila.webp", dst: "public/images/nacini-placila.webp", w: 520, q: 85 },

  // Nasveti article photography. Royalty-free sources, downloaded once and
  // stored in .assets-src rather than hotlinked — see the source note in
  // src/content/nasveti.ts. Everything is normalised to 3:2 at 1400px:
  // the card renders at roughly a third of the shell and the article hero
  // at ~900px, so a single asset covers both without upscaling.
  ...[
    "idealna-temperatura-klime-poleti",
    "kam-namestiti-notranjo-enoto-klime",
    "split-ali-multi-split-klima",
    "ogrevanje-s-klimo-pozimi",
    "zakaj-pomivalni-stroj-ne-pomiva-dobro",
    // Portrait source (2400x3600). A plain centre crop clips the tumble
    // dryer at the frame edge, so the 3:2 window is placed by hand around
    // the appliance column with the shelving left in for context.
    {
      slug: "napake-pri-uporabi-susilnega-stroja",
      extract: { left: 150, top: 900, width: 2250, height: 1500 },
    },
  ].map((entry) => {
    const slug = typeof entry === "string" ? entry : entry.slug;
    return {
      src: `${PHOTO_DIR}/nasveti/${slug}.jpg`,
      dst: `public/images/nasveti/${slug}.webp`,
      w: 1400,
      h: 933,
      q: 82,
      extract: typeof entry === "string" ? undefined : entry.extract,
    };
  }),
];

async function build() {
  for (const job of JOBS) {
    if (!fs.existsSync(job.src)) {
      console.warn(`skip (missing) ${job.src}`);
      continue;
    }
    fs.mkdirSync(path.dirname(job.dst), { recursive: true });
    let pipe = sharp(job.src);
    if (job.trim) pipe = pipe.trim({ threshold: 2 });
    if (job.extract) pipe = pipe.extract(job.extract);
    await pipe
      .resize(
        job.h
          ? { width: job.w, height: job.h, fit: "cover" }
          : { width: job.w, withoutEnlargement: true },
      )
      .webp({ quality: job.q, alphaQuality: 100, effort: 6 })
      .toFile(job.dst);
    console.log(`${job.dst}  ${(fs.statSync(job.dst).size / 1024).toFixed(0)}KB`);
  }

  // Social card. Cropped right-of-centre so the air-conditioner survives
  // the 1.91:1 aspect ratio.
  const heroSrc = `${PHOTO_DIR}/hero-ac-bedroom.png`;
  if (fs.existsSync(heroSrc)) {
    await sharp(heroSrc)
      .resize(1200, 630, { fit: "cover", position: "right top" })
      .jpeg({ quality: 82, progressive: true, mozjpeg: true })
      .toFile("public/images/og-emt.jpg");
    console.log("public/images/og-emt.jpg");
  }
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
