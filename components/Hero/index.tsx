import React from 'react';

import { Layout } from '@components';

import { Introduction, IntroductionProps } from './components';

export * from './components';

const Hero: React.FC<IntroductionProps & { locale: 'en' | 'es' }> = (props) => {
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
      locale={props.locale}
    >
      <Introduction {...props} />
    </Layout>
  );
};

export default Hero;
