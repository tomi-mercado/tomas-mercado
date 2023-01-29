import { LocaleProvider } from 'contexts/locale';
import useWindowSize from 'hooks/useWindowSize';

import { ReactNode } from 'react';

import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

import {
  About,
  AboutProps,
  Contact,
  ContactProps,
  Experience,
  ExperienceProps,
  Hero,
  IntroductionProps,
  OpacityChangeSections,
  Projects,
  ProjectsProps,
  links,
} from '@components';

import content from '../content.json';

type ObjectInfo = Record<string, any>;

interface LanguageContent {
  [section: string]: ObjectInfo;
}

interface Content {
  es: LanguageContent;
  en: LanguageContent;
  common: LanguageContent;
}

interface HomeProps {
  content: LanguageContent;
  locale: 'en' | 'es';
}

interface HomeContainerProps {
  children: ReactNode;
  linkIds: string[];
}

const HomeContainer: React.FC<HomeContainerProps> = ({ children, linkIds }) => {
  const { width } = useWindowSize();

  const isMobile = width < 1024;

  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <OpacityChangeSections navbarIds={linkIds}>
      {children}
    </OpacityChangeSections>
  );
};

const Home: NextPage<HomeProps> = ({ content, locale }) => {
  const linkIds = links(locale).map((link) => link.sectionName);

  const title = 'Tomás Mercado - Developer';
  const description = {
    en: 'Portfolio website of Tomás Mercado, Full Stack Developer with more than 2+ years of experience',
    es: 'Sitio web de portafolio de Tomás Mercado, Desarrollador Full Stack con más de 2+ años de experiencia',
  }[locale];

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
        <HomeContainer linkIds={linkIds}>
          <Hero {...(content.hero as IntroductionProps)} />
          <Projects {...(content.projects as ProjectsProps)} />
          <Experience {...(content.experience as ExperienceProps)} />
          <About {...(content.about as AboutProps)} />
          <Contact {...(content.contact as ContactProps)} />
        </HomeContainer>
      </LocaleProvider>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async ({ locale }) => {
  const parsedContent: Content = JSON.parse(JSON.stringify(content));

  //select the language specific content
  const languageContent = parsedContent[locale as 'en' | 'es'];

  //iterate over the common sections of the content
  for (const section in parsedContent.common) {
    //if the section doesn't exist in the language content, add it from common
    if (!languageContent[section]) {
      languageContent[section] = parsedContent.common[section];
      continue;
    }

    //iterate over the keys in the common section
    for (const key in parsedContent.common[section]) {
      //if the key doesn't exist in the language section, add it from common
      if (!languageContent[section][key]) {
        languageContent[section][key] = parsedContent.common[section][key];
        continue;
      }

      //if the key is a string, update it with the common version
      if (typeof languageContent[section][key] === 'string') {
        languageContent[section][key] = parsedContent.common[section][key];
        continue;
      }

      //if the key is an array, iterate over the items and update them with the common version if they don't exist for the language
      if (Array.isArray(languageContent[section][key])) {
        const languageContentArray = languageContent[section][
          key
        ] as ObjectInfo[];
        const commonContentArray = parsedContent.common[section][
          key
        ] as ObjectInfo[];

        languageContentArray.forEach((languageContentItem, index) => {
          for (const key in commonContentArray[index]) {
            if (!languageContentItem[key]) {
              languageContentItem[key] = commonContentArray[index][key];
              continue;
            }
          }
        });
        continue;
      }

      //if the key is an object, iterate over the keys and update them with the common version
      if (typeof languageContent[section][key] === 'object') {
        const languageContentObject = languageContent[section][
          key
        ] as ObjectInfo;
        const commonContentObject = parsedContent.common[section][
          key
        ] as ObjectInfo;

        for (const key in commonContentObject) {
          if (!languageContentObject[key]) {
            languageContentObject[key] = commonContentObject[key];
            continue;
          }
        }
        continue;
      }
    }
  }

  return {
    props: {
      content: languageContent,
      locale: locale as 'en' | 'es',
    },
  };
};

export default Home;
