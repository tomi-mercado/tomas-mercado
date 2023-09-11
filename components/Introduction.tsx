import { useContent } from 'contexts/content';
import { useReplaceYearsExperienceOnClient } from 'utils/replaceYearsExperience';

import React from 'react';

import Image from 'next/image';

import UnderlinedText from './UnderlinedText';

const Introduction: React.FC = () => {
  const {
    content: {
      introduction: { title, description: desc, image },
    },
  } = useContent('Home');
  const description = useReplaceYearsExperienceOnClient(desc);

  return (
    <>
      <h2 className="text-4xl">
        <span className="text-2xl">{title.greeting}</span>
        <br />
        {title.iAm} <UnderlinedText>{title.name}</UnderlinedText> 👋🏻
      </h2>

      <div className="rounded-full w-[160px] h-[160px] bg-secondary relative">
        <Image
          src={image.src}
          alt={image.alt}
          width={150}
          height={150}
          priority
          className="rounded-full w-[150px] h-[150px] object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <p className="text-lg">{description}</p>
    </>
  );
};

export default Introduction;
