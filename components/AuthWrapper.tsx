// /components/AuthWrapper.tsx

import { ReactNode, useState, useEffect } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { useRouter } from 'next/router';
import { fetchUserData } from '@/utils/api';
import { UserData } from '@/types';
import { Navbar } from '@/components/layout';
import React from 'react';

interface AuthWrapperProps {
  children: ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const router = useRouter();

  useEffect(() => {
    async function checkUserStatus() {
      if (isConnected && address) {
        try {
          const data = await fetchUserData(address);
          setUserData(data);
          setLoading(false);
        } catch (error) {
          if (error instanceof Error && error.message.includes('404')) {
            setUserData(null);
          }
          setLoading(false);
        }
      } else {
        setUserData(null);
        setLoading(false);
      }
    }

    checkUserStatus();
  }, [isConnected, address, chain]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { userData, loading });
          }
          return child;
        })}
      </main>
    </div>
  );
}