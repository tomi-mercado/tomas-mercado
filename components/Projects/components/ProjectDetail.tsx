import React from 'react';
import { FaArrowRight, FaGithub } from 'react-icons/fa';

import Link from 'next/link';

import { Button, Text } from '@components';

export interface ProjectDetailProps {
  title: string;
  icon?: React.ReactNode;
  description: string;
  url: string;
  meetButtonLabel: string;
  githubUrl?: string;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({
  title,
  icon,
  description,
  url,
  meetButtonLabel,
  githubUrl,
}) => {
  const baseButtonProps = {
    size: 'xs' as const,
    rightIcon: <FaArrowRight />,
    variant: 'quaternary' as const,
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-2">
        {icon}
        <Text as="h3" variant="h3" underline>
          {title}
        </Text>
      </div>

      <Text>{description}</Text>

      <Link href={url} target="_blank">
        <Button {...baseButtonProps}>
          {meetButtonLabel} {title}
        </Button>

        {githubUrl && (
          <Link href={githubUrl} target="_blank">
            <Button {...baseButtonProps} leftIcon={<FaGithub />}>
              Source code
            </Button>
          </Link>
        )}
      </Link>
    </div>
  );
};

export default ProjectDetail;
