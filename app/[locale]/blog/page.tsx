import PostListItem from 'app/[locale]/blog/components/PostListItem';
import LinkMantainLocale from 'components/LinkMantainLocale';
import MarkedHighlightText from 'components/MarkedHighlightText';
import { getPosts } from 'services/posts';

import { Metadata } from 'next';
import Image from 'next/image';

export async function generateMetadata({
  params,
}: {
  params: { locale: 'en' | 'es' };
}): Promise<Metadata> {
  return {
    title: {
      en: 'Blog - Tomás Mercado',
      es: 'Blog - Tomás Mercado',
    }[params.locale],
  };
}

const Blog = async ({
  params,
}: {
  params: {
    locale: 'en' | 'es';
  };
}) => {
  const posts = await getPosts({ locale: params.locale });

  return (
    <div className="container py-6 flex flex-col gap-4 h-full flex-1">
      {posts.length === 0 && (
        <div className="w-full h-full flex flex-col gap-6 items-center flex-1 justify-center">
          <p className="text-3xl text-center">
            There are <MarkedHighlightText>no posts yet</MarkedHighlightText>
            <br />
            please come back later!
          </p>
          <Image
            src="/images/blogs-emptystate.webp"
            alt="Empty"
            width={350}
            height={350}
            className="rounded-full mix-blend-hard-light"
          />
          <LinkMantainLocale href="/" className="underline">
            Go back to the home page
          </LinkMantainLocale>
        </div>
      )}

      {!!posts.length && (
        <>
          <h1 className="text-4xl w-fit self-center text-center sm:self-start sm:text-left">
            <MarkedHighlightText className="px-2">Blog</MarkedHighlightText>
          </h1>

          <ul>
            {posts.map((post) => (
              <li key={post.slug}>
                <LinkMantainLocale href={`/blog/${post.slug}`}>
                  <PostListItem post={post} />
                </LinkMantainLocale>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Blog;
