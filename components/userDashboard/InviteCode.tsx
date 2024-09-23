import { useState, useEffect } from 'react';
import { UserData } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Share2 } from 'lucide-react';
import { toast } from 'react-toastify';
import Head from 'next/head';

interface InviteCodeProps {
  userData: UserData;
}

export const InviteCode = ({ userData }: InviteCodeProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const [inviteLink, setInviteLink] = useState('');
  const [inviteImageUrl, setInviteImageUrl] = useState('');

  useEffect(() => {
    setInviteLink(`${window.location.origin}?invite=${userData.invitationCode}`);
    setInviteImageUrl(`${window.location.origin}/api/generate-invite-image?inviteCode=${userData.invitationCode}`);
  }, [userData.invitationCode]);

  const tweetMessages = [
    `🚀 Ready for the next moonshot? 🌕 Join me on AsteroNEO and let's conquer the NEOX chain together! 💸 Use my invite code: ${userData.invitationCode} and start stacking rewards! 👇🔥`,
    `💥 Degen alert! 💎💼 Massive $NEOX airdrop on AsteroNEO! 🪂 Don't miss out, use my invite code: ${userData.invitationCode} to get in early! 🚨 Let's ride this wave to the moon! 🚀`,
    `⚠️ Huge airdrop incoming! 🪂 The NEOX chain is blowing up, and I'm already in! 💰 Use my invite code: ${userData.invitationCode} to join the party and stack some free tokens! 🌍💣`,
    `👀 Heard about AsteroNEO yet? 🌟 Biggest degen airdrop on $NEOX happening NOW! 🤑💸 Don't sleep on this, grab your spot with my code: ${userData.invitationCode} 🚀🚀 Let's bag these rewards!`,
    `🔥 Airdrop season is HERE! 🪂 Join me on AsteroNEO before it's too late! ⏳ Use my code: ${userData.invitationCode} and let's get that $NEOX treasure 💰✨ Early degens, this is your chance! 🔥`
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setIsCopied(true);
      toast.success('Invite link copied to clipboard!');
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy invite link');
    }
  };

  const shareOnTwitter = () => {
    const randomTweet = tweetMessages[Math.floor(Math.random() * tweetMessages.length)];
    const tweetText = encodeURIComponent(randomTweet);
    const tweetUrl = encodeURIComponent(inviteLink);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AsteroNEO" />
        <meta name="twitter:title" content="Join AsteroNEO" />
        <meta name="twitter:description" content={`Use invite code ${userData.invitationCode} to join AsteroNEO and earn rewards!`} />
        <meta name="twitter:image" content={inviteImageUrl} />
      </Head>
      <Card className="bg-gray-900 border-gray-800 text-white">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Invite Code</CardTitle>
            <span className="text-sm text-blue-400 font-bold">Earn 10% from referrals!</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              value={userData.invitationCode}
              readOnly
              className="bg-gray-800 border-gray-700 text-white flex-grow text-lg tracking-wide font-medium"
            />
            <Button
              onClick={copyToClipboard}
              variant="outline"
              className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
            >
              {isCopied ? 'Copied!' : <Copy className="h-4 w-4" />}
            </Button>
            <Button
              onClick={shareOnTwitter}
              variant="outline"
              className="bg-blue-500 border-gray-700 hover:bg-blue-600 text-white"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};