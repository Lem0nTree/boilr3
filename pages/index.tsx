"use client"
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Dashboard from '@/components/Dashboard';
import Register from '@/components/Register';
import { useUserData } from '@/hooks/useUserData';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  const { isConnected, address } = useAccount();
  const { userData, leaderboardData, loading, refetchData } = useUserData(address);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (isConnected && loading) {
    return <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>;
  }

  if (isConnected && userData) {
    return <Dashboard userData={userData} leaderboardData={leaderboardData} />;
  }

  if (isConnected && !userData) {
    return <Register onRegisterSuccess={refetchData} />;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <svg className="mx-auto h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h2 className="mt-6 text-3xl font-extrabold">Welcome to AsteroNEO</h2>
            <p className="mt-2 text-gray-400">Connect your wallet to get started</p>
          </div>
          <ConnectButton.Custom>
            {({ openConnectModal }) => (
              <Button 
                onClick={openConnectModal}
                className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              >
                Connect Wallet
              </Button>
            )}
          </ConnectButton.Custom>
          <p className="text-sm text-gray-400">
            Connecting your wallet won't trigger any transactions or use gas.
          </p>
        </div>
      </main>

	<div className="fixed inset-0 -z-10 overflow-hidden">
		<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 to-gray-950"></div>
			<div className="absolute inset-0 opacity-30">
				{[...Array(20)].map((_, i) => (
				<div
					key={i}
					className="background-blur animate-float"
					style={{
					left: `${Math.random() * 100}%`,
					top: `${Math.random() * 100}%`,
					width: `${Math.random() * 300 + 50}px`,
					height: `${Math.random() * 300 + 50}px`,
					backgroundColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
					animationDelay: `${Math.random() * 5}s`,
					}}
				/>
				))}
			</div>
		</div>
	</div>
  );
}