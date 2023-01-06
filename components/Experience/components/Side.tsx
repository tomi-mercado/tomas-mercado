import React from 'react';

import Image from 'next/image';

import { CircleImageGradient } from '@components';

const Side: React.FC = () => {
  return (
    <div className="relative w-full h-full">
      <Image
        src="/experience-side-image.png"
        alt="Illustration"
        fill
        className="brightness-[50%]"
        sizes="
          (max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
      />

      <CircleImageGradient
        image={{
          src: '/experience-first-image.png',
          alt: 'Illustration',
        }}
      />
    </div>
  );
};

export default Side;
