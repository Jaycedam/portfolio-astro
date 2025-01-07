import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";
import { transformerNotationDiff } from "@shikijs/transformers";

// https://astro.build/config
export default defineConfig({
    site: "https://www.jordancortes.dev",
    adapter: vercel(),
    markdown: {
        shikiConfig: {
            theme: "dracula",
            // Enable word wrap to prevent horizontal scrolling
            wrap: true,
            transformers: [transformerNotationDiff()],
        },
    },
    integrations: [
        tailwind({
            applyBaseStyles: false,
        }),
        sitemap(),
    ],
    experimental: {
        // https://docs.astro.build/en/reference/experimental-flags/svg/
        svg: true,
    },
});
