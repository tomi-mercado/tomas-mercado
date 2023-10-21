import { readCommonContent } from 'services/content';

import NavbarClient from './Navbar.client';

const NavbarServer = async ({ locale }: { locale: 'en' | 'es' }) => {
  const commonContent = await readCommonContent(locale);

  return <NavbarClient content={commonContent} />;
};

export default NavbarServer;
