import UnderlinedText from 'components/UnderlinedText';
import readContent from 'services/content';
import { homeSchema } from 'utils/content/homeContentValidation';
import getTimeOfDay from 'utils/getTimeOfDay';
import replaceYearsExperience from 'utils/replaceYearsExperience';

import { ReactNode } from 'react';
import { SiTypescript } from 'react-icons/si';

import Image from 'next/image';

import SwapImage from './SwapImage';

interface IntroductionProps {
  locale: 'en' | 'es';
}

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

const Introduction = async ({ locale }: IntroductionProps) => {
  const {
    introduction: { title, image, description },
  } = await readContent('content/home.json', locale, homeSchema);

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

      <SwapImage image={image} />

      <p className="text-lg">
        {replacerDescription(replaceYearsExperience(description), [
          {
            strToReplace: '[quilmesLogo]',
            replacement: (
              <Image
                src="/images/quilmes.png"
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
