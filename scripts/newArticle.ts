import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import prompts from 'prompts';
import { z } from 'zod';

const main = async () => {
  const titlePrompt = await prompts({
    type: 'text',
    name: 'title',
    message: 'Article title?',
  });

  const title = z.string().min(3).max(100).parse(titlePrompt.title);

  const descriptionPrompt = await prompts({
    type: 'text',
    name: 'description',
    message: 'Article description?',
  });

  const description = z
    .string()
    .min(10)
    .max(100)
    .parse(descriptionPrompt.description);

  const localesPrompt = await prompts({
    type: 'text',
    name: 'locales',
    message: 'Article locales? (separated by ";")',
  });

  const slugPrompt = await prompts({
    type: 'text',
    name: 'slug',
    message: 'Article slug?',
  });

  const slug = z.string().min(3).max(100).parse(slugPrompt.slug);

  const locales = z
    .array(z.enum(['en', 'es']))
    .min(1)
    .parse(localesPrompt.locales.split(';'));

  const slugifiedTitle = title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');

  const dirPath = path.join(
    process.cwd(),
    'public',
    'articles',
    slugifiedTitle,
  );

  const dirExists = existsSync(dirPath);

  if (dirExists) {
    throw new Error('Article already exists');
  }

  await mkdir(dirPath);

  for (const locale of locales) {
    const filePath = path.join(dirPath, `${locale}.md`);

    const metadata = `---
slug: ${slug}
title: ${title}
description: ${description}
locale: ${locale}
date: ${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}
---
`;

    await writeFile(filePath, `${metadata}\n\n# ${title}\n\n`);
  }
};

main();
