import React from 'react';

import Image from 'next/image';

import classNames from 'classnames';

interface ImageProps {
  alt: string;
  src: string;
}

interface DesktopProjectSideProps {
  images: [ImageProps, ImageProps, ImageProps];
  currentImage: number;
}

const DesktopProjectSide: React.FC<DesktopProjectSideProps> = ({
  currentImage,
  images,
}) => {
  return (
    <div className="relative h-screen">
      <Image
        src="/projects-side-image.png"
        alt="Illustration"
        fill
        className="object-cover opacity-40"
      />

      {images.map((image, index) => {
        return (
          <Image
            key={`desktop-project-image-${index}`}
            src={image.src}
            alt={image.alt}
            fill
            className={classNames([
              'object-contain transition-opacity duration-[1500ms] ease-in-out',
              {
                'opacity-0': currentImage !== index,
                'opacity-90': currentImage === index,
              },
            ])}
          />
        );
      })}
    </div>
  );
};

export default DesktopProjectSide;
