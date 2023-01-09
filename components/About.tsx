import React from 'react';

import { Layout, Text } from '@components';

const About: React.FC = () => {
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
      <div className="py-6 flex flex-col space-y-4 text-center items-center lg:justify-center h-full">
        <Text variant="h3" underline>
          Who am I?
        </Text>

        <Text>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci
          consequatur laudantium laborum harum atque corrupti delectus, officia
          itaque molestias quaerat et esse at dolores. Aut obcaecati ipsum
          impedit corporis facilis?
        </Text>
      </div>
    </Layout>
  );
};

export default About;
