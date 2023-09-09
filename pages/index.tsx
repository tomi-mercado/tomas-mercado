import { LocaleProvider } from 'contexts/locale';

import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

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

const necessaryKey = '[yearsExperience]';
const startDate = new Date('2020-08-03:');
const today = new Date();
const replaceYearsExperience = (text: string) => {
  if (!text.includes(necessaryKey)) {
    throw new Error(
      `The text passed to replaceYearsExperience must include the string "${necessaryKey}"`,
    );
  }

  const years = today.getFullYear() - startDate.getFullYear();

  return text.replace(necessaryKey, `${years}+`);
};

const Home: NextPage<HomeProps> = ({ content, locale }) => {
  const title = 'Tomás Mercado - Developer';
  const description = replaceYearsExperience(
    {
      en: 'Website of Tomás Mercado, Full Stack Developer with more than [yearsExperience] years of experience',
      es: 'Sitio web de Tomás Mercado, Desarrollador Full Stack con más de [yearsExperience] años de experiencia',
    }[locale],
  );

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
        <div>Omg bye bye</div>
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
