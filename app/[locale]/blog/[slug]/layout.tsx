import LinkMantainLocale from 'components/LinkMantainLocale';
import { getPost } from 'services/posts';
import { Locale } from 'utils/locales';

import { ReactNode } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug, params.locale);

  return {
    title: `${post?.title || 'Blog'} | Tomás Mercado`,
    description: post?.description || 'A blog post by Tomás Mercado',
  };
}

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container py-6">
      <LinkMantainLocale href="/blog">
        <IoIosArrowBack className="inline-block mr-1 mb-1" />
        <span>Back</span>
      </LinkMantainLocale>
      <div className="mt-4 max-w-[65ch] mx-auto">{children}</div>
    </div>
  );
};

export default Layout;
