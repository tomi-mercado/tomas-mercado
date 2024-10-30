import MarkedHighlightText from 'components/MarkedHighlightText';
import { HomeContent } from 'utils/content/homeContentValidation';
import getTimeOfDay from 'utils/getTimeOfDay';
import replaceYearsExperience from 'utils/replaceYearsExperience';

import Image from 'next/image';

const Introduction = async ({
  title,
  image,
  description,
}: HomeContent['introduction']) => {
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

        <MarkedHighlightText>
          {title.iAm} {title.name} 👋🏻
        </MarkedHighlightText>
      </h2>

      {/** TODO: reimplement <SwapImage/> */}
      <Image
        src={image.src}
        alt={image.alt}
        width={150}
        height={150}
        priority
        className="rounded-full w-[150px] h-[150px] object-cover border-2"
      />

      <p className="text-lg">{replaceYearsExperience(description)}</p>
    </>
  );
};

export default Introduction;
