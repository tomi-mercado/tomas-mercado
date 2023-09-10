import { useContent } from 'contexts/content';
import { useReplaceYearsExperienceOnClient } from 'utils/replaceYearsExperience';

import React from 'react';

import Image from 'next/image';

const Introduction: React.FC = () => {
  const {
    content: {
      introduction: { title, description: desc, image },
    },
  } = useContent();
  const description = useReplaceYearsExperienceOnClient(desc);

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
        height={150}
        priority
        className="rounded-full w-[150px] h-[150px] object-cover"
      />

      <p className="text-lg">{description}</p>
    </>
  );
};

export default Introduction;
