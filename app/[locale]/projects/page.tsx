import Actions, { DesktopActions } from 'components/Projects/Actions';
import Intro from 'components/Projects/Intro';
import ProjectImage from 'components/Projects/ProjectImage';
import ProjectInfo from 'components/Projects/ProjectInfo';
import { ProjectsProvider } from 'contexts/projects';
import readContent from 'services/content';
import { projectsSchema } from 'utils/content/projectsContentValidation';

const Projects = async ({
  params: { locale },
}: {
  params: {
    locale: 'en' | 'es';
  };
}) => {
  const content = await readContent(
    'content/projects.json',
    locale,
    projectsSchema,
  );

  return (
    <ProjectsProvider projects={content.projects}>
      <div className="p-6 flex flex-col flex-1 lg:flex-row lg:flex-0 max-w-6xl self-center gap-6 w-full">
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
              texts={{ getAnotherProject: content.main.getProject }}
            />
          </div>
        </div>
      </div>
    </ProjectsProvider>
  );
};

export default Projects;
