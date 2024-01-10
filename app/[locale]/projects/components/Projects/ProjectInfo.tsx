'use client';

import { useProjects } from 'contexts/projects';
import { twMerge } from 'tailwind-merge';

import React from 'react';

const ProjectInfo: React.FC<{
  className?: string;
  texts: {
    getProject: string;
    waitingProject: string;
  };
}> = ({ texts: { getProject, waitingProject }, className }) => {
  const { selectedProject, handleChangeProject, status } = useProjects();

  return (
    <div
      className={twMerge(
        'text-center w-full flex-1 flex items-center justify-center bg-base-300 p-4 rounded-md my-4',
        className,
      )}
    >
      {status === 'idle' ? (
        <button className="btn btn-primary" onClick={handleChangeProject}>
          {getProject} 🎲
        </button>
      ) : status === 'projectSelected' && selectedProject ? (
        <div className="flex flex-col gap-2 text-left">
          <p className="text-xl">{selectedProject.title}</p>
          <p>{selectedProject.description}</p>
        </div>
      ) : null}
      {status === 'loading' && (
        <div className="flex flex-col gap-4 items-center w-80">
          <p className="text-lg">{waitingProject}</p>
          <span className="loading loading-spinner w-12"></span>
        </div>
      )}
    </div>
  );
};

export default ProjectInfo;
