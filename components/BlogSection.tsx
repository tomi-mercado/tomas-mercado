import readContent from 'services/content';
import { homeSchema } from 'utils/content/homeContentValidation';

import SectionContainer from './SectionContainer';
import UnderlinedText from './UnderlinedText';

const BlogSection = async ({ locale }: { locale: 'en' | 'es' }) => {
  const {
    blog: { title, description, CTA },
  } = await readContent('content/home.json', locale, homeSchema);
  return (
    <SectionContainer className="text-center">
      <UnderlinedText className="text-3xl">{title}</UnderlinedText>
      <p>
        {/*  */}
        {description}
      </p>
      <button className="btn btn-primary">{CTA}</button>
    </SectionContainer>
  );
};

export default BlogSection;
