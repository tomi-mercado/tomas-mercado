import { IntroductionProps } from 'components/Hero/components';

import { PropsWithChildren } from 'react';

import { GetStaticProps, NextPage } from 'next';

import {
  About,
  Contact,
  Experience,
  Hero,
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
}

const linkIds = links.map((link) => link.sectionName);

const HomeContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className="hidden lg:block">
        <OpacityChangeSections navbarIds={linkIds}>
          {children}
        </OpacityChangeSections>
      </div>
      <div className="block lg:hidden">{children}</div>
    </>
  );
};

const Home: NextPage<HomeProps> = ({ content }) => {
  return (
    <HomeContainer>
      <Hero {...(content.hero as IntroductionProps)} />
      <Projects {...(content.projects as ProjectsProps)} />
      <Experience />
      <About />
      <Contact />
    </HomeContainer>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async ({ locale }) => {
  const parsedContent: Content = JSON.parse(JSON.stringify(content));

  const languageContent = parsedContent[locale as 'en' | 'es'];

  for (const section in parsedContent.common) {
    if (!languageContent[section]) {
      languageContent[section] = parsedContent.common[section];
      continue;
    }

    for (const key in parsedContent.common[section]) {
      if (!languageContent[section][key]) {
        languageContent[section][key] = parsedContent.common[section][key];
        continue;
      }

      if (typeof languageContent[section][key] === 'string') {
        languageContent[section][key] = parsedContent.common[section][key];
        continue;
      }

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
    },
  };
};

export default Home;
