import React from 'react';

import { Layout } from '@components';

import { Introduction } from './components';

const Hero: React.FC = () => {
  return (
    <Layout
      image={{
        src: '/hero-side-image.png',
        alt: 'Illustration',
      }}
    >
      <Introduction />
    </Layout>
  );
};

export default Hero;
