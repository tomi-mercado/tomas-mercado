import Introduction from 'components/Introduction';
import SectionContainer from 'components/SectionContainer';
import Tombot from 'components/TomBot';

const Home = async ({
  params: { locale },
}: {
  params: {
    locale: 'en' | 'es';
  };
}) => {
  return (
    <SectionContainer className="py-12 min-h-[85vh]">
      {/* @ts-expect-error */}
      <Introduction locale={locale} />
      {/* @ts-expect-error */}
      <Tombot locale={locale} />
    </SectionContainer>
  );
};

export default Home;
