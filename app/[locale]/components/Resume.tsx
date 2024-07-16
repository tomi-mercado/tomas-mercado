import MarkedHighlightText from 'components/MarkedHighlightText';
import SectionContainer from 'components/SectionContainer';
import { HomeContent } from 'utils/content/homeContentValidation';

const Resume = async ({ title, description, cta }: HomeContent['resume']) => {
  return (
    <SectionContainer>
      <h3 className="text-3xl">
        <MarkedHighlightText>{title}</MarkedHighlightText>
      </h3>

      <p>{description}</p>

      <a
        href="https://tomas-mercado-resume.tiiny.site"
        className="btn btn-primary mt-6"
        target="_blank"
        rel="noopener noreferrer"
      >
        {cta}
      </a>
    </SectionContainer>
  );
};

export default Resume;
