import Layout from 'components/Layout';

import React from 'react';

import Image from 'next/image';

import { CircleImageGradient } from '@components';

const Experience: React.FC = () => {
  return (
    <Layout
      sideComponent={
        <div className="relative w-full h-full">
          <Image
            src="/experience-side-image.png"
            alt="Illustration"
            fill
            className="brightness-[50%]"
          />

          <CircleImageGradient
            image={{
              src: '/experience-first-image.png',
              alt: 'Illustration',
            }}
          />
        </div>
      }
    >
      <p>Experience</p>
    </Layout>
  );
};

export default Experience;
