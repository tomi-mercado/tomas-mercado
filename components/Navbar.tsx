import React from 'react';
import { AiOutlineMenu as MenuIcon } from 'react-icons/ai';

import Image from 'next/image';

import { Text } from '@components';

const Navbar: React.FC = () => {
  return (
    <div className="py-4 px-6 flex items-center justify-between w-full">
      <div className="flex space-x-2 w-fit items-center">
        <Image src="/logo.png" alt="Logo" width={50} height={50} />
        <Text as="p" variant="h6">
          Tomás Mercado
        </Text>
      </div>

      <div className="hidden sm:flex space-x-3">
        <Text as="p" variant="h6">
          Home
        </Text>
        <Text as="p" variant="h6">
          Projects
        </Text>
        <Text as="p" variant="h6">
          About
        </Text>
        <Text as="p" variant="h6">
          Contact
        </Text>
      </div>

      <div className="sm:hidden">
        <MenuIcon size={30} />
      </div>

      {/** TODO: mobile menu icon */}
    </div>
  );
};

export default Navbar;
