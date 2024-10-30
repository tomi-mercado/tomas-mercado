import { Button } from '@/components/ui/button';
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

      <Button asChild size="lg" className="mt-6">
        <a
          href="https://tomas-mercado-resume.tiiny.site"
          target="_blank"
          rel="noopener noreferrer"
        >
          {cta}
        </a>
      </Button>
    </SectionContainer>
  );
};

export default Resume;
