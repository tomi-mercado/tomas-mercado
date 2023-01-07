import React from 'react';

import Image, { ImageProps } from 'next/image';

import { CircleImageGradient } from '@components';

export interface SideProps {
  images: ImageProps[];
  currentIndex: number;
}

const Side: React.FC<SideProps> = ({ images, currentIndex }) => {
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

      {images.map((image, index) => {
        const isCurrent = currentIndex === index;

        return (
          <div
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out
             ${isCurrent ? 'opacity-100' : 'opacity-0'}`}
            key={String(image.src)}
          >
            <CircleImageGradient
              image={{
                src: image.src,
                alt: image.alt,
              }}
              gradient={{
                from: '[#65362d]',
                to: '[#7f6358]',
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Side;
