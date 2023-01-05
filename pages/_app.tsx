import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { Lato } from '@next/font/google';
import type { AppProps } from 'next/app';

import '../globals.css';

const lato = Lato({
  weight: ['400', '700', '900'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --lato-font: ${lato.style.fontFamily};
          }
        `}
      </style>
      <Component {...pageProps} />
    </>
  );
}
