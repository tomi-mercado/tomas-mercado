import SectionContainer from 'components/SectionContainer';
import { getPosts } from 'services/posts';

import BlogSection from './components/BlogSection';
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
      {/* @ts-expect-error */}
      {postsAmount > 0 && <BlogSection locale={locale} />}
      {/* @ts-expect-error */}
      <Contact locale={locale} />
    </>
  );
};

export default Home;
