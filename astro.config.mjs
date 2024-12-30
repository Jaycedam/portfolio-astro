import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";
import { transformerNotationDiff } from "@shikijs/transformers";

// https://astro.build/config
export default defineConfig({
  site: "https://www.jordancortes.dev",
  adapter: vercel(),
  markdown: {
    shikiConfig: {
      theme: "tokyo-night",
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
      transformers: [transformerNotationDiff()],
    },
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    sitemap(),
  ],
});
