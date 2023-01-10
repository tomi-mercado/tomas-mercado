import React from 'react';

import { Text } from '@components';

export interface IntroductionProps {
  title: string;
  subtitle: string;
  description: string;
}

const Introduction: React.FC<IntroductionProps> = ({
  title,
  description,
  subtitle,
}) => {
  return (
    <div className="flex flex-col justify-center h-full min-h-[inherit] lg:min-h-fit">
      <div className="flex flex-col space-y-4 text-center">
        <Text as="h1" variant="h1">
          {title}
        </Text>
        <div className="flex flex-col text-center justify-center items-center space-y-6">
          <Text as="h2" variant="h3">
            {subtitle}
          </Text>
          <Text as="h4" variant="h6" className="text-gray-500 italic">
            {description}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
