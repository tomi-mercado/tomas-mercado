'use client';

import { ReactNode } from 'react';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

const LinkMantainLocale = ({
  children,
  href,
  ...props
}: Omit<LinkProps, 'href'> & {
  children: ReactNode;
  href: string;
  className?: string;
}) => {
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  if (typeof locale !== 'string') {
    return null;
  }

  const hrefWithLocale = `/${locale}${!href.startsWith('/') ? '/' : ''}${href}`;

  return (
    <Link {...props} href={hrefWithLocale}>
      {children}
    </Link>
  );
};

export default LinkMantainLocale;
