import LinkMantainLocale from 'components/LinkMantainLocale';

import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container py-6">
      <LinkMantainLocale href="/blog">Back</LinkMantainLocale>
      {children}
    </div>
  );
};

export default Layout;
