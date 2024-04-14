import { commonContentSchema } from 'utils/content/commonContentValidation';
import { GetPageProps } from 'utils/content/getContentGetStaticProps';
import { homeSchema } from 'utils/content/homeContentValidation';
import { projectsSchema } from 'utils/content/projectsContentValidation';
import { z } from 'zod';

import React, { createContext, useContext } from 'react';

type ContentContextProps<
  Schema extends z.ZodObject<z.ZodRawShape> = z.ZodObject<z.ZodRawShape>,
> = {
  content: GetPageProps<Schema>['content'];
};

type ContentProviderProps<Schema extends z.ZodObject<z.ZodRawShape>> = {
  content: GetPageProps<Schema>['content'];
  children: React.ReactNode;
};

const ContentContext = createContext<ContentContextProps | null>(null);

export function ContentProvider<Schema extends z.ZodObject<z.ZodRawShape>>({
  children,
  content,
}: ContentProviderProps<Schema>) {
  return (
    <ContentContext.Provider value={{ content }}>
      {children}
    </ContentContext.Provider>
  );
}

type GetSchemaUnion<
  T extends z.ZodObject<z.ZodRawShape>,
  Z extends z.ZodObject<z.ZodRawShape>,
> = z.ZodObject<z.mergeTypes<Z, T>['shape']> &
  z.ZodObject<z.mergeTypes<T, Z>['shape']>;

export function useContent(name: 'Projects'): ContentContextProps<
  // @ts-expect-error This is too much for me to handle
  GetSchemaUnion<typeof projectsSchema, typeof commonContentSchema>
>;
export function useContent(name: 'Home'): ContentContextProps<
  // @ts-expect-error This is too much for me to handle
  GetSchemaUnion<typeof homeSchema, typeof commonContentSchema>
>;
export function useContent(_: 'Home' | 'Projects') {
  const content = useContext(ContentContext);

  if (!content) {
    throw new Error('useContent must be used within a ContentProvider');
  }

  return content;
}
