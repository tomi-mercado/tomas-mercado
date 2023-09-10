import { z } from 'zod';

export const projectsSchema = z.object({
  title: z.string(),
});

export type ProjectsContent = z.infer<typeof projectsSchema>;
