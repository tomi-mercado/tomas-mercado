import React, { useEffect, useState } from 'react';

import Image, { ImageProps } from 'next/image';

import classNames from 'classnames';

import { ImageCard } from '@components';

export interface ProjectSideProps {
  images: [
    Pick<ImageProps, 'alt' | 'src'>,
    Pick<ImageProps, 'alt' | 'src'>,
    Pick<ImageProps, 'alt' | 'src'>,
  ];
}

const ProjectSide: React.FC<ProjectSideProps> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const zIndexes =
    currentImage === 0
      ? [30, 20, 10]
      : currentImage === 1
      ? [20, 30, 10]
      : [10, 20, 30];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % 3);
    }, 7000);

    return () => clearInterval(interval);
  });

  return (
    <div className="relative w-full h-full">
      {/** Project cards */}
      <Image
        src="/projects-side-image.png"
        alt="Illustration"
        fill
        className="grayscale-[0.3] object-cover"
      />

      {/** Content */}
      <div className="relative w-full max-w-[357px] lg:max-w-full mx-auto h-[35vh] lg:h-screen">
        {images.map((image, index) => {
          const view = index === 1 ? 'portrait' : 'landscape';

          return (
            <div
              key={`project-image-mobile-${index}`}
              onClick={() => setCurrentImage(index)}
              className={classNames([
                'absolute transition-opacity duration-500 ease-in-out cursor-pointer',
                `z-${zIndexes[index]}`,

                {
                  'opacity-50': currentImage !== index,
                  'opacity-100': currentImage === index,
                  'left-2 top-2 lg:top-40 lg:left-20 w-3/4': index === 0,
                  'right-2 bottom-2 w-1/3 lg:bottom-32': index === 1,
                  'left-14 bottom-4 w-3/4 lg:bottom-40 lg:left-16': index === 2,
                },
              ])}
            >
              <div className="lg:hidden">
                <ImageCard
                  image={image}
                  view={view}
                  size={index === 2 ? 'sm' : 'md'}
                />
              </div>
              <div className="hidden lg:block">
                <ImageCard image={image} view={view} size="xl" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectSide;
