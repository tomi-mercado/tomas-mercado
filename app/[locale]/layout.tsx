import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import Providers from 'components/Providers';
import readContent from 'services/content';
import { homeSchema } from 'utils/content/homeContentValidation';

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: {
    locale: 'en' | 'es';
  };
}) {
  const content = await readContent('content/home.json', locale, homeSchema);

  return (
    <Providers content={content} locale={locale}>
      {/* @ts-expect-error */}
      <Navbar locale={locale} />
      <div className="flex flex-col grow pt-[64px]">{children}</div>
      {/* @ts-expect-error */}
      <Footer locale={locale} />
    </Providers>
  );
}
