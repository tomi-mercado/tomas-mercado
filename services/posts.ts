import { readFile, readdir, stat } from 'fs/promises';
import path from 'path';
import { z } from 'zod';

export const extractMetadataFromMarkdown = (markdown: string) => {
  const charactersBetweenGroupedHyphens = /^---([\s\S]*?)---/;
  const metadataMatched = markdown.match(charactersBetweenGroupedHyphens);
  const metadata = metadataMatched?.[1];

  if (!metadata) {
    throw new Error('Metadata not found');
  }

  const metadataLines = metadata.split('\n');
  const metadataObject: {
    title?: string;
    description?: string;
    locale?: string | string[];
  } = {};

  for (const line of metadataLines) {
    const [key, ...value] = line.split(':').map((part) => part.trim());

    if (key) {
      metadataObject[key as keyof typeof metadataObject] = value[1]
        ? value.join(':')
        : value.join('');
    }
  }

  metadataObject.locale = Array.isArray(metadataObject.locale)
    ? metadataObject.locale || []
    : metadataObject.locale?.split(';') || [];

  return z
    .object({
      title: z.string(),
      description: z.string(),
      locale: z.array(z.enum(['en', 'es'])).min(1),
    })
    .parse(metadataObject);
};

const postsPath = path.join(process.cwd(), 'public', 'articles');

export const getPosts = async ({ locale }: { locale: 'en' | 'es' }) => {
  const postsPathExists = await stat(postsPath)
    .then(() => true)
    .catch(() => false);

  if (!postsPathExists) {
    return [];
  }

  const posts = await readdir(postsPath);

  const postsWithMetadata = await Promise.all(
    posts.map(async (post) => {
      const postPath = path.join(postsPath, post);
      const file = await readFile(postPath, 'utf8');
      const metadata = extractMetadataFromMarkdown(file);
      const createdAt = await stat(postPath).then((stats) => stats.birthtime);

      return {
        ...metadata,
        createdAt,
        slug: post.replace(/\.md$/, ''),
      };
    }),
  ).then((posts) =>
    posts
      .filter((post) => post.locale.includes(locale))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
  );

  return postsWithMetadata;
};

/**
 * Extract text between /-/-/-start_{{locale}}-/-/-/ and /-/-/-end_{{locale}}-/-/-/
 */
const extractLocaleContent = (markdown: string, locale: 'en' | 'es') => {
  const startLocaleRegex = new RegExp(
    `/-/-/-start_${locale}-/-/-/`,
    'gim',
  ).exec(markdown);

  const endLocaleRegex = new RegExp(`/-/-/-end_${locale}-/-/-/`, 'gim').exec(
    markdown,
  );

  if (!startLocaleRegex || !endLocaleRegex) {
    throw new Error('Locale not found');
  }

  const startLocaleIndex = startLocaleRegex.index;
  const endLocaleIndex = endLocaleRegex.index;

  const content = markdown.slice(
    startLocaleIndex + startLocaleRegex[0].length,
    endLocaleIndex,
  );

  return content;
};

export const getPost = async (slug: string, locale: 'en' | 'es') => {
  const postPath = path.join(postsPath, `${slug}.md`);
  try {
    const file = await readFile(postPath, 'utf8');
    const contentWithoutMetadata = file.replace(/---([\s\S]*?)---/, '').trim();
    const metadata = extractMetadataFromMarkdown(file);

    if (metadata.locale.length === 1) {
      return contentWithoutMetadata;
    }

    const content = extractLocaleContent(contentWithoutMetadata, locale);

    return content;
  } catch (error) {
    console.error(error);
    return null;
  }
};
