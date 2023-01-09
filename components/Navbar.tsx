import React from 'react';
import { AiOutlineMenu as MenuIcon } from 'react-icons/ai';

import Image from 'next/image';
import Link from 'next/link';

import classNames from 'classnames';

import { Text } from '@components';

export const links = [
  {
    sectionName: 'hero',
    text: 'Home',
  },
  {
    sectionName: 'projects',
    text: 'Projects',
  },
  {
    sectionName: 'experience',
    text: 'Experience',
  },
  {
    sectionName: 'about',
    text: 'About',
  },
  {
    sectionName: 'contact',
    text: 'Contact',
  },
];

interface NavbarProps {
  className?: string;
}

interface NavbarLinkProps {
  sectionName: string;
  text: string;
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ sectionName, text }) => (
  <Link href={`?current-section=${sectionName}`}>
    <Text as="p" variant="h6">
      {text}
    </Text>
  </Link>
);

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  return (
    <div
      className={classNames([
        'py-4 px-6 flex items-center justify-between w-full',
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
        <Text as="p" variant="h6">
          Tomás Mercado
        </Text>
      </div>

      <div className="hidden sm:flex space-x-3">
        {links?.map((link) => {
          return <NavbarLink key={link.sectionName} {...link} />;
        })}
      </div>

      <div className="sm:hidden">
        <MenuIcon size={30} />
      </div>

      {/** TODO: mobile menu icon */}
    </div>
  );
};

export default Navbar;
