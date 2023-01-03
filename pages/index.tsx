import React from 'react';

import { Hero, OpacityChangeSections } from '@components';

export default function Home() {
  return (
    <OpacityChangeSections>
      <Hero />
      <div className="h-full w-full bg-black"></div>
    </OpacityChangeSections>
  );
}
