import type { AppProps } from 'next/app';
import Web3Provider from '@/providers/Web3';
import { SEO } from '@/components/layout';
import Navbar from '@/components/Navbar';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <SEO />
      <Navbar />
      <Component {...pageProps} />
    </Web3Provider>
  );
}