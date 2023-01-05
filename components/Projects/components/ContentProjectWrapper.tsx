import Button from 'components/Button';

import React, { PropsWithChildren } from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';

interface ContentProjectWrapperProps {
  children: React.ReactNode;
  currentProject: number | 'iddle';
  totalProjects: number;
  onNextProject: () => void;
  onPreviousProject: () => void;
}

const ContentProjectWrapper: React.FC<ContentProjectWrapperProps> = ({
  children,
  currentProject,
  totalProjects,
  onNextProject,
  onPreviousProject,
}) => {
  const showNextButton =
    currentProject !== 'iddle' && currentProject < totalProjects - 1;
  const showPreviousButton = currentProject !== 'iddle' && currentProject > 0;

  return (
    <div className="px-6 py-4 flex flex-col space-y-6 h-full justify-center relative">
      {children}

      {showPreviousButton && (
        <button
          className="lg:hidden absolute left-[-16px] top-[25%] cursor-pointer"
          onClick={onPreviousProject}
        >
          <FaArrowCircleLeft size={20} />
        </button>
      )}
      {showNextButton && (
        <button
          className="lg:hidden absolute right-[-16px] top-[25%] cursor-pointer"
          onClick={onNextProject}
        >
          <FaArrowCircleRight size={20} />
        </button>
      )}

      {showPreviousButton && (
        <div
          className="absolute hidden lg:block left-6 bottom-6"
          onClick={onPreviousProject}
        >
          <Button>Previous project</Button>
        </div>
      )}
      {showNextButton && (
        <div
          className="absolute hidden lg:block right-6 bottom-6"
          onClick={onNextProject}
        >
          <Button>Next project</Button>
        </div>
      )}
    </div>
  );
};

export default ContentProjectWrapper;
