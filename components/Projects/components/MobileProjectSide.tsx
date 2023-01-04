import Image from 'next/image';

import classNames from 'classnames';

import { ImageCard } from '@components';

interface ImageProps {
  alt: string;
  src: string;
}

interface MobileProjectSideProps {
  images: [ImageProps, ImageProps, ImageProps];
  currentImage: number;
}

const MobileProjectSide: React.FC<MobileProjectSideProps> = ({
  images,
  currentImage,
}) => {
  const zIndexes =
    currentImage === 0
      ? [30, 20, 10]
      : currentImage === 1
      ? [20, 30, 10]
      : [10, 20, 30];

  return (
    <div className="relative w-full h-full">
      {/** Background */}
      <Image
        src="/projects-side-image.png"
        alt="Illustration"
        fill
        className="grayscale-[0.3] object-cover"
      />

      {/** Content */}
      <div className="relative w-full max-w-[357px] mx-auto h-[35vh]">
        {images.map((image, index) => {
          return (
            <div
              key={`project-image-mobile-${index}`}
              className={classNames([
                'absolute transition-opacity duration-500 ease-in-out',
                `z-${zIndexes[index]}`,

                {
                  'opacity-50': currentImage !== index,
                  'opacity-100': currentImage === index,
                  'left-2 top-2 w-3/4': index === 0,
                  'right-2 bottom-2 w-1/3': index === 1,
                  'left-14 bottom-4 w-3/4': index === 2,
                },
              ])}
            >
              <ImageCard
                image={image}
                view={index === 1 ? 'portrait' : 'landscape'}
                size={index === 2 ? 'sm' : 'md'}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MobileProjectSide;
