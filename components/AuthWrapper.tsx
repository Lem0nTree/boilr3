import { ReactNode, useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';

interface AuthWrapperProps {
  children: ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const { isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isConnected && router.pathname !== '/') {
      router.push('/');
    }
  }, [isConnected, mounted, router]);

  if (!mounted) return null;

  return <>{children}</>;
}