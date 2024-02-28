import { defineCollection, z } from "astro:content";

export const projectsCollection = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      area: z.string(),
      description: z.string(),
      // Transform string to Date object
      date: z.coerce.date(),
      featured: z.coerce.boolean(),
      updatedDate: z.coerce.date().optional(),
      tags: z.string().array(),
      image: image(),
    }),
});

export const collections = {
  projects: projectsCollection,
};
