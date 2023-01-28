import React from 'react';

import { Layout, Text } from '@components';

export interface AboutProps {
  title: string;
  description: string;
}

const About: React.FC<AboutProps> = ({ title, description }) => {
  return (
    <Layout
      id="about"
      image={{
        src: '/tomas-mercado.jpeg',
        alt: 'Tomas Mercado photo',
        className: 'object-contain lg:object-cover lg:object-top',
      }}
      screenPosition="left"
      navbar={{
        className: 'bg-white',
      }}
      contentWrapper={{
        className: 'pt-4 lg:pt-0',
      }}
    >
      <div className="p-6 flex flex-col space-y-4 text-center items-center lg:justify-center h-full">
        <Text variant="h3" underline>
          {title}
        </Text>

        <Text>{description}</Text>
      </div>
    </Layout>
  );
};

export default About;
