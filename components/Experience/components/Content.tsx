import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import { Button, Text } from '@components';

export interface ContentProps {
  title: string;
  description: string;
  rightButton?: {
    label: string;
    onClick: () => void;
  };
  leftButton?: {
    label: string;
    onClick: () => void;
  };
}

const Content: React.FC<ContentProps> = ({
  description,
  title,
  leftButton,
  rightButton,
}) => {
  return (
    <div className="px-8 py-4 flex flex-col space-y-8 h-full min-h-[inherit] lg:min-h-fit lg:h-[70%] 2xl:h-[75%] w-full justify-center">
      <div className="flex flex-col space-y-4">
        <Text variant="h3" underline>
          {title}
        </Text>

        <Text>{description}</Text>
      </div>

      <div className="w-full flex justify-between">
        <div>
          {leftButton && (
            <Button
              variant="secondary"
              leftIcon={<FaArrowLeft />}
              className="w-fit"
              onClick={leftButton.onClick}
            >
              {leftButton.label}
            </Button>
          )}
        </div>

        {rightButton && (
          <Button
            variant="secondary"
            rightIcon={<FaArrowRight />}
            className="w-fit"
            onClick={rightButton.onClick}
          >
            {rightButton.label}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Content;
