import Introduction from 'components/Introduction';
import SectionContainer from 'components/SectionContainer';

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
      {/* <TomBot /> */}
    </SectionContainer>
  );
};

export default Home;
