import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel/serverless";
import expressiveCode from "astro-expressive-code";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://www.jordancortes.dev",
  output: "hybrid",
  adapter: vercel(),
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    expressiveCode({
      themes: ["dracula"],
      styleOverrides: {
        codeBackground: "#18181b",
        borderColor: "#27272a",
        frames: {
          editorTabBarBackground: "#18181b",
          editorActiveTabBackground: "#27272a",
          terminalBackground: "#18181b",
          terminalTitlebarBackground: "#18181b",
          editorActiveTabIndicatorTopColor: "#3f3f46",
          terminalTitlebarBorderBottomColor: "#18181b",
        },
      },
    }),
    mdx(),
    sitemap(),
  ],
});
