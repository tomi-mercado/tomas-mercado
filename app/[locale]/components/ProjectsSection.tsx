import LinkMantainLocale from 'components/LinkMantainLocale';
import MarkedHighlightText from 'components/MarkedHighlightText';
import SectionContainer from 'components/SectionContainer';
import { HomeContent } from 'utils/content/homeContentValidation';

const ProjectsSection = async ({
  title,
  description,
  CTA,
}: HomeContent['projects']) => {
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
