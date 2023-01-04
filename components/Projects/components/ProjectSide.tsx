import React, { useEffect, useState } from 'react';

import DesktopProjectSide from './DesktopProjectSide';
import MobileProjectSide from './MobileProjectSide';

const ProjectSide: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % 3);
    }, 7000);

    return () => clearInterval(interval);
  });

  const images: [
    { alt: string; src: string },
    { alt: string; src: string },
    { alt: string; src: string },
  ] = [
    {
      alt: 'Utel CMS Hero',
      src: '/utel-img-1.png',
    },
    {
      alt: 'Utel CMS Search',
      src: '/utel-img-2.png',
    },
    {
      alt: 'Utel CMS Search results',
      src: '/utel-img-3.png',
    },
  ];

  return (
    <>
      <div className="lg:hidden">
        <MobileProjectSide images={images} currentImage={currentImage} />
      </div>

      <div className="hidden lg:block">
        <DesktopProjectSide currentImage={currentImage} images={images} />
      </div>
    </>
  );
};

export default ProjectSide;
