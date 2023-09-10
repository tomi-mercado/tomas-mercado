import { useContent } from 'contexts/content';

import React from 'react';

import Link from 'next/link';

import SectionContainer from './SectionContainer';
import UnderlinedText from './UnderlinedText';

const ProjectsSection: React.FC = () => {
  const {
    content: {
      projects: { title, description, CTA },
    },
  } = useContent();

  return (
    <SectionContainer>
      <h3 className="text-3xl">
        <UnderlinedText>{title}</UnderlinedText>
      </h3>
      <p>{description}</p>
      <Link href="/projects" className="btn btn-primary">
        {CTA}
      </Link>
    </SectionContainer>
  );
};

export default ProjectsSection;
