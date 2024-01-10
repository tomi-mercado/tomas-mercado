import SectionContainer from 'components/SectionContainer';
import UnderlinedText from 'components/UnderlinedText';
import { getPosts } from 'services/posts';

import Contact from './components/Contact';
import Introduction from './components/Introduction';
import ProjectsSection from './components/ProjectsSection';
import TombotServer from './components/TomBot';

const Home = async ({
  params: { locale },
}: {
  params: {
    locale: 'en' | 'es';
  };
}) => {
  const posts = await getPosts({ locale });
  const postsAmount = posts.length;

  return (
    <>
      <SectionContainer className="py-12 min-h-[85vh]">
        {/* @ts-expect-error */}
        <Introduction locale={locale} />
        {/* @ts-expect-error */}
        <TombotServer locale={locale} />
      </SectionContainer>
      {/* @ts-expect-error */}
      <ProjectsSection locale={locale} />
      {postsAmount > 0 && (
        <SectionContainer className="text-center">
          <UnderlinedText className="text-3xl">Blog</UnderlinedText>
          <p>
            Experiences, thoughts, explanations and other things about my day to
            day as a developer.
          </p>
          <button className="btn btn-primary">Check out my blog</button>
        </SectionContainer>
      )}
      {/* @ts-expect-error */}
      <Contact locale={locale} />
    </>
  );
};

export default Home;
