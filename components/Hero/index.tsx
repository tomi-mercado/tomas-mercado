import React from 'react';

import Image from 'next/image';

import { Navbar } from '@components';

import { Introduction } from './components';

const Hero: React.FC = () => {
  return (
    <div className={`grid grid-cols-2 h-screen bg-[#e0d6cc] text-stone-800`}>
      <div>
        <Navbar />
        <Introduction />
      </div>

      <div className="relative">
        <Image
          src="/hero-side-image.png"
          alt="Illustration"
          fill
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
    </div>
  );
};

export default Hero;
