import replaceYearsExperience from 'utils/replaceYearsExperience';

import React from 'react';

import Image from 'next/image';

export interface IntroductionProps {
  title: {
    greeting: string;
    iAm: string;
    name: string;
  };
  description: string;
  image: {
    src: string;
    alt: string;
  };
}

const Introduction: React.FC<IntroductionProps> = ({
  title,
  description,
  image,
}) => {
  return (
    <>
      <h2 className="text-4xl">
        {title.greeting}
        <br /> ☀️ {title.iAm}{' '}
        <span className="underline -underline-offset-8 decoration-primary">
          {title.name}
        </span>{' '}
        👋🏻
      </h2>

      <Image
        src={image.src}
        alt={image.alt}
        width={150}
        height={100}
        priority
        className="rounded-full w-[150px] h-[150px] object-cover"
      />

      <p className="text-lg">{replaceYearsExperience(description)}</p>
    </>
  );
};

export default Introduction;
