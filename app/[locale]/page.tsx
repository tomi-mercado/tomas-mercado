import readContent from 'services/content';
import { getPosts } from 'services/posts';
import { homeSchema } from 'utils/content/homeContentValidation';
import { Locale } from 'utils/locales';

import SectionContainer from '@/components/SectionContainer';
import FlickeringGrid from '@/components/ui/flickering-grid';
import BlogSection from './components/BlogSection';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Introduction from './components/Introduction';
import ProjectsSection from './components/ProjectsSection';
import Resume from './components/Resume';
import TombotServer from './components/TomBot';

const Home = async ({
  params: { locale },
}: {
  params: {
    locale: Locale;
  };
}) => {
  const content = await readContent('content/home.json', locale, homeSchema);
  const posts = await getPosts({ locale });
  const postsAmount = posts.length;

  return (
    <>
      <SectionContainer className="min-h-[85vh] relative -mt-[120px]">
        <FlickeringGrid
          color="#6B7280"
          squareSize={8}
          flickerChance={0.45}
          className="absolute h-full w-full z-[-1]"
          maxOpacity={0.2}
        />
        <Introduction {...content.introduction} />
        <TombotServer locale={locale} />
      </SectionContainer>
      <Experience {...content.experience} locale={locale} />
      <ProjectsSection {...content.projects} />
      {postsAmount > 0 && <BlogSection {...content.blog} />}
      <Contact {...content.contact} />
      <Resume {...content.resume} />
    </>
  );
};

export default Home;
