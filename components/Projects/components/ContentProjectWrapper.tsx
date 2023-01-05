import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import { Button, IconButton, Text } from '@components';

interface ContentProjectWrapperProps {
  children: React.ReactNode;
  currentProject: number | 'iddle';
  totalProjects: number;
  onNextProject: () => void;
  onPreviousProject: () => void;
  onBackToIddle: () => void;
}

interface ChangeProjectButtonsProps {
  previousButton: {
    onClick: () => void;
    show: boolean;
  };
  nextButton: {
    onClick: () => void;
    show: boolean;
  };
}

const showNextButton = (
  currentProject: number | 'iddle',
  totalProjects: number,
) => currentProject !== 'iddle' && currentProject < totalProjects - 1;

const showPreviousButton = (currentProject: number | 'iddle') =>
  currentProject !== 'iddle' && currentProject > 0;

const MobileChangeProjectButtons: React.FC<ChangeProjectButtonsProps> = ({
  nextButton,
  previousButton,
}) => {
  return (
    <>
      {previousButton.show && (
        <div className="lg:hidden absolute left-[-16px] top-[25%]">
          <IconButton
            icon={<FaArrowLeft />}
            onClick={previousButton.onClick}
            size="sm"
            rounded
            variant="primary"
          />
        </div>
      )}

      {nextButton.show && (
        <div className="lg:hidden absolute right-[-16px] top-[25%]">
          <IconButton
            icon={<FaArrowRight />}
            onClick={nextButton.onClick}
            size="sm"
            rounded
            variant="primary"
          />
        </div>
      )}
    </>
  );
};

const DesktopChangeProjectButtons: React.FC<ChangeProjectButtonsProps> = ({
  nextButton,
  previousButton,
}) => {
  return (
    <div className="w-full justify-between hidden lg:flex">
      <div>
        {previousButton.show && (
          <div onClick={previousButton.onClick}>
            <Button>Previous project</Button>
          </div>
        )}
      </div>

      <div>
        {nextButton.show && (
          <div onClick={nextButton.onClick}>
            <Button>Next project</Button>
          </div>
        )}
      </div>
    </div>
  );
};

const ContentProjectWrapper: React.FC<ContentProjectWrapperProps> = ({
  children,
  currentProject,
  totalProjects,
  onNextProject,
  onPreviousProject,
  onBackToIddle,
}) => {
  const showBackToIddleButton = currentProject !== 'iddle';

  return (
    <div className="px-6 py-4 flex flex-col space-y-2 h-full justify-center relative">
      {showBackToIddleButton && (
        <Button
          leftIcon={<FaArrowLeft />}
          size="xs"
          variant="quaternary"
          onClick={onBackToIddle}
        >
          Back to projects
        </Button>
      )}

      {children}

      <MobileChangeProjectButtons
        previousButton={{
          onClick: onPreviousProject,
          show: showPreviousButton(currentProject),
        }}
        nextButton={{
          onClick: onNextProject,
          show: showNextButton(currentProject, totalProjects),
        }}
      />

      <DesktopChangeProjectButtons
        previousButton={{
          onClick: onPreviousProject,
          show: showPreviousButton(currentProject),
        }}
        nextButton={{
          onClick: onNextProject,
          show: showNextButton(currentProject, totalProjects),
        }}
      />
    </div>
  );
};

export default ContentProjectWrapper;
