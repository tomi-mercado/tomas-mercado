import React from 'react';
import { FaReact } from 'react-icons/fa';
import { SiGraphql, SiNextdotjs } from 'react-icons/si';

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

const projects: Project[] = [
  {
    icon: (
      <Image
        alt="Utel favicon"
        src="/utel-favicon.ico"
        width={36}
        height={36}
        className="object-contain"
      />
    ),
    title: 'Utel CMS',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum enim voluptate quis, libero dolorum, maxime assumenda ducimus.',
    techStackIcons: [
      <FaReact key="tech-utel-0" className="text-4xl lg:text-5xl" />,
      <SiNextdotjs key="tech-utel-1" className="text-4xl lg:text-5xl" />,
      <SiGraphql key="tech-utel-2" className="text-4xl lg:text-5xl" />,
    ],
    mainChallenges: ['Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum'],
    images: [
      {
        alt: 'Utel CMS Hero',
        src: '/utel-img-1.png',
      },
      {
        alt: 'Utel CMS Search',
        src: '/utel-img-2.png',
      },
      {
        alt: 'Utel CMS Search results',
        src: '/utel-img-3.png',
      },
    ],
  },
  {
    icon: (
      <Image
        alt="Henry favicon"
        src="/henry-favicon.ico"
        width={36}
        height={36}
        className="object-contain"
      />
    ),
    title: 'Henry Landing Page',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum enim voluptate quis, libero dolorum, maxime assumenda ducimus.',
    techStackIcons: [
      <FaReact key="tech-utel-0" className="text-4xl lg:text-5xl" />,
      <SiNextdotjs key="tech-utel-1" className="text-4xl lg:text-5xl" />,
      <SiGraphql key="tech-utel-2" className="text-4xl lg:text-5xl" />,
    ],
    mainChallenges: ['Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum'],
    images: [
      {
        alt: 'Henry Hero',
        src: '/henry-img-1.png',
      },
      {
        alt: 'Henry Press section',
        src: '/henry-img-2.png',
      },
      {
        alt: 'Henry Opinions section',
        src: '/henry-img-3.png',
      },
    ],
  },
];

const Projects: React.FC = () => {
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
    iddle: <IddleContent onClick={handleShowFirstProject} />,
    ...Object.entries(projects).reduce(
      (acc, [index, project]) => ({
        ...acc,
        [index]: (
          <ProjectDetail
            key={`project-detail-${index}`}
            title={project.title}
            icon={project.icon}
            description={project.description}
            techStackIcons={project.techStackIcons}
            mainChallenges={project.mainChallenges}
          />
        ),
      }),
      {},
    ),
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
      <ProjectSide images={project.images} />
    </div>
  ));

  return (
    <Layout
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
