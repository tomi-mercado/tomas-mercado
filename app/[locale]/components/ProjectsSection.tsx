import LinkMantainLocale from 'components/LinkMantainLocale';
import MarkedHighlightText from 'components/MarkedHighlightText';
import SectionContainer from 'components/SectionContainer';
import readContent from 'services/content';
import { homeSchema } from 'utils/content/homeContentValidation';

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
        <MarkedHighlightText>{title}</MarkedHighlightText>
      </h3>
      <p>{description}</p>
      <LinkMantainLocale href="/projects" className="btn btn-primary">
        {CTA}
      </LinkMantainLocale>
    </SectionContainer>
  );
};

export default ProjectsSection;
