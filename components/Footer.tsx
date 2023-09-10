import React from 'react';
import { FaGithub } from 'react-icons/fa';

import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="w-full flex justify-center items-center py-6 bg-base-200">
      <div className="max-w-6xl px-6 flex flex-col gap-4 items-center text-center w-full">
        <p className="text-sm">Made with 🤎 by Tom</p>
        <Link href="xxx" className="text-xs flex gap-2 items-center">
          <FaGithub />
          See the source code
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
