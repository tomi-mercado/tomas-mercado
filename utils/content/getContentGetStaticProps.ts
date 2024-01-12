import { Locale } from 'utils/locales';
import { z } from 'zod';

type BasePageProps<Content extends z.ZodRawShape> = {
  pageName: string;
  locale: Locale;
  content: z.infer<z.ZodObject<Content>>;
};

export type GetPageProps<Content extends z.ZodObject<z.ZodRawShape>> =
  BasePageProps<Content['shape']>;
