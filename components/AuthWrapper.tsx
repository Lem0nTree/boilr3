import { ReactNode } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@/components/ConnectButton';

interface AuthWrapperProps {
  children: ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div>
        <h1>Please connect your wallet</h1>
        <ConnectButton />
      </div>
    );
  }

  return <>{children}</>;
}