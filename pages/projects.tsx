import PageLayout from 'components/PageLayout';
import { twMerge } from 'tailwind-merge';
import getContentGetStaticProps, {
  GetPageProps,
} from 'utils/content/getContentGetStaticProps';
import { projectsSchema } from 'utils/content/projectsContentValidation';

import React from 'react';

type ProjectsProps = GetPageProps<typeof projectsSchema>;

const Intro = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      <h1 className="text-center w-full text-3xl">Proyectos</h1>
      <p className="text-center w-full">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
    </div>
  );
};

const ProjectInfo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={twMerge(
        'text-center w-full flex-1 flex items-center',
        className,
      )}
    >
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum
        aliquam quam facilis id cumque, alias voluptatibus est facere nisi
        reprehenderit, consequatur vero fugit aut distinctio repellendus
        corrupti dignissimos ut neque.
      </p>
    </div>
  );
};

const Actions: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={twMerge('flex gap-2 items-center justify-center', className)}
    >
      <button className="">Holis</button>
      <button className="">Holis</button>
      <button className="">Holis</button>
    </div>
  );
};

const Projects: React.FC<ProjectsProps> = ({ content, locale }) => {
  const title = {
    en: 'Tomás Mercado - Projects',
    es: 'Tomás Mercado - Proyectos',
  }[locale];
  const description = {
    en: 'Projects section of Tomas Mercado, Full Stack Developer',
    es: 'Sección de proyectos de Tomás Mercado, Desarrollador Full Stack',
  }[locale];

  return (
    <PageLayout
      content={content}
      title={title}
      description={description}
      locale={locale}
    >
      <div className="p-6 flex flex-col flex-1 lg:flex-row lg:flex-0 max-w-6xl self-center lg:gap-6">
        <div className="flex gap-4 justify-between lg:hidden">
          <div className="w-28 h-28 shrink-0 bg-red-500 rounded-full" />
          <Intro />
        </div>

        <ProjectInfo className="lg:hidden" />

        <Actions className="lg:hidden" />

        <div className="hidden lg:flex flex-1 w-1/2 bg-red-500" />
        <div className="hidden lg:flex flex-1 w-1/2">
          <div className="w-full flex flex-col gap-2 py-10">
            <Intro />
            <ProjectInfo />

            <Actions className="justify-end" />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export const getStaticProps = getContentGetStaticProps(
  'Projects',
  'content/projects.json',
  projectsSchema,
);

export default Projects;
