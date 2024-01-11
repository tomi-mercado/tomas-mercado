import { z } from 'zod';

type BasePageProps<Content extends z.ZodRawShape> = {
  pageName: string;
  locale: 'en' | 'es';
  content: z.infer<z.ZodObject<Content>>;
};

export type GetPageProps<Content extends z.ZodObject<z.ZodRawShape>> =
  BasePageProps<Content['shape']>;
