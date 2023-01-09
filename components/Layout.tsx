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
      <div className="fixed z-50 lg:hidden top-0 w-full">{NavbarWithProps}</div>

      {/** Mobile */}
      <div className="block lg:hidden">
        <div className="lg:fixed z-10 top-0 w-full">
          <div className="relative h-[50vh]">
            {sideComponent || ImageWithProps}
          </div>
        </div>

        <div className="px-6 min-h-[50vh]">{children}</div>
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
