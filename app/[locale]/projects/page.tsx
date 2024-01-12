import Actions, {
  DesktopActions,
} from 'app/[locale]/projects/components/Projects/Actions';
import Intro from 'app/[locale]/projects/components/Projects/Intro';
import ProjectImage from 'app/[locale]/projects/components/Projects/ProjectImage';
import ProjectInfo from 'app/[locale]/projects/components/Projects/ProjectInfo';
import { ProjectsProvider } from 'contexts/projects';
import readContent from 'services/content';
import { projectsSchema } from 'utils/content/projectsContentValidation';
import { Locale } from 'utils/locales';

import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  return {
    title: {
      en: 'Projects - Tomás Mercado',
      es: 'Proyectos - Tomás Mercado',
    }[params.locale],
  };
}

const Projects = async ({
  params: { locale },
}: {
  params: {
    locale: Locale;
  };
}) => {
  const content = await readContent(
    'content/projects.json',
    locale,
    projectsSchema,
  );

  return (
    <ProjectsProvider projects={content.projects}>
      <div className="p-6 flex flex-col flex-1 lg:flex-row lg:flex-0 container gap-6 w-full">
        {/* Mobile */}
        <div className="flex gap-4 justify-between lg:hidden">
          <ProjectImage viewport="mobile" />
          <Intro
            texts={{
              title: content.main.title,
              description: content.main.description,
            }}
          />
        </div>
        <ProjectInfo
          texts={{
            getProject: content.main.getProject,
            waitingProject: content.main.waitingProject,
          }}
          className="lg:hidden"
        />
        <Actions
          texts={{
            getAnotherProject: content.main.getAnotherProject,
            notOpenSource: content.main.notOpenSource,
          }}
          className="lg:hidden flex-col"
        />

        {/* Desktop */}
        <ProjectImage viewport="desktop" />
        <div className="hidden lg:flex flex-1 w-1/2">
          <div className="w-full flex flex-col gap-2 py-10">
            <Intro
              texts={{
                title: content.main.title,
                description: content.main.description,
              }}
            />
            <ProjectInfo
              texts={{
                getProject: content.main.getProject,
                waitingProject: content.main.waitingProject,
              }}
            />
            <DesktopActions
              texts={{
                getAnotherProject: content.main.getProject,
                notOpenSource: content.main.notOpenSource,
              }}
            />
          </div>
        </div>
      </div>
    </ProjectsProvider>
  );
};

export default Projects;
