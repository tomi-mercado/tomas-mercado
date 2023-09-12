import { useContent } from 'contexts/content';
import { useProjects } from 'contexts/projects';
import { twMerge } from 'tailwind-merge';
import { Project, SideProject } from 'utils/content/projectsContentValidation';

import React from 'react';
import { FaGithub, FaRocket } from 'react-icons/fa';

import Link from 'next/link';

const isSideProject = (project: Project): project is SideProject => {
  return 'githubUrl' in project && !('associatedWith' in project);
};

const Actions: React.FC<{ className?: string }> = ({ className }) => {
  const { selectedProject, handleChangeProject } = useProjects();
  const {
    content: {
      main: { getAnotherProject, notOpenSource },
    },
  } = useContent('Projects');

  return (
    <div
      className={twMerge('flex gap-2 items-center justify-center', className)}
    >
      {selectedProject && (
        <>
          {isSideProject(selectedProject) ? (
            <Link
              target="_blank"
              href={selectedProject.githubUrl}
              className="btn w-full lg:w-auto btn-secondary"
            >
              <FaGithub /> Source code
            </Link>
          ) : (
            <div
              className="tooltip tooltip-bottom tooltip-secondary"
              data-tip={notOpenSource}
            >
              <button className="btn btn-secondary btn-disabled">
                <FaGithub /> Source code
              </button>
            </div>
          )}
          <Link
            target="_blank"
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

export default Actions;
