
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Gift, Flame } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '@solana/wallet-adapter-react';
import { performDailyCheckIn } from '@/lib/user-data';
import { useUser } from '@/lib/UserContext';

interface DailyCheckInProps {
  onCheckIn: () => void;
}

const DailyCheckIn: React.FC<DailyCheckInProps> = ({ onCheckIn }) => {
  const { publicKey } = useWallet();
  const { userData, refreshUserData } = useUser();
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (userData?.lastCheckIn) {
      const lastCheckIn = new Date(userData.lastCheckIn).toDateString();
      const today = new Date().toDateString();
      setHasCheckedIn(lastCheckIn === today);
    } else {
      setHasCheckedIn(false);
    }
  }, [userData]);

  const handleCheckIn = async () => {
    if (!publicKey) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to check in",
        variant: "destructive"
      });
      return;
    }

    setIsChecking(true);
    
    try {
      const result = performDailyCheckIn(publicKey.toString());
      
      if (result.success) {
        setHasCheckedIn(true);
        refreshUserData();
        onCheckIn();
        
        let description = `+${result.xpEarned} XP earned! Streak: ${result.newStreak} days`;
        if (result.newBadges.length > 0) {
          description += `\nNew badge(s): ${result.newBadges.join(', ')}`;
        }
        
        toast({
          title: "Daily Check-in Complete! 🎉",
          description,
        });
      } else {
        toast({
          title: "Already Checked In",
          description: "You've already checked in today. Come back tomorrow!",
          variant: "default"
        });
      }
    } catch (error) {
      console.error('Check-in error:', error);
      toast({
        title: "Check-in Failed",
        description: "Failed to complete check-in. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsChecking(false);
    }
  };

  const rewards = [
    { day: 1, reward: '50 XP', type: 'xp' },
    { day: 3, reward: 'Bronze Badge', type: 'badge' },
    { day: 7, reward: '200 XP + Badge', type: 'xp' },
    { day: 14, reward: 'Silver Badge', type: 'badge' },
    { day: 30, reward: 'Gold Badge', type: 'badge' }
  ];

  if (!publicKey) {
    return (
      <Card className="bg-card-gradient border-purple-800/30 hover-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-400" />
            Daily Check-in
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center text-muted-foreground">
          Connect your wallet to start earning daily rewards
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card-gradient border-purple-800/30 hover-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-400" />
          Daily Check-in
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-400" />
            <span className="text-2xl font-bold text-gradient-gold">{userData?.streak || 0}</span>
            <span className="text-muted-foreground">day streak</span>
          </div>
          <Badge variant="secondary" className="bg-purple-900/30">
            Level {Math.floor((userData?.streak || 0) / 7) + 1}
          </Badge>
        </div>

        <Button
          onClick={handleCheckIn}
          disabled={hasCheckedIn || isChecking}
          className="w-full bg-crypto-gradient hover:glow-blue"
        >
          <Gift className="w-4 h-4 mr-2" />
          {hasCheckedIn 
            ? 'Checked in today ✓' 
            : isChecking 
            ? 'Checking in...' 
            : 'Check in for 50 XP'
          }
        </Button>

        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Streak Rewards</h4>
          <div className="grid grid-cols-1 gap-2">
            {rewards.map((reward, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-2 rounded-lg text-sm ${
                  (userData?.streak || 0) >= reward.day 
                    ? 'bg-green-900/20 border border-green-800/30' 
                    : 'bg-purple-900/10 border border-purple-800/20'
                }`}
              >
                <span>Day {reward.day}</span>
                <Badge 
                  variant={(userData?.streak || 0) >= reward.day ? "default" : "outline"}
                  className={(userData?.streak || 0) >= reward.day ? "bg-green-600" : ""}
                >
                  {reward.reward}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyCheckIn;
