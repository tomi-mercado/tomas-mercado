import readContent from 'services/content';
import { z } from 'zod';

import { GetStaticProps } from 'next';

import { commonContentSchema } from './commonContentValidation';

type BasePageProps<Content extends z.ZodRawShape> = {
  pageName: string;
  locale: 'en' | 'es';
  content: z.infer<z.ZodObject<Content>>;
};

export type GetPageProps<
  Content extends z.ZodObject<z.ZodRawShape>,
  AddedProps = Record<string, any>,
> = BasePageProps<Content['shape']> & AddedProps;

function getContentGetStaticProps<
  Schema extends z.ZodRawShape,
  AddedProps extends Record<string, any>,
>(
  name: string,
  contentPath: string,
  contentSchema: z.ZodObject<Schema>,
  customFn?: (
    props: BasePageProps<Schema & typeof commonContentSchema>,
  ) => BasePageProps<Schema & typeof commonContentSchema> & AddedProps,
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

    if (customFn) {
      return customFn({ pageName: name, locale, content });
    }

    return {
      props: {
        pageName: name,
        content,
        locale,
      } as BasePageProps<Schema & typeof commonContentSchema>,
    };
  }) as GetStaticProps<
    BasePageProps<Schema & typeof commonContentSchema> & AddedProps
  >;
}

export default getContentGetStaticProps;
