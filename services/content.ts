import { readFile } from 'fs/promises';
import path from 'path';
import { commonContentSchema } from 'utils/content/commonContentValidation';
import { z } from 'zod';

type ObjectInfo = Record<string, any>;

interface Content {
  es: ObjectInfo;
  en: ObjectInfo;
  common: ObjectInfo;
}

export const readCommonContent = async (locale: 'en' | 'es') => {
  const contentAllLocalesRaw = await readFile(
    addCwd('content/common.json'),
    'utf-8',
  );
  const contentAllLocales = JSON.parse(contentAllLocalesRaw);

  const languageContent = contentAllLocales[locale];

  for (const key in contentAllLocales.common) {
    if (!languageContent[key]) {
      languageContent[key] = contentAllLocales.common[key];
      continue;
    }

    if (typeof languageContent[key] === 'string') {
      languageContent[key] = contentAllLocales.common[key];
      continue;
    }

    if (Array.isArray(languageContent[key])) {
      const languageContentArray = languageContent[key] as ObjectInfo[];
      const commonContentArray = contentAllLocales.common[key] as ObjectInfo[];

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

    if (typeof languageContent[key] === 'object') {
      const languageContentObject = languageContent[key] as ObjectInfo;
      const commonContentObject = contentAllLocales.common[key] as ObjectInfo;

      for (const key in commonContentObject) {
        if (!languageContentObject[key]) {
          languageContentObject[key] = commonContentObject[key];
          continue;
        }
      }
      continue;
    }
  }

  return commonContentSchema.parse(languageContent);
};

const addCwd = (p: string) => path.join(process.cwd(), 'public', p);

async function readContent<Schema extends z.ZodRawShape>(
  path: string,
  locale: 'en' | 'es',
  schema: z.ZodObject<Schema>,
) {
  const content = await readFile(addCwd(path), 'utf-8');
  const commonContent = await readFile(addCwd('content/common.json'), 'utf-8');

  const parsedCommonContent: Content = JSON.parse(commonContent);
  const parsedContent: Content = JSON.parse(content);

  const mergedContent: Content = {
    es: { ...parsedContent.es, ...parsedCommonContent.es },
    en: { ...parsedContent.en, ...parsedCommonContent.en },
    common: { ...parsedContent.common, ...parsedCommonContent.common },
  };

  //select the language specific content
  const languageContent = mergedContent[locale as 'en' | 'es'];
  //iterate over the common sections of the content
  for (const section in mergedContent.common) {
    //if the section doesn't exist in the language content, add it from common
    if (!languageContent[section]) {
      languageContent[section] = mergedContent.common[section];
      continue;
    }

    //iterate over the keys in the common section
    for (const key in mergedContent.common[section]) {
      //if the key doesn't exist in the language section, add it from common
      if (!languageContent[section][key]) {
        languageContent[section][key] = mergedContent.common[section][key];
        continue;
      }

      //if the key is a string, update it with the common version
      if (typeof languageContent[section][key] === 'string') {
        languageContent[section][key] = mergedContent.common[section][key];
        continue;
      }

      //if the key is an array, iterate over the items and update them with the common version if they don't exist for the language
      if (Array.isArray(languageContent[section][key])) {
        const languageContentArray = languageContent[section][
          key
        ] as ObjectInfo[];
        const commonContentArray = mergedContent.common[section][
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
        const commonContentObject = mergedContent.common[section][
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

  const deepMergedSchema = commonContentSchema.merge(schema);
  const typedLanguageContent = deepMergedSchema.parse(languageContent);

  return typedLanguageContent;
}

export default readContent;
