import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 only honours `quality` values declared here; anything else
    // silently falls back to 75. The hero is a dark, softly graded
    // photograph, which is exactly the content where a second lossy pass
    // at 75 starts to band.
    qualities: [75, 82],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
