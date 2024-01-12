'use client';

import { ContentProvider } from 'contexts/content';
import { LocaleProvider } from 'contexts/locale';
import { Locale } from 'utils/locales';

import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { UserProvider } from '@auth0/nextjs-auth0/client';

interface ProvidersProps {
  content: Record<string, any>;
  locale: Locale;
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const Providers: React.FC<ProvidersProps> = ({ children, content, locale }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <LocaleProvider locale={locale}>
          <ContentProvider content={content}>{children}</ContentProvider>
        </LocaleProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default Providers;
