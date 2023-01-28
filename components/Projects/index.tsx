import React, { ReactNode } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import classNames from 'classnames';

import { Layout } from '@components';

import {
  ContentProjectWrapper,
  IddleContent,
  ProjectDetail,
  ProjectSide,
  ProjectSideProps,
} from './components';

interface ContentProject {
  title: string;
  description: string;
  iconTitle: string;
  images: { alt: string; src: string }[];
  url: string;
}

export interface ProjectsProps {
  backButtonLabel: string;
  title: string;
  description: string;
  buttonLabel: string;
  projects: ContentProject[];
  meetButtonLabel: string;
  nextProjectButtonLabel: string;
  previousProjectButtonLabel: string;
  note: string;
  locale: 'en' | 'es';
}

/**
 * Replace LinkedIn with a link to the LinkedIn profile and the same text
 * Replace Repositories with a link to the Repositories profile and the same text
 * Replace Repositorios with a link to the Repositorios profile and the same text
 */
const parseNote = (note: string): ReactNode => {
  return (
    <>
      {note
        .split(' ')
        .map((word, index) => {
          if (word.includes('LinkedIn')) {
            return (
              <Link
                key={`note-${index}`}
                href="https://www.linkedin.com/in/tomas-mercado"
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: 'underline',
                }}
              >
                {word}
              </Link>
            );
          }

          if (word.includes('Repositories') || word.includes('Repositorios')) {
            return (
              <Link
                key={`note-${index}`}
                href="https://github.com/tomi-mercado/repositories"
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: 'underline',
                }}
              >
                {word}
              </Link>
            );
          }

          return word;
        })
        .map((word, index) => {
          if (index === 0) {
            return word;
          }

          if (typeof word === 'string') {
            return <span key={`note-${index}`}> {word} </span>;
          }

          return word;
        })}
    </>
  );
};

const Projects: React.FC<ProjectsProps> = ({
  title,
  description,
  projects,
  backButtonLabel,
  buttonLabel,
  meetButtonLabel,
  nextProjectButtonLabel,
  previousProjectButtonLabel,
  note,
  locale,
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
      const { iconTitle: iconTitleProject } = project;

      const iconTitle = iconTitleProject ? (
        <Image
          src={iconTitleProject}
          alt={`Icon ${iconTitleProject}`}
          width={36}
          height={36}
          className="object-contain"
        />
      ) : null;

      return {
        ...acc,
        [index]: (
          <ProjectDetail
            key={`project-detail-${index}`}
            meetButtonLabel={meetButtonLabel}
            icon={iconTitle}
            {...project}
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
      locale={locale}
    >
      <ContentProjectWrapper
        buttonLabels={{
          backToIddle: backButtonLabel,
          nextProject: nextProjectButtonLabel,
          previousProject: previousProjectButtonLabel,
        }}
        totalProjects={projects.length}
        currentProject={currentProject}
        aclaration={parseNote(note)}
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
