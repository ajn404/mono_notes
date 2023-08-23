import { defineCollection, z } from "astro:content";

const philosophy = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});

const reactLearning = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = { philosophy, reactLearning };
