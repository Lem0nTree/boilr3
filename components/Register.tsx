// /components/Register.tsx

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { registerUser } from '@/utils/api';
import { UserData } from '@/types';

interface RegisterProps {
  onRegisterSuccess: (userData: UserData) => void;
}

export default function Register({ onRegisterSuccess }: RegisterProps) {
  const [inviteCode, setInviteCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!address) throw new Error("Wallet not connected");
      const userData = await registerUser(address, inviteCode);
      onRegisterSuccess(userData);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
          placeholder="Enter invite code"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}