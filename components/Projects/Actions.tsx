'use client';

import { useProjects } from 'contexts/projects';
import { twMerge } from 'tailwind-merge';
import { Project, SideProject } from 'utils/content/projectsContentValidation';

import React from 'react';
import { FaGithub, FaRocket } from 'react-icons/fa';

import Link from 'next/link';

const isSideProject = (project: Project): project is SideProject => {
  return 'githubUrl' in project && !('associatedWith' in project);
};

const Actions: React.FC<{
  texts: {
    getAnotherProject: string;
  };
  className?: string;
}> = ({ className, texts: { getAnotherProject } }) => {
  const { selectedProject, handleChangeProject } = useProjects();

  return (
    <div
      className={twMerge('flex gap-2 items-center justify-center', className)}
    >
      {selectedProject && (
        <>
          {isSideProject(selectedProject) && (
            <Link
              href={selectedProject.githubUrl}
              className="btn w-full lg:w-auto btn-secondary"
            >
              <FaGithub /> Source code
            </Link>
          )}
          <Link
            href={selectedProject.url}
            className="btn w-full lg:w-auto btn-secondary"
          >
            <FaRocket /> Deploy
          </Link>
          <button
            className="btn w-full lg:w-auto btn-primary"
            onClick={handleChangeProject}
          >
            {getAnotherProject} 🎲
          </button>
        </>
      )}
    </div>
  );
};

export const DesktopActions = ({
  texts,
}: {
  texts: {
    getAnotherProject: string;
  };
}) => {
  const { selectedProject } = useProjects();

  if (!selectedProject) {
    return null;
  }

  return <Actions texts={texts} className="justify-end" />;
};

export default Actions;
