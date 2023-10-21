'use client';

import { ContentProvider } from 'contexts/content';
import { LocaleProvider } from 'contexts/locale';

import React from 'react';

import { UserProvider } from '@auth0/nextjs-auth0/client';

interface ProvidersProps {
  content: Record<string, any>;
  locale: 'en' | 'es';
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children, content, locale }) => {
  return (
    <UserProvider>
      <LocaleProvider locale={locale}>
        <ContentProvider content={content}>{children}</ContentProvider>
      </LocaleProvider>
    </UserProvider>
  );
};

export default Providers;
