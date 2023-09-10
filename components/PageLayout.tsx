import { ContentProvider } from 'contexts/content';
import { LocaleProvider } from 'contexts/locale';
import { LanguageContent } from 'pages';

import React from 'react';

import Head from 'next/head';

import Footer from './Footer';
import Navbar from './Navbar';

interface PageLayoutProps {
  title: string;
  description: string;
  content: LanguageContent;
  locale: 'en' | 'es';
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  description,
  content,
  locale,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/logo.png" />
      </Head>

      <LocaleProvider locale={locale}>
        <ContentProvider content={content}>
          <Navbar />
          {children}
          <Footer />
        </ContentProvider>
      </LocaleProvider>
    </>
  );
};

export default PageLayout;
