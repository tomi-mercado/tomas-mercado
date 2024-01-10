import { writeFile } from 'fs/promises';
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

  const locales = z
    .array(z.enum(['en', 'es']))
    .min(1)
    .parse(localesPrompt.locales.split(';'));

  const slugifiedTitle = title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');

  const metadata = `---
title: ${title}
description: ${description}
locale: ${locales.join(';')}
---`;

  let content = '';

  if (locales.length > 1) {
    locales.forEach((locale) => {
      content += `/-/-/-start_${locale}-/-/-/\n\n# ${title} (${locale})\n\n/-/-/-end_${locale}-/-/-/\n\n`;
    });
  } else {
    content += `# ${title}\n\n`;
  }

  await writeFile(
    path.join(process.cwd(), 'public', 'articles', `${slugifiedTitle}.md`),
    `${metadata}\n\n${content}
    `,
  );
};

main();
