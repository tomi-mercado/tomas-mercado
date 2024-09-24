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
      <LinkMantainLocale href="/blog" className="btn btn-primary">
        {CTA}
      </LinkMantainLocale>
    </SectionContainer>
  );
};

export default BlogSection;
