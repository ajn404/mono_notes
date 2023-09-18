import { z } from "astro:content";

export const blogSchema = z
  .object({
    author: z.string().optional(),
      pubDatetime: z.date(),
    upDateTime: z.date().optional(),
    title: z.string(),
    postSlug: z.string().optional(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).default(["others"]),
    ogImage: z.string().optional(),
    description: z.string(),
      canonicalURL: z.string().optional(),
      minutesRead: z.string().optional(),
      wordsRead: z.number().optional(),
    isDev:z.boolean().optional(),
  })
  .strict();

export type BlogFrontmatter = z.infer<typeof blogSchema>;
