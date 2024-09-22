import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import Web3Provider from '@/providers/Web3';
import { SEO } from '@/components/layout';
import AuthWrapper from '@/components/AuthWrapper';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Web3Provider>
      <SEO />
      {isClient ? (
        <AuthWrapper>
          <Component {...pageProps} />
        </AuthWrapper>
      ) : (
        <div>Loading...</div>
      )}
    </Web3Provider>
  );
}