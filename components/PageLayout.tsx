import { ContentProvider } from 'contexts/content';
import { LocaleProvider } from 'contexts/locale';
import { GetPageProps } from 'utils/content/getContentGetStaticProps';
import { z } from 'zod';

import React from 'react';

import Head from 'next/head';
import Script from 'next/script';

import Footer from './Footer';
import Navbar from './Navbar';

type PageLayoutProps<Schema extends z.ZodObject<z.ZodRawShape>> = {
  title: string;
  description: string;
  content: GetPageProps<Schema>['content'];
  locale: 'en' | 'es';
  children: React.ReactNode;
};

function PageLayout<Schema extends z.ZodObject<z.ZodRawShape>>({
  title,
  description,
  content,
  locale,
  children,
}: PageLayoutProps<Schema>) {
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
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-R9WGHHDZL7"
      />

      <Script id="google-analytics">
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){
          dataLayer.push(arguments);  
        }
        gtag('js', new Date());

        gtag('config', 'G-R9WGHHDZL7');`}
      </Script>

      <LocaleProvider locale={locale}>
        <ContentProvider content={content}>
          <Navbar />
          <div className="flex flex-col grow pt-[64px]">{children}</div>
          <Footer />
        </ContentProvider>
      </LocaleProvider>
    </>
  );
}

export default PageLayout;
