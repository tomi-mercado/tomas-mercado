import React from 'react';
import { AiOutlineGlobal } from 'react-icons/ai';

import Image from 'next/image';
import Link from 'next/link';

import classNames from 'classnames';

import { Text } from '@components';

export const links = (locale: 'en' | 'es') => [
  {
    sectionName: 'hero',
    text: {
      en: 'Home',
      es: 'Inicio',
    }[locale],
  },
  {
    sectionName: 'projects',
    text: {
      en: 'Projects',
      es: 'Proyectos',
    }[locale],
  },
  {
    sectionName: 'experience',
    text: {
      en: 'Experience',
      es: 'Experiencia',
    }[locale],
  },
  {
    sectionName: 'about',
    text: {
      en: 'About',
      es: 'Sobre mí',
    }[locale],
  },
  {
    sectionName: 'contact',
    text: {
      en: 'Contact',
      es: 'Contacto',
    }[locale],
  },
];

interface NavbarProps {
  className?: string;
  locale: 'en' | 'es';
}

interface NavbarLinkProps {
  sectionName: string;
  text: string;
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ sectionName, text }) => (
  <Link href={`?current-section=${sectionName}`}>
    <Text as="p" variant="p2">
      {text}
    </Text>
  </Link>
);

const Navbar: React.FC<NavbarProps> = ({ className, locale }) => {
  return (
    <div
      className={classNames([
        'py-4 px-6 flex items-center justify-center sm:justify-between w-full',
        className,
      ])}
    >
      <div className="flex space-x-2 w-fit items-center">
        <div className="relative w-[50px] h-[50px]">
          <Image
            src="/logo.png"
            alt="Logo"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw,
                   (max-width: 1200px) 50vw,
                   33vw"
          />
        </div>
        <Text
          as="p"
          variant="h6"
          className="block min-[1024px]:hidden min-[1280px]:block"
        >
          Tomás Mercado
        </Text>
      </div>

      <div className="hidden sm:flex items-center space-x-3">
        {links(locale)?.map((link) => {
          return <NavbarLink key={link.sectionName} {...link} />;
        })}

        <Link
          href="/"
          locale={locale === 'en' ? 'es' : 'en'}
          className="flex space-x-2 items-center p-1 border border-black"
        >
          <AiOutlineGlobal />

          <Text as="p" variant="p3">
            {locale.toUpperCase()}
          </Text>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
