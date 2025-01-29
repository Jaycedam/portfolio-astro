import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";
import { transformerNotationDiff } from "@shikijs/transformers";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
    site: "https://www.jordancortes.dev",
    adapter: vercel(),
    markdown: {
        shikiConfig: {
            theme: "catppuccin-mocha",
            // Enable word wrap to prevent horizontal scrolling
            wrap: true,
            transformers: [transformerNotationDiff()],
        },
    },
    integrations: [sitemap()],
    experimental: {
        // https://docs.astro.build/en/reference/experimental-flags/svg/
        svg: true,
    },
    vite: {
        plugins: [tailwindcss()],
    },
});
