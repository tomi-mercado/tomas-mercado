import LinkMantainLocale from 'components/LinkMantainLocale';

import { ReactNode } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

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
