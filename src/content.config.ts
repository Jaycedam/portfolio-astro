import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

export const projectsCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/data/projects" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      area: z.string(),
      description: z.string(),
      // Transform string to Date object
      date: z.coerce.date(),
      featured: z.coerce.boolean(),
      tags: z.string().array(),
      image: image(),
    }),
});

export const blogCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/data/blog" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // Transform string to Date object
      date: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.string().array(),
      image: image().optional(),
    }),
});
export const collections = {
  projects: projectsCollection,
  blog: blogCollection,
};
