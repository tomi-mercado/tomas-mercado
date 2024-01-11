import LinkMantainLocale from 'components/LinkMantainLocale';
import MarkedHighlightText from 'components/MarkedHighlightText';

import { Lato } from 'next/font/google';
import Image from 'next/image';

const lato = Lato({
  subsets: ['latin-ext'],
  weight: ['400', '700', '900'],
});

export default async function NotFound() {
  return (
    <html lang="en" data-theme="tomTheme" className={lato.className}>
      <body className="flex flex-col min-h-screen">
        <div className="container py-6 flex flex-col gap-4 h-full flex-1">
          <div className="w-full h-full flex flex-col gap-6 items-center flex-1 justify-center">
            <p className="text-3xl text-center">
              We could{' '}
              <MarkedHighlightText>not find the page</MarkedHighlightText>
              <br />
              you were looking for.
            </p>
            <Image
              src="/images/notfound.webp"
              alt="Empty"
              width={350}
              height={350}
              className="rounded-full mix-blend-hard-light"
            />
            <LinkMantainLocale href="/" className="underline">
              Go back to the home page
            </LinkMantainLocale>
          </div>
        </div>
      </body>
    </html>
  );
}
