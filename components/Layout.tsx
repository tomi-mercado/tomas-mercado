import useWindowSize from 'hooks/useWindowSize';

import React, { Fragment } from 'react';

import Image, { ImageProps } from 'next/image';

import classNames from 'classnames';

import { Navbar } from '@components';

interface LayoutProps {
  children: React.ReactNode;
  image?: ImageProps;
  screenPosition?: 'left' | 'right';
  contentWrapper?: {
    className?: string;
  };
  navbar?: {
    className?: string;
  };
  sideComponent?: React.ReactNode;
  id?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  image,
  contentWrapper,
  navbar,
  screenPosition,
  sideComponent,
  id,
}) => {
  const { width } = useWindowSize();
  const isMobile = width < 1024;

  if (!sideComponent && !image) {
    throw new Error('You need to provide a sideComponent or an image');
  }

  const screenPositionImage = screenPosition || 'right';
  const isImageOnLeft = screenPositionImage === 'left';

  const ImageWithProps = image ? (
    <Image
      {...image}
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
      id={id}
      className={classNames(['bg-primary relative', contentWrapper?.className])}
    >
      {isMobile && (
        <>
          <div className="fixed z-50 top-0 w-full">{NavbarWithProps}</div>

          <div className="relative h-[50vh]">
            {sideComponent || ImageWithProps}
          </div>

          <div className="px-6 min-h-[50vh]">{children}</div>
        </>
      )}

      {!isMobile && (
        <div className={`grid lg:grid-cols-2 h-screen max-w-[1920px] mx-auto`}>
          {content.map((child) => child)}
        </div>
      )}
    </div>
  );
};

export default Layout;
