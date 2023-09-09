import { LocaleProvider } from 'contexts/locale';

import {
  FaGithub as GithubIcon,
  FaLinkedin as LinkedinIcon,
  FaPaperPlane as SendIcon,
} from 'react-icons/fa';
import { MdEmail as EmailIcon } from 'react-icons/md';

import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

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
        <div className="max-w-6xl p-6 flex flex-col gap-4 items-center text-center">
          <h2 className="text-4xl">
            Morniiiing!
            <br /> ☀️ {`I'm`}{' '}
            <span className="underline -underline-offset-8 decoration-primary">
              Tom
            </span>{' '}
            👋🏻
          </h2>

          <Image
            src="/tomas-mercado.jpg"
            alt="A picture of Tomás Mercado smiling"
            width={150}
            height={150}
            priority
            className="rounded-full w-[150px] h-[150px] object-cover"
          />

          <p className="text-lg">
            My name is Tomas Mercado (Tom, pls) and I am a Web Developer with{' '}
            {replaceYearsExperience('[yearsExperience]')} years of experience
            who every day try to say hello in the most cheerful way possible.
          </p>

          <div className="flex flex-col gap-2">
            <p className="text-lg">
              Resolve your questions about me with the TomBot 🤖
            </p>
            <div className="relative">
              <textarea
                className="textarea textarea-primary w-full pr-10 no-scroll"
                placeholder="Ask anything about Tom..."
              />
              <button className="btn btn-primary btn-square btn-xs absolute bottom-[50%] top-[50%] transform translate-y-[-50%] right-2">
                <SendIcon />
              </button>
            </div>
          </div>

          <p className="text-lg">You can reach me at </p>

          <div className="flex gap-4 items-center justify-between">
            <Link href="https://www.linkedin.com/in/tomas-mercado">
              <LinkedinIcon className="text-4xl" />
            </Link>
            <Link href="https://www.github.com/tomi-mercado">
              <GithubIcon className="text-4xl" />
            </Link>
            <a href="mailto:tmercadoslp@gmail.com">
              <EmailIcon className="text-4xl" />
            </a>
          </div>
        </div>
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
