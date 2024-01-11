import MarkedHighlightText from 'components/MarkedHighlightText';
import readContent from 'services/content';
import { homeSchema } from 'utils/content/homeContentValidation';
import getTimeOfDay from 'utils/getTimeOfDay';
import replaceYearsExperience from 'utils/replaceYearsExperience';

import SwapImage from './SwapImage';

interface IntroductionProps {
  locale: 'en' | 'es';
}

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

        <MarkedHighlightText>
          {title.iAm} {title.name} 👋🏻
        </MarkedHighlightText>
      </h2>

      <SwapImage image={image} />

      <p className="text-lg">{replaceYearsExperience(description)}</p>
    </>
  );
};

export default Introduction;
