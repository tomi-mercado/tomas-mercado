import React from 'react';

import Image from 'next/image';

const Navbar: React.FC = () => {
  return (
    <div className="py-4 px-6 flex items-center justify-between w-full">
      <div className="flex space-x-2 w-fit items-center">
        <Image src="/logo.png" alt="Logo" width={50} height={50} />
        <p className="text-lg">Tomás Mercado</p>
      </div>

      <div className="flex space-x-3">
        <p className="text-lg">Home</p>
        <p className="text-lg">Projects</p>
        <p className="text-lg">About</p>
        <p className="text-lg">Contact</p>
      </div>
    </div>
  );
};

export default Navbar;
