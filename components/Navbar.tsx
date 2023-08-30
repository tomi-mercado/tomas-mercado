import { useLocale } from 'contexts/locale';

import React from 'react';
import { AiOutlineGlobal } from 'react-icons/ai';

import Image from 'next/image';
import Link from 'next/link';

import classNames from 'classnames';

import { Text } from '@components';

interface NavbarProps {
  className?: string;
}

interface NavbarLinkProps {
  sectionName: string;
  text: string;
}

interface UpdateLocaleButtonProps {
  className?: string;
}

export const links = (locale: 'en' | 'es') => [
  {
    sectionName: 'hero',
    text: {
      en: 'Home',
      es: 'Inicio',
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

const NavbarLink: React.FC<NavbarLinkProps> = ({ sectionName, text }) => (
  <Link href={`?current-section=${sectionName}`}>
    <Text as="p" variant="p2">
      {text}
    </Text>
  </Link>
);

const UpdateLocaleButton: React.FC<UpdateLocaleButtonProps> = ({
  className,
}) => {
  const { locale } = useLocale();

  return (
    <Link
      href="/"
      locale={locale === 'en' ? 'es' : 'en'}
      className={classNames([
        'flex space-x-2 items-center p-1 border border-black',
        className,
      ])}
    >
      <AiOutlineGlobal />

      <Text as="p" variant="p3">
        {locale.toUpperCase()}
      </Text>
    </Link>
  );
};

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const { locale } = useLocale();

  return (
    <div
      className={classNames([
        'py-4 px-6 flex items-center justify-between w-full',
        className,
      ])}
    >
      <Link href="/" className="flex space-x-2 w-fit items-center">
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
      </Link>

      <div className="hidden sm:flex items-center space-x-3">
        {links(locale)?.map((link) => {
          return <NavbarLink key={link.sectionName} {...link} />;
        })}

        <UpdateLocaleButton />
      </div>

      <UpdateLocaleButton className="block sm:hidden" />
    </div>
  );
};

export default Navbar;
