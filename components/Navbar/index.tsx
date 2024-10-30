import LinkMantainLocale from 'components/LinkMantainLocale';
import { getAuth0User } from 'services/auth';
import { readCommonContent } from 'services/content';
import { Locale } from 'utils/locales';

import { MdLogout } from 'react-icons/md';

import { getSession } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import Link from 'next/link';

import UpdateLocaleButton from './UpdateLocaleButton';

const Navbar = async ({ locale }: { locale: Locale }) => {
  const {
    userMenu: { welcome },
  } = await readCommonContent(locale);
  const session = await getSession();
  const user = session ? await getAuth0User(session.user.sub) : undefined;

  return (
    <header className="w-full flex justify-center fixed z-10 py-6 bg-muted">
      <div className="container flex justify-between">
        <LinkMantainLocale href="/" className="flex gap-2 items-center">
          <Image
            src="/images/logo.png"
            alt="Tomas Mercado Logo"
            width={36}
            height={36}
            className="w-auto"
          />
          <h1 className="md:text-xl">Tomás Mercado</h1>
        </LinkMantainLocale>

        <div className="flex gap-4 items-center">
          <UpdateLocaleButton />
          {!!user && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <Image
                  src={user.picture || ''}
                  alt={user.name || 'Profile Image'}
                  width={40}
                  height={40}
                  style={{
                    width: 36,
                    height: 36,
                  }}
                  className="rounded-full"
                />
              </label>
              <div
                tabIndex={0}
                className="z-[1] p-3 shadow-md min-w-[240px] gap-2"
              >
                <p>
                  {welcome}, {user.name || user.nickname || 'User'}
                </p>
                <Link href="/api/auth/logout">
                  <MdLogout />
                  Logout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
