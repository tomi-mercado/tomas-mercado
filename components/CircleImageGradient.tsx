import React from 'react';

import Image, { ImageProps } from 'next/image';

import classNames from 'classnames';

interface CircleImageGradientProps {
  image: Pick<ImageProps, 'alt' | 'src'>;
  gradient?: {
    from?: string;
    to?: string;
  };
}

const CircleImageGradient: React.FC<CircleImageGradientProps> = ({
  image,
  gradient,
}) => {
  return (
    <div className="w-44 h-44 sm:w-64 sm:h-64 absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%]">
      <div
        className={classNames([
          'rounded-full w-full h-full bg-gradient-to-r animate-rot',
          {
            [`from-${gradient?.from}`]: gradient?.from,
            [`to-${gradient?.to}`]: gradient?.to,
            'from-primary': !gradient?.from,
            'to-secondary': !gradient?.to,
          },
        ])}
      ></div>
      <div className="absolute top-0 w-40 h-40 sm:w-60 sm:h-60">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="overflow-hidden rounded-full !left-[9px] !top-[9px]"
          sizes="
              (max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        />
      </div>
    </div>
  );
};

export default CircleImageGradient;
