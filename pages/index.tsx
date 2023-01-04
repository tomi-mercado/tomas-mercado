import { Hero, OpacityChangeSections, Projects } from '@components';

export default function Home() {
  return (
    <OpacityChangeSections>
      <Hero />
      <Projects />
    </OpacityChangeSections>
  );
}
