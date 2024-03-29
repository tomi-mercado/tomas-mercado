import { z } from 'zod';

export const homeSchema = z.object({
  introduction: z.object({
    title: z.object({
      greetingMorning: z.string(),
      greetingAfternoon: z.string(),
      greetingEvening: z.string(),
      greetingNight: z.string(),
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
  projects: z.object({
    title: z.string(),
    description: z.string(),
    CTA: z.string(),
  }),
  blog: z.object({
    title: z.string(),
    description: z.string(),
    CTA: z.string(),
  }),
});

export type HomeContent = z.infer<typeof homeSchema>;
