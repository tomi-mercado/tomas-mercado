import remarkGfm from 'remark-gfm';
import { getPost } from 'services/posts';
import { Locale } from 'utils/locales';

import Markdown from 'react-markdown';

import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: {
    slug: string;
    locale: Locale;
  };
}) {
  const { slug, locale } = params;

  const post = await getPost(slug, locale);

  if (!post) {
    notFound();
  }

  const dateStr = {
    en: post.createdAt.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    es: post.createdAt.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  }[locale];

  return (
    <article className="prose">
      <p>{dateStr}</p>
      <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
    </article>
  );
}
