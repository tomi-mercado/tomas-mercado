import readContent from 'services/content';
import { z } from 'zod';

import { GetStaticProps } from 'next';

import { commonContentSchema } from './commonContentValidation';

type BasePageProps<Content extends z.ZodRawShape> = {
  pageName: string;
  locale: 'en' | 'es';
  content: z.infer<z.ZodObject<Content>>;
};

export type GetPageProps<Content extends z.ZodObject<z.ZodRawShape>> =
  BasePageProps<Content['shape']>;

function getContentGetStaticProps<Schema extends z.ZodRawShape>(
  name: string,
  contentPath: string,
  contentSchema: z.ZodObject<Schema>,
) {
  return (async ({ locale: localeParam }) => {
    let locale: 'en' | 'es';
    try {
      locale = z.union([z.literal('en'), z.literal('es')]).parse(localeParam);
    } catch (error) {
      console.error(error);
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    const content = await readContent(contentPath, locale, contentSchema);

    return {
      props: {
        pageName: name,
        content,
        locale,
      } as BasePageProps<Schema & typeof commonContentSchema>,
    };
  }) as GetStaticProps<BasePageProps<Schema & typeof commonContentSchema>>;
}

export default getContentGetStaticProps;
