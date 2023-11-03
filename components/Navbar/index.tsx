import { getAuth0User } from 'services/auth';
import { readCommonContent } from 'services/content';

import { MdLogout } from 'react-icons/md';

import { getSession } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import Link from 'next/link';

import UpdateLocaleButton from './UpdateLocaleButton';

const Navbar = async ({ locale }: { locale: 'en' | 'es' }) => {
  const {
    userMenu: { welcome },
  } = await readCommonContent(locale);
  const session = await getSession();
  const user = session ? await getAuth0User(session.user.sub) : undefined;

  return (
    <header className="w-full flex justify-center bg-base-300 fixed z-10">
      <div className="navbar max-w-6xl px-6 justify-between">
        <Link href="/" className="flex gap-2 items-center">
          <Image
            src="/logo.png"
            alt="Tomas Mercado Logo"
            width={36}
            height={36}
            className="w-auto"
          />
          <h1 className="md:text-xl">Tomás Mercado</h1>
        </Link>

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
                className="menu menu-lg dropdown-content z-[1] p-3 shadow bg-base-200 rounded-box min-w-[240px] gap-2"
              >
                <p>
                  {welcome}, {user.name || user.nickname || 'User'}
                </p>
                <Link
                  href="/api/auth/logout"
                  className="btn btn-secondary btn-xs"
                >
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
