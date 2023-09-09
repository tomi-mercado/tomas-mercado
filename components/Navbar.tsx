import { useLocale } from 'contexts/locale';

import React from 'react';
import { AiOutlineGlobal } from 'react-icons/ai';

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
  return (
    <header className="w-full flex justify-center bg-base-300">
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
          />
          <span className="md:text-xl">Tomás Mercado</span>
        </Link>

        <UpdateLocaleButton />
      </div>
    </header>
  );
};

export default Navbar;
