import React from 'react';
import { FaReact } from 'react-icons/fa';
import {
  SiChakraui,
  SiGraphql,
  SiNextdotjs,
  SiStrapi,
  SiTypescript,
} from 'react-icons/si';

import Image from 'next/image';

import classNames from 'classnames';

import { Layout } from '@components';

import {
  ContentProjectWrapper,
  IddleContent,
  ProjectDetail,
  ProjectDetailProps,
  ProjectSide,
  ProjectSideProps,
} from './components';

type Project = ProjectDetailProps & ProjectSideProps;

interface ContentProject {
  title: string;
  description: string;
  iconTitle: string;
  techStack: string;
  mainChallenges: string[];
  images: { alt: string; src: string }[];
}

export interface ProjectsProps {
  backButtonLabel: string;
  techStackTitle: string;
  title: string;
  description: string;
  buttonLabel: string;
  projects: ContentProject[];
}

const techIcons: Record<string, JSX.Element> = {
  react: <FaReact size={36} />,
  graphql: <SiGraphql size={36} />,
  next: <SiNextdotjs size={36} />,
  typescript: <SiTypescript size={36} />,
  chakra: <SiChakraui size={36} />,
  'react-hook-form': <>TODO RHF</>,
  zod: <>TODO ZOD</>,
  strapi: <SiStrapi size={36} />,
};

const Projects: React.FC<ProjectsProps> = ({
  title,
  description,
  projects,
  backButtonLabel,
  buttonLabel,
  techStackTitle,
}) => {
  const [currentProject, setCurrentProject] = React.useState<number | 'iddle'>(
    'iddle',
  );

  const handleShowFirstProject = () => {
    setCurrentProject(0);
  };

  const handleBackToIddle = () => {
    setCurrentProject('iddle');
  };

  const ContentProject = {
    iddle: (
      <IddleContent
        title={title}
        description={description}
        buttonLabel={buttonLabel}
        onClick={handleShowFirstProject}
      />
    ),
    ...Object.entries(projects).reduce((acc, [index, project]) => {
      const iconTitle = (
        <Image
          src={project.iconTitle}
          alt={`Icon ${project.iconTitle}`}
          width={36}
          height={36}
          className="object-contain"
        />
      );

      const technologies = project.techStack.split(',');
      const techStackIcons = technologies.map((tech) => {
        return techIcons[tech];
      });

      return {
        ...acc,
        [index]: (
          <ProjectDetail
            key={`project-detail-${index}`}
            title={project.title}
            icon={iconTitle}
            description={project.description}
            techStack={{
              title: techStackTitle,
              icons: techStackIcons,
            }}
            mainChallenges={{
              title: techStackTitle,
              items: project.mainChallenges,
            }}
          />
        ),
      };
    }, {}),
  }[currentProject];

  const sideComponents = projects.map((project, index) => (
    <div
      key={`project-side-${index}`}
      className={classNames([
        'transition-opacity ease-in-out duration-500 h-full absolute w-full',
        {
          'opacity-0': currentProject !== index,
          'opacity-100': currentProject === index,
        },
      ])}
    >
      <ProjectSide images={project.images as ProjectSideProps['images']} />
    </div>
  ));

  return (
    <Layout
      id="projects"
      image={
        currentProject === 'iddle'
          ? {
              alt: 'Illustration',
              src: '/projects-side-image.png',
            }
          : undefined
      }
      sideComponent={currentProject === 'iddle' ? undefined : sideComponents}
      screenPosition="left"
      contentWrapper={{
        className: 'bg-gradient-to-b from-[#f2c0a1e8] to-[#d1d1c3]',
      }}
      navbar={{
        className:
          'bg-gradient-to-l from-[#f2c0a1e8] to-[#d1d1c3] hidden lg:flex',
      }}
    >
      <ContentProjectWrapper
        backButtonLabel={backButtonLabel}
        totalProjects={projects.length}
        currentProject={currentProject}
        onNextProject={() => {
          if (currentProject === 'iddle') {
            handleShowFirstProject();
          } else if (currentProject < projects.length - 1) {
            setCurrentProject(currentProject + 1);
          }
        }}
        onPreviousProject={() => {
          if (currentProject === 'iddle') {
            setCurrentProject(projects.length - 1);
          } else if (currentProject > 0) {
            setCurrentProject(currentProject - 1);
          }
        }}
        onBackToIddle={handleBackToIddle}
      >
        {ContentProject}
      </ContentProjectWrapper>
    </Layout>
  );
};

export default Projects;
