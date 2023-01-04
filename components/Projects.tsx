import React from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';

import { Button, Layout, Text } from '@components';

interface IddleContentProps {
  onClick: () => void;
}

const IddleContent: React.FC<IddleContentProps> = ({ onClick }) => {
  return (
    <>
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col w-fit">
          <Text as="h3" variant="h3">
            Projects
          </Text>
          <div className="h-[2.5px] bg-black w-full"></div>
        </div>

        <Text>
          In this section, you will find a selection of my most notable web
          development projects. Each project showcases my ability to create
          visually stunning, user-friendly websites and web applications that
          meet the needs of my clients and users.
        </Text>
      </div>

      <div className="flex justify-end">
        <Button rightIcon={<AiOutlineArrowRight />} onClick={onClick}>
          See my projects
        </Button>
      </div>
    </>
  );
};

const Projects: React.FC = () => {
  const [currentProject, setCurrentProject] = React.useState<number | 'iddle'>(
    'iddle',
  );

  const handleShowFirstProject = () => {
    setCurrentProject(0);
  };

  const ContentProject = {
    iddle: <IddleContent onClick={handleShowFirstProject} />,
  }[currentProject];

  const SideComponentProject = {
    iddle: null,
    0: <div>holis</div>,
  }[currentProject];

  return (
    <Layout
      image={{
        alt: 'Illustration',
        src: '/projects-side-image.png',
        screenPosition: 'left',
      }}
      sideComponent={SideComponentProject}
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
