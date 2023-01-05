import React from 'react';

import { Carousel, Text } from '@components';

interface ProjectDetailProps {
  title: string;
  description: string;
  techStackIcons: React.ReactNode[];
  mainChallenges: string[];
}

interface CarouselItemProps {
  children: React.ReactNode;
  title: string;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ children, title }) => {
  return (
    <div className="px-1">
      <div className="!flex items-center justify-center w-full flex-col space-y-1 lg:space-y-4 bg-[#e7ddd0] p-4 lg:min-h-[150px] rounded-lg shadow-md">
        <Text variant="p" className="font-bold">
          {title}
        </Text>

        {children}
      </div>
    </div>
  );
};

const ProjectDetail: React.FC<ProjectDetailProps> = ({
  title,
  description,
  techStackIcons,
  mainChallenges,
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <Text as="h3" variant="h3" underline>
        {title}
      </Text>

      <Text>{description}</Text>

      <Carousel>
        <CarouselItem title="Tech stack">
          <div className="flex space-x-2">{techStackIcons}</div>
        </CarouselItem>

        <CarouselItem title="Main challenges">
          <ul className="self-start">
            {mainChallenges.map((challenge, i) => (
              <li key={`main-challenges-${title}-${i}`}>
                <Text variant="p2">✨ {challenge}</Text>
              </li>
            ))}
          </ul>
        </CarouselItem>
      </Carousel>
    </div>
  );
};

export default ProjectDetail;
