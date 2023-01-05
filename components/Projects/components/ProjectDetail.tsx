import React from 'react';

import { Card, Carousel, Text } from '@components';

export interface ProjectDetailProps {
  title: string;
  icon?: React.ReactNode;
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
      <Card
        className="w-full p-4 lg:min-h-[150px]"
        wrapperClassName="flex flex-col space-y-1 lg:space-y-4 items-center"
      >
        <Text variant="p" className="font-bold">
          {title}
        </Text>

        {children}
      </Card>
    </div>
  );
};

const ProjectDetail: React.FC<ProjectDetailProps> = ({
  title,
  icon,
  description,
  techStackIcons,
  mainChallenges,
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-2">
        {icon}
        <Text as="h3" variant="h3" underline>
          {title}
        </Text>
      </div>

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
