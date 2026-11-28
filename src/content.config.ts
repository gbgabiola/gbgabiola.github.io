import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { blogTags } from './content/posts';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().min(1),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    summary: z.string().min(1),
    tags: z
      .array(
        z.enum(
          Object.keys(blogTags) as [
            keyof typeof blogTags,
            ...(keyof typeof blogTags)[],
          ],
        ),
      )
      .min(1),
  }),
});
export const collections = { blog };
