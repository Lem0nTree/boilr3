// File: components\Register.tsx

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { registerUser } from '@/utils/api';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactCodeInput from 'react-code-input';
import { Twitter, MessageCircle, Hash } from 'lucide-react';

interface RegisterProps {
  onRegisterSuccess: () => void;
}

export default function Register({ onRegisterSuccess }: RegisterProps) {
  const [inviteCode, setInviteCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();
  const [isCodeValid, setIsCodeValid] = useState(true);
  const [waitingNumber, setWaitingNumber] = useState(15331);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaitingNumber(prev => Math.max(0, prev - Math.floor(Math.random() * 10)));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!address) throw new Error("Wallet not connected");
      await registerUser(address, inviteCode);
      toast.success('Registration successful!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      onRegisterSuccess();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred during registration";
      setError(errorMessage);
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setIsCodeValid(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-900 border-gray-800">
          <div className="p-6 space-y-6">
            <div className="text-center">
              <svg className="mx-auto h-24 w-24 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h2 className="mt-6 text-3xl text-white font-extrabold">Welcome to AsteroNEO</h2>
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold text-white">🧑‍🤝‍🧑 You are {waitingNumber} in line</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex justify-center">
                <ReactCodeInput
                  type="text"
                  fields={5}
                  value={inviteCode}
                  onChange={(value) => {
                    setInviteCode(value);
                    if (!isCodeValid) {
                      setIsCodeValid(true);
                    }
                  }}
                  inputMode="numeric"
                  name="invite-code"
                  isValid={isCodeValid}
                  inputStyle={{
                    width: '50px',
                    height: '50px',
                    fontSize: '20px',
                    backgroundColor: 'transparent',
                    border: '1px solid #ffffff30',
                    color: 'white',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    margin: '0 4px',
                  }}
                  inputStyleInvalid={{
                    width: '50px',
                    height: '50px',
                    fontSize: '20px',
                    color: 'white',
                    backgroundColor: 'transparent',
                    border: '1px solid red',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    margin: '0 4px',
                  }}
                />
              </div>
              <Button 
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg disabled:opacity-50"
                disabled={loading || inviteCode.length !== 5}
              >
                {loading ? 'Registering...' : 'Register'}
              </Button>
            </form>
            <div className="text-center text-sm text-gray-400">
              <p>Join our community for updates and invite codes:</p>
              <div className="mt-4 flex justify-center space-x-6">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <MessageCircle className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Hash className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </Card>
      </main>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {/* Background Animation */}
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