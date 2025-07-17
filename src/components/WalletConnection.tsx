
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Wallet, Check, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

interface WalletConnectionProps {
  onConnect: (connected: boolean) => void;
}

const WalletConnection: React.FC<WalletConnectionProps> = ({ onConnect }) => {
  const { connected, publicKey, disconnect } = useWallet();
  const { toast } = useToast();

  useEffect(() => {
    onConnect(connected);
    
    if (connected) {
      toast({
        title: "Wallet Connected! 🚀",
        description: "Welcome to Meme Warrior! Start earning XP now.",
      });
    }
  }, [connected, onConnect]);

  const copyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toString());
      toast({
        title: "Address Copied!",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  const handleDisconnect = async () => {
    await disconnect();
    toast({
      title: "Wallet Disconnected",
      description: "Come back soon, warrior!",
    });
  };

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (connected && publicKey) {
    return (
      <Card className="bg-card-gradient border-green-800/30 glow-blue">
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <div>
                <div className="text-sm font-medium text-green-400">Connected</div>
                <div className="text-xs text-muted-foreground">
                  {formatAddress(publicKey.toString())}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={copyAddress}
                className="hover:bg-purple-800/20"
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleDisconnect}
                className="border-red-800/30 text-red-400 hover:bg-red-800/20"
              >
                Disconnect
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <WalletMultiButton className="bg-crypto-gradient hover:glow-purple hover-scale" />
  );
};

export default WalletConnection;
