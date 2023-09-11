import { useProjects } from 'contexts/projects';
import { twMerge } from 'tailwind-merge';
import { Project } from 'utils/content/projectsContentValidation';

import React, { useEffect, useState } from 'react';
import { FaToolbox } from 'react-icons/fa';

import Image from 'next/image';

const getRandomProjectImage = (projects: Project[]) => {
  return projects.sort(() => Math.random() - 0.5)[0].images.icon;
};

interface IconProps {
  image: Project['images']['icon'];
  className?: string;
}

const Icon: React.FC<IconProps> = ({ image, className }) => {
  if (!image.isImage) {
    return <p className={twMerge('text-6xl', className)}>{image.content}</p>;
  }

  return (
    <Image
      src={image.content}
      alt="Project image"
      width={60}
      height={60}
      className={twMerge('rounded-full', className)}
    />
  );
};

const Circle: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div
      className={twMerge(
        'bg-neutral-content text-secondary text-6xl rounded-full w-48 h-48 flex justify-center items-center border-4 border-primary relative',
        className,
      )}
    >
      {children}
    </div>
  );
};

const ProjectImage: React.FC<{
  className?: string;
  viewport: 'mobile' | 'desktop';
}> = ({ className, viewport }) => {
  const { status, projects, selectedProject } = useProjects();

  const [randomProjectImage, setRandomProjectImage] = useState(
    getRandomProjectImage(projects),
  );

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (status === 'loading') {
      interval = setInterval(() => {
        setRandomProjectImage(getRandomProjectImage(projects));
      }, 10);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [projects, status]);

  if (viewport === 'mobile') {
    const imageToRender = {
      idle: null,
      loading: randomProjectImage,
      projectSelected: selectedProject ? selectedProject.images.icon : null,
    }[status];

    return (
      <Circle className="shrink-0 w-28 h-28 bg-secondary text-neutral-content border-neutral-content">
        {imageToRender ? (
          <Icon image={imageToRender} />
        ) : (
          <FaToolbox className="text-6xl" />
        )}
      </Circle>
    );
  }

  return (
    <div
      className={twMerge(
        'hidden lg:flex flex-1 w-1/2 bg-secondary rounded-md justify-center items-center relative',
        className,
      )}
    >
      {status === 'idle' && (
        <Circle>
          <FaToolbox />
        </Circle>
      )}

      {status === 'loading' && (
        <Circle>
          <Icon image={randomProjectImage} />
        </Circle>
      )}

      {status === 'projectSelected' && selectedProject && (
        <>
          {projects.map((project, i) => (
            <Image
              key={`${project.title}-${i}`}
              src={project.images.appImage.content}
              alt={project.title}
              fill
              className="absolute object-cover brightness-50 rounded-md animate-left-to-right-and-right-to-left"
              style={{
                opacity: project.title === selectedProject.title ? 1 : 0,
              }}
            />
          ))}
          <Icon image={selectedProject.images.icon} className="absolute" />
        </>
      )}
    </div>
  );
};

export default ProjectImage;
