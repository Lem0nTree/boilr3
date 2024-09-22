// /components/dashboard/InviteCode.tsx

interface InviteCodeProps {
    inviteCode: string;
  }
  
  export const InviteCode = ({ inviteCode }: InviteCodeProps) => {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Your Invite Code</h2>
        <p className="text-2xl font-mono bg-gray-100 p-2 rounded">{inviteCode}</p>
      </div>
    );
  };