import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import Providers from 'components/Providers';
import readContent from 'services/content';
import { homeSchema } from 'utils/content/homeContentValidation';
import replaceYearsExperience from 'utils/replaceYearsExperience';

import { Metadata } from 'next';
import { Lato } from 'next/font/google';

const lato = Lato({
  subsets: ['latin-ext'],
  weight: ['400', '700', '900'],
});

export async function generateMetadata({
  params,
}: {
  params: { locale: 'en' | 'es' };
}): Promise<Metadata> {
  return {
    title: 'Tomás Mercado - Developer',
    description: replaceYearsExperience(
      {
        en: `Website of Tomás Mercado, Full Stack Developer with more than [yearsExperience] years of experience`,
        es: `Sitio web de Tomás Mercado, Desarrollador Full Stack con más de [yearsExperience] años de experiencia`,
      }[params.locale],
    ),
  };
}

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
    <html data-theme="tomTheme" className={lato.className}>
      <body className="flex flex-col min-h-screen">
        <Providers content={content} locale={locale}>
          {/* @ts-expect-error */}
          <Navbar locale={locale} />
          <div className="flex flex-col grow pt-[64px]">{children}</div>
          {/* @ts-expect-error */}
          <Footer locale={locale} />
        </Providers>
      </body>
    </html>
  );
}
