'use client';

import { AiOutlineGlobal } from 'react-icons/ai';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

const UpdateLocaleButton: React.FC = () => {
  const params = useParams();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];
  const restOfPath = pathname.split('/').slice(2).join('/');

  const slug = typeof params.slug === 'string' ? params.slug : null;

  return (
    <Link
      href={
        // If a slug is present, we are on a blog post page, so we need to
        // redirect to the blog page in the other locale because each blog post has
        // a different slug in each locale.
        // If a slug is not present, we are on a page that is not a blog post, so
        // we can redirect to the same page in the other locale.
        locale === 'en'
          ? `/es/${!!slug ? 'blog' : restOfPath}`
          : `/en/${!!slug ? 'blog' : restOfPath}`
      }
      className="flex space-x-2 items-center"
    >
      <AiOutlineGlobal />

      <p className="text-sm md:text-base">{locale.toUpperCase()}</p>
    </Link>
  );
};

export default UpdateLocaleButton;
