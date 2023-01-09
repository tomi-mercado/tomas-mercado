import { PropsWithChildren } from 'react';

import {
  About,
  Experience,
  Hero,
  OpacityChangeSections,
  Projects,
} from '@components';

const HomeContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className="hidden lg:block">
        <OpacityChangeSections>{children}</OpacityChangeSections>
      </div>
      <div className="block lg:hidden">{children}</div>
    </>
  );
};

export default function Home() {
  return (
    <HomeContainer>
      <Hero />
      <Projects />
      <Experience />
      <About />
    </HomeContainer>
  );
}
