import { useContent } from 'contexts/content';
import getTimeOfDay from 'utils/getTimeOfDay';
import { useReplaceYearsExperienceOnClient } from 'utils/replaceYearsExperience';

import React, { ReactNode, useEffect, useState } from 'react';
import { SiTypescript } from 'react-icons/si';

import Image from 'next/image';

import UnderlinedText from './UnderlinedText';

const replacerDescription = (
  str: string,
  toReplace: {
    strToReplace: string;
    replacement: ReactNode;
  }[],
) => {
  return (
    <span>
      {str.split(' ').map((word, i) => {
        const replacement = toReplace.find(({ strToReplace }) =>
          word.includes(strToReplace),
        );

        if (replacement) {
          const charsPreviousToLogo = word.split(replacement.strToReplace)[0];
          const charsAfterLogo = word.split(replacement.strToReplace)[1];
          return (
            <>
              {charsPreviousToLogo}
              {replacement.replacement}
              {charsAfterLogo}{' '}
            </>
          );
        }

        return <span key={i}>{word} </span>;
      })}
    </span>
  );
};

const SwapImage: React.FC = () => {
  const [swap, setSwap] = useState(false);
  const {
    content: {
      introduction: { image },
    },
  } = useContent('Home');

  useEffect(() => {
    const interval = setInterval(() => {
      setSwap((prev) => !prev);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <label className="swap swap-flip cursor-default">
      <input type="checkbox" checked={swap} />

      <div className="swap-on">
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
      </div>
      <div className="swap-off">
        <div className="rounded-full w-[160px] h-[160px] bg-secondary relative">
          <Image
            src="/logo.png"
            alt="Logo of Tom: The food is pizza, the club is Quilmes, and the code is TypeScript"
            width={184}
            height={184}
            priority
            className="rounded-full w-[184px] h-[184px] object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
    </label>
  );
};

const Introduction: React.FC = () => {
  const {
    content: {
      introduction: { title, description: desc },
    },
  } = useContent('Home');
  const description = useReplaceYearsExperienceOnClient(desc);

  const timeOfDay = getTimeOfDay();
  const greetingByTimeOfDay = {
    morning: title.greetingMorning,
    afternoon: title.greetingAfternoon,
    evening: title.greetingEvening,
    night: title.greetingNight,
  }[timeOfDay];

  return (
    <>
      <h2 className="text-4xl">
        <span className="text-2xl">{greetingByTimeOfDay}</span>
        <br />
        {title.iAm} <UnderlinedText>{title.name}</UnderlinedText> 👋🏻
      </h2>

      <SwapImage />

      <p className="text-lg">
        {replacerDescription(description, [
          {
            strToReplace: '[quilmesLogo]',
            replacement: (
              <Image
                src="/quilmes.png"
                alt="Quilmes Atletico Club escudo"
                width={16}
                height={16}
                className="inline-block mb-1"
              />
            ),
          },
          {
            strToReplace: '[typescriptLogo]',
            replacement: (
              <SiTypescript className="inline-block text-blue-600 ml-1 mb-1" />
            ),
          },
        ])}
      </p>
    </>
  );
};

export default Introduction;
