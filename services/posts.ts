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
  const metadataObject: Record<string, string> = {};

  for (const line of metadataLines) {
    const [key, ...value] = line.split(':').map((part) => part.trim());

    if (key) {
      metadataObject[key] = value[1] ? value.join(':') : value.join('');
    }
  }

  return z
    .object({
      title: z.string(),
      description: z.string(),
    })
    .parse(metadataObject);
};

const postsPath = path.join(process.cwd(), 'public', 'articles');

export const getPosts = async () => {
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
  );

  return postsWithMetadata;
};

export const getPost = async (slug: string) => {
  const postPath = path.join(postsPath, `${slug}.md`);
  try {
    const file = await readFile(postPath, 'utf8');
    const content = file.replace(/---([\s\S]*?)---/, '').trim();
    return content;
  } catch (error) {
    console.error(error);
    return null;
  }
};
