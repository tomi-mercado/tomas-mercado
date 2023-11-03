'use client';

import { Project } from 'utils/content/projectsContentValidation';

import React, { createContext, useContext, useRef, useState } from 'react';

interface ProjectsContextProps {
  selectedProject: Project | null;
  status: ProjectsStatus;
  projects: Project[];
  handleChangeProject: () => void;
}

interface ProjectsProviderProps {
  children: React.ReactNode;
  projects: Project[];
}

type ProjectsStatus = 'idle' | 'loading' | 'projectSelected';

const ProjectsContext = createContext<ProjectsContextProps | null>(null);

const TIME_TO_CHANGE_PROJECT = 2500;

export const ProjectsProvider: React.FC<ProjectsProviderProps> = ({
  children,
  projects,
}) => {
  const [status, setStatus] = useState<ProjectsStatus>('idle');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const showedProjects = useRef<Project[]>([]);

  const handleChangeProject = () => {
    setStatus('loading');

    if (showedProjects.current.length === projects.length) {
      showedProjects.current = [];
    }

    const randomProjectDifferentFromSelected = projects
      .filter(
        (project) =>
          !showedProjects.current.some(
            (_project) => _project.title === project.title,
          ),
      )
      .sort(() => Math.random() - 0.5)[0];
    showedProjects.current.push(randomProjectDifferentFromSelected);

    setTimeout(() => {
      setSelectedProject(randomProjectDifferentFromSelected);
      setStatus('projectSelected');
    }, TIME_TO_CHANGE_PROJECT);
  };

  return (
    <ProjectsContext.Provider
      value={{
        selectedProject,
        status,
        projects,
        handleChangeProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);

  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }

  return context;
};
