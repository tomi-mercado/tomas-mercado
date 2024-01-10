import remarkGfm from 'remark-gfm';
import { getPost, getPosts } from 'services/posts';

import Markdown from 'react-markdown';

import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const { slug } = params;

  const content = await getPost(slug);

  if (!content) {
    notFound();
  }

  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ node, ...props }) => (
          <h1 {...props} className="text-3xl font-bold" />
        ),
        h2: ({ node, ...props }) => (
          <h2 {...props} className="text-2xl font-bold" />
        ),
        h3: ({ node, ...props }) => (
          <h3 {...props} className="text-xl font-bold" />
        ),
        h4: ({ node, ...props }) => (
          <h4 {...props} className="text-lg font-bold" />
        ),
        h5: ({ node, ...props }) => (
          <h5 {...props} className="text-base font-bold" />
        ),
        h6: ({ node, ...props }) => (
          <h6 {...props} className="text-sm font-bold" />
        ),
        a: ({ node, ...props }) => <a {...props} className="underline" />,
        hr: ({ node, ...props }) => <hr {...props} className="my-4" />,
        ul: ({ node, ...props }) => (
          <ul {...props} className="list-disc pl-4" />
        ),
        ol: ({ node, ...props }) => (
          <ol {...props} className="list-decimal pl-4" />
        ),
        li: ({ node, ...props }) => <li {...props} className="my-2" />,
        p: ({ node, ...props }) => <p {...props} className="my-2" />,
        table: ({ node, ...props }) => (
          <table {...props} className="table-auto" />
        ),
        thead: ({ node, ...props }) => <thead {...props} />,
        tbody: ({ node, ...props }) => <tbody {...props} />,
        tr: ({ node, ...props }) => <tr {...props} />,
        td: ({ node, ...props }) => (
          <td {...props} className="border px-4 py-2" />
        ),
        th: ({ node, ...props }) => (
          <th {...props} className="border px-4 py-2" />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote {...props} className="border-l-4 pl-4 italic" />
        ),
        pre: ({ node, ...props }) => <pre {...props} className="my-4" />,
        code: ({ node, ...props }) => (
          <code {...props} className="bg-gray-200 p-1 rounded" />
        ),
        strong: ({ node, ...props }) => <strong {...props} />,
        em: ({ node, ...props }) => <em {...props} />,
        del: ({ node, ...props }) => <del {...props} />,
        br: ({ node, ...props }) => <br {...props} />,
      }}
    >
      {content}
    </Markdown>
  );
}
