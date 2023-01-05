import React, { Fragment } from 'react';

import Image, { ImageProps } from 'next/image';

import classNames from 'classnames';

import { Navbar } from '@components';

interface LayoutProps {
  children: React.ReactNode;
  image?: Pick<ImageProps, 'alt' | 'src'>;
  screenPosition?: 'left' | 'right';
  contentWrapper?: {
    className?: string;
  };
  navbar?: {
    className?: string;
  };
  sideComponent?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  image,
  contentWrapper,
  navbar,
  screenPosition,
  sideComponent,
}) => {
  if (!sideComponent && !image) {
    throw new Error('You need to provide a sideComponent or an image');
  }

  const screenPositionImage = screenPosition || 'right';
  const isImageOnLeft = screenPositionImage === 'left';

  const ImageWithProps = image ? (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      style={{
        objectFit: 'cover',
      }}
      sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
    />
  ) : null;

  const NavbarWithProps = <Navbar className={navbar?.className} />;

  let content = [
    <div key="layout-children">
      {!isImageOnLeft && NavbarWithProps}
      {children}
    </div>,

    <Fragment key="layout-image">
      <div className="relative">
        {isImageOnLeft && (
          <div className="absolute top-0 z-10 w-full">{NavbarWithProps}</div>
        )}
        {sideComponent || ImageWithProps}
      </div>
    </Fragment>,
  ];

  if (isImageOnLeft) {
    content = content.reverse();
  }

  return (
    <div
      className={classNames(['bg-primary relative', contentWrapper?.className])}
    >
      {/** Mobile */}
      <div className="block lg:hidden">
        <div className="fixed top-0 w-full">
          {NavbarWithProps}
          <div className="relative h-[35vh]">
            {sideComponent || ImageWithProps}
          </div>
        </div>
        <div className="px-6 mt-[calc(35vh+79px)] h-[calc(100vh-(35vh+79px))]">
          {children}
        </div>
      </div>

      {/** Desktop */}
      <div
        className={`hidden lg:grid lg:grid-cols-2 h-screen max-w-[1920px] mx-auto`}
      >
        {content.map((child) => child)}
      </div>
    </div>
  );
};

export default Layout;
