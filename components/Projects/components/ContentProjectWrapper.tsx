import React, { ReactNode } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import { Button, Text } from '@components';

interface ContentProjectWrapperProps {
  buttonLabels: {
    nextProject: string;
    previousProject: string;
    backToIddle: string;
  };
  children: React.ReactNode;
  currentProject: number | 'iddle';
  totalProjects: number;
  aclaration: ReactNode;
  onNextProject: () => void;
  onPreviousProject: () => void;
  onBackToIddle: () => void;
}

interface ChangeProjectButtonProps {
  onClick: () => void;
  show: boolean;
  label: string;
}

interface ChangeProjectButtonsProps {
  previousButton: ChangeProjectButtonProps;
  nextButton: ChangeProjectButtonProps;
}

const showNextButton = (
  currentProject: number | 'iddle',
  totalProjects: number,
) => currentProject !== 'iddle' && currentProject < totalProjects - 1;

const showPreviousButton = (currentProject: number | 'iddle') =>
  currentProject !== 'iddle' && currentProject > 0;

const ChangeProjectButtons: React.FC<ChangeProjectButtonsProps> = ({
  nextButton,
  previousButton,
}) => {
  const baseButtonProps = {
    size: 'sm' as const,
    variant: 'tertiary' as const,
  };

  return (
    <div className="w-full justify-between flex space-x-4">
      <div>
        {previousButton.show && (
          <Button
            onClick={previousButton.onClick}
            leftIcon={<FaArrowLeft />}
            {...baseButtonProps}
          >
            {previousButton.label}
          </Button>
        )}
      </div>

      <div>
        {nextButton.show && (
          <Button
            onClick={nextButton.onClick}
            rightIcon={<FaArrowRight />}
            {...baseButtonProps}
          >
            {nextButton.label}
          </Button>
        )}
      </div>
    </div>
  );
};

const ContentProjectWrapper: React.FC<ContentProjectWrapperProps> = ({
  children,
  currentProject,
  totalProjects,
  buttonLabels,
  aclaration,
  onNextProject,
  onPreviousProject,
  onBackToIddle,
}) => {
  const showBackToIddleButton = currentProject !== 'iddle';

  return (
    <div className="px-6 py-4 flex flex-col space-y-2 h-full min-h-[inherit] lg:min-h-fit justify-center relative">
      {showBackToIddleButton && (
        <Button
          leftIcon={<FaArrowLeft />}
          size="xs"
          variant="quaternary"
          onClick={onBackToIddle}
        >
          {buttonLabels.backToIddle}
        </Button>
      )}

      <div className="min-h-[380px] sm:min-h-[220px] lg:min-h-[170px] xl:min-h-[200px]">
        {children}
      </div>

      <ChangeProjectButtons
        previousButton={{
          onClick: onPreviousProject,
          show: showPreviousButton(currentProject),
          label: buttonLabels.previousProject,
        }}
        nextButton={{
          onClick: onNextProject,
          show: showNextButton(currentProject, totalProjects),
          label: buttonLabels.nextProject,
        }}
      />

      <div className="absolute bottom-6 hidden md:block">
        <Text variant="p3">*{aclaration}</Text>
      </div>
    </div>
  );
};

export default ContentProjectWrapper;
