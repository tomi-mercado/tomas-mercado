import { useLocale } from 'contexts/locale';

import React from 'react';
import { AiOutlineGlobal } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';

import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import Link from 'next/link';

const UpdateLocaleButton: React.FC = () => {
  const { locale } = useLocale();

  return (
    <Link
      href="/"
      locale={locale === 'en' ? 'es' : 'en'}
      className="flex space-x-2 items-center"
    >
      <AiOutlineGlobal />

      <p className="text-sm md:text-base">{locale.toUpperCase()}</p>
    </Link>
  );
};

const Navbar: React.FC = () => {
  const { user } = useUser();

  return (
    <header className="w-full flex justify-center bg-base-300 fixed">
      <div className="navbar max-w-6xl px-6 justify-between">
        <Link href="/" className="flex gap-2 items-center">
          <Image
            src="/logo.png"
            alt="Tomas Mercado Logo"
            width={36}
            height={36}
            style={{
              filter: 'invert(1)',
            }}
            className="w-auto"
          />
          <span className="md:text-xl">Tomás Mercado</span>
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
                <p>Welcome, {user.name || user.nickname || 'User'}</p>
                <a href="/api/auth/logout" className="btn btn-secondary btn-xs">
                  <MdLogout />
                  Logout
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
