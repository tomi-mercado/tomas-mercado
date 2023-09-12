import { z } from 'zod';

const sideProjectSchema = z.object({
  title: z.string(),
  url: z.string(),
  githubUrl: z.string(),
  images: z.object({
    icon: z.object({ isImage: z.boolean(), content: z.string() }),
    appImage: z.object({ content: z.string() }),
  }),
  description: z.string(),
});

export type SideProject = z.infer<typeof sideProjectSchema>;

const professionalProjectSchema = z.object({
  title: z.string(),
  url: z.string(),
  images: z.object({
    icon: z.object({ isImage: z.boolean(), content: z.string() }),
    appImage: z.object({ content: z.string() }),
  }),
  associatedWith: z.string(),
  description: z.string(),
});

export type ProfessionalProject = z.infer<typeof professionalProjectSchema>;

export const projectsSchema = z.object({
  main: z.object({
    title: z.string(),
    description: z.string(),
    getProject: z.string(),
    getAnotherProject: z.string(),
    waitingProject: z.string(),
    notOpenSource: z.string(),
  }),
  projects: z.array(z.union([sideProjectSchema, professionalProjectSchema])),
});

export type ProjectsContent = z.infer<typeof projectsSchema>;

export type Project = SideProject | ProfessionalProject;
