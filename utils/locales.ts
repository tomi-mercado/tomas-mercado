import { z } from 'zod';

export const locales = ['en', 'es'] as const;

export const localesSchema = z.enum(locales);

export type Locale = z.infer<typeof localesSchema>;
