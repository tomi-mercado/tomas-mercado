import SectionContainer from 'components/SectionContainer';
import readContent from 'services/content';
import { getPosts } from 'services/posts';
import { homeSchema } from 'utils/content/homeContentValidation';

import BlogSection from './components/BlogSection';
import Contact from './components/Contact';
import Experience from './components/Experience';
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
  const content = await readContent('content/home.json', locale, homeSchema);
  const posts = await getPosts({ locale });
  const postsAmount = posts.length;

  return (
    <>
      <SectionContainer className="py-12 min-h-[85vh]">
        <Introduction {...content.introduction} />
        <TombotServer locale={locale} />
      </SectionContainer>
      <Experience {...content.experience} locale={locale} />
      <ProjectsSection {...content.projects} />
      {postsAmount > 0 && <BlogSection {...content.blog} />}
      <Contact {...content.contact} />
    </>
  );
};

export default Home;
