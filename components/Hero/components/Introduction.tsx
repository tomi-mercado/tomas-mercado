import React from 'react';

import { Text } from '@components';

const Introduction: React.FC = () => {
  return (
    <div className="flex flex-col justify-center h-full min-h-[inherit] lg:min-h-fit">
      <div className="flex flex-col space-y-4 text-center">
        <Text as="h1" variant="h1">
          Tomás Mercado
        </Text>
        <div className="flex flex-col text-center justify-center items-center space-y-6">
          <Text as="h2" variant="h3">
            Web Developer
          </Text>
          <Text as="h4" variant="h6" className="text-gray-500 italic">
            Success is a journey, not a destination
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
