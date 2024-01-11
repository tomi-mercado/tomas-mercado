import LinkMantainLocale from 'components/LinkMantainLocale';
import SectionContainer from 'components/SectionContainer';
import UnderlinedText from 'components/UnderlinedText';
import { HomeContent } from 'utils/content/homeContentValidation';

const BlogSection = async ({
  title,
  description,
  CTA,
}: HomeContent['blog']) => {
  return (
    <SectionContainer className="text-center">
      <UnderlinedText className="text-3xl">{title}</UnderlinedText>
      <p>{description}</p>
      <LinkMantainLocale href="/blog" className="btn btn-primary">
        {CTA}
      </LinkMantainLocale>
    </SectionContainer>
  );
};

export default BlogSection;
