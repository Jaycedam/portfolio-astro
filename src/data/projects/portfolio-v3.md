---
title: "Portfolio V3"
category: "Website"
description: "Here we go again, but this time with Astro and View Transitions."
date: "2024-03"
featured: true
tags: ["astro", "tailwindcss"]
image: "@assets/projects/portfolio-v3/preview.webp"
---

## MDX Content

Using Astro's Content Collections I can have a content folder with typesafe frontmatter for my local MDX files using Typescript. The DX is better since Astro handles the MDX compilation with built-in features such as code syntax highlighting and slugs.

Since my portfolio website is mostly based on content, the Island architecture is better for a site like this, where I can scale interactivity on specific modules.

## View Transitions

This allows me to create an MPA with the feeling of a SPA by having elements persist through route changes. Currently only supported on Chromium browsers but the rest of the browsers already confirmed support for this feature.

## It's just faster

Since I only ship the necessary JS, the whole site is much faster than previous versions.

## Links

- [GitHub](https://github.com/Jaycedam/portfolio-astro)
