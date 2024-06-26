import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import Providers from 'components/Providers';
import readContent from 'services/content';
import { homeSchema } from 'utils/content/homeContentValidation';
import { Locale } from 'utils/locales';
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
  params: { locale: Locale };
}): Promise<Metadata> {
  return {
    title: 'Tomás Mercado',
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
    locale: Locale;
  };
}) {
  const content = await readContent('content/home.json', locale, homeSchema);

  return (
    <html lang={locale} data-theme="tomTheme" className={lato.className}>
      <body className="flex flex-col min-h-screen">
        <Providers content={content} locale={locale}>
          <Navbar locale={locale} />
          <div className="flex flex-col grow pt-[64px]">{children}</div>
          <Footer locale={locale} />
        </Providers>
      </body>
    </html>
  );
}
