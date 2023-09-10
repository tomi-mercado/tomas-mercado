import Contact from 'components/Contact';
import Introduction from 'components/Introduction';
import PageLayout from 'components/PageLayout';
import ProjectsSection from 'components/ProjectsSection';
import SectionContainer from 'components/SectionContainer';
import TomBot from 'components/TomBot';
import getContentGetStaticProps, {
  GetPageProps,
} from 'utils/content/getContentGetStaticProps';
import { homeSchema } from 'utils/content/homeContentValidation';
import replaceYearsExperience from 'utils/replaceYearsExperience';

import { GetStaticProps, NextPage } from 'next';

type HomeProps = GetPageProps<typeof homeSchema>;

const Home: NextPage<HomeProps> = ({ content, locale }) => {
  const title = 'Tomás Mercado - Developer';
  const description = replaceYearsExperience(
    {
      en: 'Website of Tomás Mercado, Full Stack Developer with more than [yearsExperience] years of experience',
      es: 'Sitio web de Tomás Mercado, Desarrollador Full Stack con más de [yearsExperience] años de experiencia',
    }[locale],
  );

  return (
    <PageLayout
      title={title}
      description={description}
      content={content}
      locale={locale}
    >
      <SectionContainer className="min-h-[90vh]">
        <Introduction />
        <TomBot />
      </SectionContainer>

      <ProjectsSection />

      <Contact />
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> =
  getContentGetStaticProps('Home', 'content/home.json', homeSchema);

export default Home;
