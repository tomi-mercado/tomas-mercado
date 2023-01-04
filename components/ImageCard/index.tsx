import React from 'react';

import Image from 'next/image';

import classNames from 'classnames';

type View = 'landscape' | 'portrait';
type Size = 'sm' | 'md' | 'lg' | 'xl';

interface ImageCardProps {
  image: {
    src: string;
    alt: string;
  };
  size?: Size;
  view?: View;
}

interface UpDownDetailProps {
  position: 'top' | 'bottom';
}

function getWrapperStyles(view: View) {
  const landscapeStyles = {
    sm: 'max-w-[200px] max-h-[80px] p-2',
    md: 'max-w-[300px] max-h-[120px] p-4',
    lg: 'max-w-[400px] max-h-[160px] p-4',
    xl: 'max-w-[500px] max-h-[200px] p-4',
  };

  const portraitStyles = {
    sm: 'max-w-[80px] max-h-[200px] p-2',
    md: 'max-w-[120px] max-h-[300px] p-4',
    lg: 'max-w-[160px] max-h-[400px] p-4',
    xl: 'max-w-[200px] max-h-[500px] p-4',
  };

  return view === 'landscape' ? landscapeStyles : portraitStyles;
}

function getImageWrapperStyles(view: View) {
  const landscapeStyles = {
    sm: 'h-[48px]',
    md: 'h-[88px]',
    lg: 'h-[128px]',
    xl: 'h-[168px]',
  };

  const portraitStyles = {
    sm: 'h-[68px]',
    md: 'h-[168px]',
    lg: 'h-[268px]',
    xl: 'h-[368px]',
  };

  return view === 'landscape' ? landscapeStyles : portraitStyles;
}

const getViewSizeStyles = (view: View, size: Size) => {
  const wrapperStyles = getWrapperStyles(view);
  const imageWrapperStyles = getImageWrapperStyles(view);

  return {
    wrapperStyles: wrapperStyles[size],
    imageWrapperStyles: imageWrapperStyles[size],
  };
};

const UpDownDetail: React.FC<UpDownDetailProps> = ({ position }) => (
  <div
    className={classNames([
      'absolute h-[1px] w-1/12 bg-neutral-300',
      {
        'bottom-2 right-2': position === 'bottom',
        'top-2 left-2': position === 'top',
      },
    ])}
  ></div>
);

const ImageCard: React.FC<ImageCardProps> = ({
  image,
  size = 'md',
  view = 'landscape',
}) => {
  const { wrapperStyles, imageWrapperStyles } = getViewSizeStyles(view, size);

  return (
    <div
      className={classNames([
        'w-full bg-yellow-50 rounded-md shadow-lg relative',
        wrapperStyles,
      ])}
    >
      <UpDownDetail position="top" />

      <div className={classNames(['relative w-full', imageWrapperStyles])}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover rounded-sm object-top"
        />
      </div>

      <UpDownDetail position="bottom" />
    </div>
  );
};

export default ImageCard;
