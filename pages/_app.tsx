import type { AppProps } from 'next/app';
import Web3Provider from '@/providers/Web3';
import { SEO } from '@/components/layout';
import AuthWrapper from '@/components/AuthWrapper';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <SEO />
      <AuthWrapper>
        <Component {...pageProps} />
      </AuthWrapper>
    </Web3Provider>
  );
}