import PageLayout from 'components/PageLayout';
import Actions from 'components/Projects/Actions';
import Intro from 'components/Projects/Intro';
import ProjectImage from 'components/Projects/ProjectImage';
import ProjectInfo from 'components/Projects/ProjectInfo';
import { ProjectsProvider, useProjects } from 'contexts/projects';
import getContentGetStaticProps, {
  GetPageProps,
} from 'utils/content/getContentGetStaticProps';
import { projectsSchema } from 'utils/content/projectsContentValidation';

import React from 'react';

type ProjectsProps = GetPageProps<typeof projectsSchema>;

const DesktopActions = () => {
  const { selectedProject } = useProjects();

  if (!selectedProject) {
    return null;
  }

  return <Actions className="justify-end" />;
};

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
      <ProjectsProvider projects={content.projects}>
        <div className="p-6 flex flex-col flex-1 lg:flex-row lg:flex-0 max-w-6xl self-center gap-6 w-full">
          {/* Mobile */}
          <div className="flex gap-4 justify-between lg:hidden">
            <ProjectImage viewport="mobile" />
            <Intro />
          </div>
          <ProjectInfo className="lg:hidden" />
          <Actions className="lg:hidden flex-col" />

          {/* Desktop */}
          <ProjectImage viewport="desktop" />
          <div className="hidden lg:flex flex-1 w-1/2">
            <div className="w-full flex flex-col gap-2 py-10">
              <Intro />
              <ProjectInfo />
              <DesktopActions />
            </div>
          </div>
        </div>
      </ProjectsProvider>
    </PageLayout>
  );
};

export const getStaticProps = getContentGetStaticProps(
  'Projects',
  'content/projects.json',
  projectsSchema,
);

export default Projects;
