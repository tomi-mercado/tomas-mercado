import React from 'react';
import { FaReact } from 'react-icons/fa';
import { SiGraphql, SiNextdotjs } from 'react-icons/si';

import { Layout } from '@components';

import { IddleContent, ProjectDetail, ProjectSide } from './components';

const Projects: React.FC = () => {
  const [currentProject, setCurrentProject] = React.useState<number | 'iddle'>(
    'iddle',
  );

  const handleShowFirstProject = () => {
    setCurrentProject(0);
  };

  const ContentProject = {
    iddle: <IddleContent onClick={handleShowFirstProject} />,
    0: (
      <ProjectDetail
        title="Utel CMS"
        description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum enim voluptate quis, libero dolorum, maxime assumenda ducimus."
        techStackIcons={[
          <FaReact key="tech-utel-0" className="text-4xl lg:text-5xl" />,
          <SiNextdotjs key="tech-utel-1" className="text-4xl lg:text-5xl" />,
          <SiGraphql key="tech-utel-2" className="text-4xl lg:text-5xl" />,
        ]}
        mainChallenges={['Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum']}
      />
    ),
  }[currentProject];

  const SideComponentProject = {
    iddle: null,
    0: <ProjectSide />,
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
