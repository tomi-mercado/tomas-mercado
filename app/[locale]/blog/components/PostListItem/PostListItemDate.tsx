'use client';

import { Locale } from 'utils/locales';

import { useParams } from 'next/navigation';

const PostListItemDate = ({ date }: { date: Date }) => {
  const params = useParams<{
    locale: Locale;
  }>();

  return (
    <p className="text-sm">
      {date.toLocaleDateString(params.locale === 'en' ? 'en-US' : 'es-AR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}
    </p>
  );
};

export default PostListItemDate;
