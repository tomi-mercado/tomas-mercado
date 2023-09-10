import { z } from 'zod';

export const schema = z.object({
  userMenu: z.object({
    welcome: z.string(),
  }),
  introduction: z.object({
    title: z.object({
      greeting: z.string(),
      iAm: z.string(),
      name: z.string(),
    }),
    image: z.object({ src: z.string(), alt: z.string() }),
    description: z.string(),
  }),
  tombot: z.object({
    maxQuestions: z.number(),
    description: z.string(),
    placeholder: z.string(),
    aclaration: z.string(),
    loadingYourData: z.string(),
    loadingMessages: z.array(z.string()),
    askAgain: z.string(),
    notAvailable: z.string(),
    noQuestionsLeft: z.string(),
    noQuestionLeftDescription: z.string(),
    emailMe: z.string(),
    retry: z.string(),
    almostReady: z.string(),
    needLogin: z.string(),
    loginWithGoogle: z.string(),
  }),
  contact: z.object({
    title: z.string(),
    description: z.string(),
    reachMe: z.string(),
    email: z.string(),
    linkedin: z.string(),
    github: z.string(),
  }),
  common: z.object({ close: z.string() }),
  footer: z.object({
    madeWith: z.string(),
    byMe: z.string(),
    seeSourceCode: z.string(),
  }),
  projects: z.object({
    title: z.string(),
    description: z.string(),
    CTA: z.string(),
  }),
});

export type LanguageContent = z.infer<typeof schema>;
