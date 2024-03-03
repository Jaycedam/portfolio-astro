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
      tags: z.string().array(),
      image: image(),
    }),
});
export const blogCollection = defineCollection({
  type: "content",
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
export const carreerCollection = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    company: z.string(),
    tags: z.string().array(),
    // Transform string to Date object
    date: z.coerce.date(),
    dateEnd: z.coerce.date().optional(),
  }),
});

export const collections = {
  projects: projectsCollection,
  blog: blogCollection,
  carreer: carreerCollection,
};
