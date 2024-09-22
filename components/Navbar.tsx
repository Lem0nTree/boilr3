import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-xl font-bold">AsteroNEO</span>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link href="#" className="hover:text-gray-300 transition-colors">Docs</Link>
          <Link href="#" className="hover:text-gray-300 transition-colors">Transparency</Link>
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
}