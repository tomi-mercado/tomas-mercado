import { existsSync } from 'fs';
import { readFile, readdir, stat } from 'fs/promises';
import path from 'path';
import { Locale, localesSchema } from 'utils/locales';
import { z } from 'zod';

const extractMetadataFromMarkdown = (markdown: string) => {
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
    slug?: string;
    date?: string;
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
      locale: z.array(localesSchema).min(1),
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      slug: z.string(),
    })
    .parse(metadataObject);
};

const postsPath = path.join(process.cwd(), 'public', 'articles');

export const getPosts = async ({ locale }: { locale: Locale }) => {
  const postsPathExists = existsSync(postsPath);

  if (!postsPathExists) {
    return [];
  }

  const dirContent = await readdir(postsPath);

  // Each dir into dirContent is a post
  const postPaths = await Promise.all(
    dirContent.filter(async (dir) => {
      const dirPath = path.join(postsPath, dir);
      const isDir = (await stat(dirPath)).isDirectory();

      return isDir;
    }),
  );

  const posts = await Promise.all(
    postPaths.map(async (postPath) => {
      const postLocalePath = path.join(postsPath, postPath, `${locale}.md`);
      const postLocaleExists = existsSync(postLocalePath);

      if (!postLocaleExists) {
        return null;
      }

      const file = await readFile(postLocalePath, 'utf8');
      const metadata = extractMetadataFromMarkdown(file);
      const content = file.replace(/^---([\s\S]*?)---/, '');

      return {
        ...metadata,
        content,
        createdAt: new Date(`${metadata.date}:00:00`),
      };
    }),
  ).then((posts) => posts.filter((post) => post !== null));

  return posts as NonNullable<typeof posts[number]>[];
};

export const getPost = async (slug: string, locale: Locale) => {
  const posts = await getPosts({ locale });
  const post = posts.find((post) => post.slug === slug);

  return { ...post, createdAt: new Date(`${post?.date}:00:00`) };
};
