import { QueryClient, QueryClientProvider } from 'react-query';

import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Lato } from '@next/font/google';
import type { AppProps } from 'next/app';

import '../globals.css';

const queryClient = new QueryClient();

const lato = Lato({
  weight: ['400', '700', '900'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <style jsx global>
          {`
            :root {
              --lato-font: ${lato.style.fontFamily};
            }
          `}
        </style>
        <Component {...pageProps} />
      </UserProvider>
    </QueryClientProvider>
  );
}
