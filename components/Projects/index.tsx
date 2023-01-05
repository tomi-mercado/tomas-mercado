import React from 'react';
import { FaReact } from 'react-icons/fa';
import { SiGraphql, SiNextdotjs } from 'react-icons/si';

import { Layout } from '@components';

import {
  IddleContent,
  ProjectDetail,
  ProjectDetailProps,
  ProjectSide,
  ProjectSideProps,
} from './components';

type Project = ProjectDetailProps & ProjectSideProps;

const projects: Project[] = [
  {
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
];

const Projects: React.FC = () => {
  const [currentProject, setCurrentProject] = React.useState<number | 'iddle'>(
    'iddle',
  );

  const handleShowFirstProject = () => {
    setCurrentProject(0);
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
            description={project.description}
            techStackIcons={project.techStackIcons}
            mainChallenges={project.mainChallenges}
          />
        ),
      }),
      {},
    ),
  }[currentProject];

  const SideComponentProject = {
    iddle: null,
    ...Object.entries(projects).reduce(
      (acc, [index, project]) => ({
        ...acc,
        [index]: (
          <ProjectSide images={project.images} key={`project-side-${index}`} />
        ),
      }),
      {},
    ),
  }[currentProject];

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
      sideComponent={SideComponentProject}
      screenPosition="left"
      contentWrapper={{
        className: 'bg-gradient-to-b from-[#f2c0a1e8] to-[#d1d1c3]',
      }}
      navbar={{
        className: 'bg-gradient-to-l from-[#f2c0a1e8] to-[#d1d1c3]',
      }}
    >
      <div className="px-6 py-4 flex flex-col space-y-6 h-full justify-center">
        {ContentProject}
      </div>
    </Layout>
  );
};

export default Projects;
