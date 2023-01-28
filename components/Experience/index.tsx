import Layout from 'components/Layout';

import React from 'react';

import {
  Content,
  ContentProps,
  Side,
  SideProps,
  TimeProps,
} from './components';

interface Experience {
  title: string;
  description: string;
  time: Omit<TimeProps, 'presentText'>;
  presentText: Pick<TimeProps, 'presentText'>;
  image: SideProps['images'][0];
}

export interface ExperienceProps {
  title: string;
  description: string;
  image: SideProps['images'][0];
  buttonLabel: string;
  nextButtonLabel: string;
  previousButtonLabel: string;
  presentText: string;
  experiences: Experience[];
  locale: 'en' | 'es';
}

const Experience: React.FC<ExperienceProps> = ({
  title,
  description,
  image,
  buttonLabel,
  nextButtonLabel,
  previousButtonLabel,
  experiences,
  presentText,
  locale,
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleNext = () =>
    setCurrentIndex((prev) => {
      if (prev === experiences.length) {
        return 0;
      }

      return prev + 1;
    });

  const handleBack = () => {
    setCurrentIndex((prev) => {
      if (prev === 0) {
        return experiences.length;
      }

      return prev - 1;
    });
  };

  const contentsProps: (ContentProps & { image: SideProps['images'][0] })[] = [
    {
      title,
      description,
      image,
      rightButton: {
        label: buttonLabel,
        onClick: () => setCurrentIndex(1),
      },
      leftButton: undefined,
    },
    ...experiences.map((experience) => {
      return {
        title: experience.title,
        time: { ...experience.time, presentText },
        description: experience.description,
        image: experience.image,
        rightButton: {
          label: nextButtonLabel,
          onClick: handleNext,
        },
        leftButton: {
          label: previousButtonLabel,
          onClick: handleBack,
        },
      };
    }),
  ];

  const contentProps = contentsProps[currentIndex];
  const images = contentsProps.map((content) => content.image);

  return (
    <Layout
      id="experience"
      sideComponent={<Side images={images} currentIndex={currentIndex} />}
      locale={locale}
    >
      <Content {...contentProps} />
    </Layout>
  );
};

export default Experience;
