import React from 'react';

import Image, { ImageProps } from 'next/image';

import { Navbar } from '@components';

interface LayoutProps {
  children: React.ReactNode;
  image: Pick<ImageProps, 'alt' | 'src'> & {
    screenPosition?: 'left' | 'right';
  };
}

const AlternativeNavbar: React.FC = () => {
  return (
    <div className="w-full z-10 absolute text-[#e0d6cc] bg-[rgba(0,0,0,0.5)]">
      <Navbar />
    </div>
  );
};

const Layout: React.FC<LayoutProps> = ({ children, image }) => {
  const screenPositionImage = image.screenPosition || 'right';
  const isImageOnLeft = screenPositionImage === 'left';

  const ImageWithProps = (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      style={{
        objectFit: 'cover',
      }}
    />
  );

  let content = [
    <div key="layout-children" className="px-6">
      {!isImageOnLeft && <Navbar />}
      {children}
    </div>,

    <div key="layout-image" className="relative">
      {isImageOnLeft && <AlternativeNavbar />}
      {ImageWithProps}
    </div>,
  ];

  if (isImageOnLeft) {
    content = content.reverse();
  }

  return (
    <div className="bg-[#e0d6cc] text-stone-800">
      {/** Mobile */}
      <div className="block lg:hidden">
        <div className="relative h-[calc(40vh+80px)]">
          <AlternativeNavbar />
          {ImageWithProps}
        </div>

        <div className="px-6 h-[calc(60vh-80px)]">{children}</div>
      </div>

      {/** Desktop */}
      <div
        className={`hidden lg:grid lg:grid-cols-[3fr,2fr] xl:grid-cols-2 h-screen max-w-[1440px] mx-auto`}
      >
        {content.map((child) => child)}
      </div>
    </div>
  );
};

export default Layout;
