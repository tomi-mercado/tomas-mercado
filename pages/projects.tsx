import PageLayout from 'components/PageLayout';
import getContentGetStaticProps, {
  GetPageProps,
} from 'utils/content/getContentGetStaticProps';
import { projectsSchema } from 'utils/content/projectsContentValidation';

import React from 'react';

type ProjectsProps = GetPageProps<typeof projectsSchema>;

const Projects: React.FC<ProjectsProps> = ({ content, locale }) => {
  const title = {
    en: 'Tomás Mercado - Projects',
    es: 'Tomás Mercado - Proyectos',
  }[locale];
  const description = {
    en: 'Projects section of Tomas Mercado, Full Stack Developer',
    es: 'Sección de proyectos de Tomás Mercado, Desarrollador Full Stack',
  }[locale];

  return (
    <PageLayout
      content={content}
      title={title}
      description={description}
      locale={locale}
    >
      {content.title}
    </PageLayout>
  );
};

export const getStaticProps = getContentGetStaticProps(
  'Projects',
  'content/projects.json',
  projectsSchema,
);

export default Projects;
