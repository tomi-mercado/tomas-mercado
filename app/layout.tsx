import replaceYearsExperience from 'utils/replaceYearsExperience';

import { Metadata } from 'next';
import { Lato } from 'next/font/google';

import '../globals.css';

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="tomTheme" className={lato.className}>
      <body className="flex flex-col min-h-screen">{children}</body>
    </html>
  );
}
