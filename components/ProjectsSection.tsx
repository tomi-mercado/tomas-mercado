import readContent from 'services/content';
import { homeSchema } from 'utils/content/homeContentValidation';

import Link from 'next/link';

import SectionContainer from './SectionContainer';
import UnderlinedText from './UnderlinedText';

interface ProjectsSectionProps {
  locale: 'en' | 'es';
}

const ProjectsSection = async ({ locale }: ProjectsSectionProps) => {
  const {
    projects: { title, description, CTA },
  } = await readContent('content/home.json', locale, homeSchema);

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
