import { Button } from '@/components/ui/button';
import LinkMantainLocale from 'components/LinkMantainLocale';
import MarkedHighlightText from 'components/MarkedHighlightText';
import SectionContainer from 'components/SectionContainer';
import { HomeContent } from 'utils/content/homeContentValidation';

const BlogSection = async ({
  title,
  description,
  CTA,
}: HomeContent['blog']) => {
  return (
    <SectionContainer className="text-center">
      <MarkedHighlightText className="text-3xl">{title}</MarkedHighlightText>
      <p>{description}</p>
      <Button asChild size="lg" className="mt-2">
        <LinkMantainLocale href="/blog">{CTA}</LinkMantainLocale>
      </Button>
    </SectionContainer>
  );
};

export default BlogSection;
