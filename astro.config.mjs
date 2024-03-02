import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter: vercel({
    imageService: true,
    imagesConfig: {
      formats: "webp",
    },
    isr: {
      // caches all pages on first request and saves for 1 week
      expiration: 60 * 60 * 24 * 6,
    },
  }),
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    mdx(),
  ],
});
