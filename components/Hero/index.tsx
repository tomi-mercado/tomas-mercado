import React from 'react';

import { Layout } from '@components';

import { Introduction } from './components';

const Hero: React.FC = () => {
  return (
    <Layout
      id="hero"
      image={{
        src: '/hero-side-image.png',
        alt: 'Illustration',
        priority: true,
      }}
      navbar={{
        className: 'bg-gradient-to-r from-[#d8c0aa] to-[#c6c1b5] lg:white',
      }}
    >
      <Introduction />
    </Layout>
  );
};

export default Hero;
