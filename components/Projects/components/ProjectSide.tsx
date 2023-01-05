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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % 3);
    }, 7000);

    return () => clearInterval(interval);
  });

  return (
    <div className="relative w-full h-full flex items-center">
      {/** Background */}
      <Image
        src="/projects-side-image.png"
        alt="Illustration"
        fill
        className="grayscale-[0.3] object-cover"
      />

      {/** Project cards */}
      <div className="relative w-full max-w-[357px] lg:max-w-full mx-auto h-[225px] lg:h-[400px]">
        {images.map((image, index) => {
          const view = index === 1 ? 'portrait' : 'landscape';

          return (
            <div
              key={`project-image-mobile-${index}`}
              onMouseEnter={() => setCurrentImage(index)}
              className={classNames([
                'absolute transition-opacity duration-500 ease-in-out cursor-pointer',
                {
                  'opacity-40': currentImage !== index,
                  'opacity-100': currentImage === index,
                  'left-2 top-2 2xl:top-[-1rem] 2xl:left-40 w-3/4': index === 0,
                  'right-2 bottom-2 2xl:top-0 w-1/3': index === 1,
                  'left-14 bottom-4 2xl:bottom-4 lg:left-4 2xl:left-36 w-3/4':
                    index === 2,
                  'z-10': currentImage !== index,
                  'z-20': currentImage === index,
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
