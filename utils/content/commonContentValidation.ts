import { z } from 'zod';

export const commonContentSchema = z.object({
  contact: z.object({
    email: z.string(),
    linkedin: z.string(),
    github: z.string(),
  }),
  userMenu: z.object({
    welcome: z.string(),
  }),
  footer: z.object({
    madeWith: z.string(),
    byMe: z.string(),
    seeSourceCode: z.string(),
  }),
});
