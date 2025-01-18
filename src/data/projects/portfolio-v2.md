---
title: "Portfolio V2"
category: "Website"
description: "Portfolio website created with Next.js App Router"
date: "2023-04"
featured: true
tags: ["nextjs", "tailwindcss", "prisma", "mysql"]
image: "@assets/projects/portfolio-v2/preview.webp"
---

## MDX Content

The MDX files for blog posts and project details are fetched from another GitHub repository using the GitHub API.

## Admin

Protected route with next-auth credentials for managing the DB. The tables are rendered on dedicated routes, with sort and filter functionality.

The forms are validated using react-hook-form and Zod.

All CRUD operations use server actions.

## Modals

The Project details page, blog posts and admin forms all use [Intercepting Routes](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes) with [Parallel Routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes) to show a modal on top of the current page.

## Links

- [GitHub](https://github.com/Jaycedam/portfolio-next)
- [Live version](https://portfolio-next-jaycedams-projects.vercel.app)
