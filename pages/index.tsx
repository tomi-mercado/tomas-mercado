import Contact from 'components/Contact';
import Introduction from 'components/Introduction';
import PageLayout from 'components/PageLayout';
import ProjectsSection from 'components/ProjectsSection';
import SectionContainer from 'components/SectionContainer';
import TomBot from 'components/TomBot';
import { readFile } from 'fs/promises';
import { LanguageContent, schema } from 'utils/contentValidator';
import replaceYearsExperience from 'utils/replaceYearsExperience';

import { GetStaticProps, NextPage } from 'next';

type ObjectInfo = Record<string, any>;

interface Content {
  es: ObjectInfo;
  en: ObjectInfo;
  common: ObjectInfo;
}

interface HomeProps {
  content: LanguageContent;
  locale: 'en' | 'es';
}

const Home: NextPage<HomeProps> = ({ content, locale }) => {
  const title = 'Tomás Mercado - Developer';
  const description = replaceYearsExperience(
    {
      en: 'Website of Tomás Mercado, Full Stack Developer with more than [yearsExperience] years of experience',
      es: 'Sitio web de Tomás Mercado, Desarrollador Full Stack con más de [yearsExperience] años de experiencia',
    }[locale],
  );

  return (
    <PageLayout
      title={title}
      description={description}
      content={content}
      locale={locale}
    >
      <SectionContainer className="min-h-[90vh]">
        <Introduction />
        <TomBot />
      </SectionContainer>

      <ProjectsSection />

      <Contact />
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async ({ locale }) => {
  const content = await readFile('content.json', 'utf-8');
  const parsedContent: Content = JSON.parse(content);

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

  const typedLanguageContent = schema.parse(languageContent);

  return {
    props: {
      content: typedLanguageContent,
      locale: locale as 'en' | 'es',
    },
  };
};

export default Home;
