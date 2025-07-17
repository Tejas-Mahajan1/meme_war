
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Crown, Medal, Star, Users, Zap } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { getLeaderboardData, sortLeaderboard, LeaderboardEntry } from '@/lib/leaderboard';

const Leaderboard: React.FC = () => {
  const { publicKey } = useWallet();
  const [activeTab, setActiveTab] = useState<'xp' | 'memes' | 'streak'>('xp');
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const entries = getLeaderboardData();
    const sorted = sortLeaderboard(entries, activeTab);
    setLeaderboardData(sorted);
  }, [activeTab]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-400" />;
      case 2: return <Medal className="w-5 h-5 text-gray-300" />;
      case 3: return <Medal className="w-5 h-5 text-amber-600" />;
      default: return <span className="text-muted-foreground">#{rank}</span>;
    }
  };

  const getValue = (user: LeaderboardEntry) => {
    switch (activeTab) {
      case 'xp': return `${user.xp.toLocaleString()} XP`;
      case 'memes': return `${user.memes} memes`;
      case 'streak': return `${user.streak} days`;
      default: return '';
    }
  };

  return (
    <Card className="bg-card-gradient border-purple-800/30 hover-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-center justify-center">
          <Trophy className="w-6 h-6 text-yellow-400" />
          <span className="text-gradient-gold">Global Leaderboard</span>
        </CardTitle>
        
        <div className="flex gap-2 justify-center">
          <Button
            variant={activeTab === 'xp' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('xp')}
            className={activeTab === 'xp' ? 'bg-crypto-gradient' : 'border-purple-800/30'}
          >
            <Zap className="w-4 h-4 mr-1" />
            XP
          </Button>
          <Button
            variant={activeTab === 'memes' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('memes')}
            className={activeTab === 'memes' ? 'bg-crypto-gradient' : 'border-purple-800/30'}
          >
            <Star className="w-4 h-4 mr-1" />
            Memes
          </Button>
          <Button
            variant={activeTab === 'streak' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('streak')}
            className={activeTab === 'streak' ? 'bg-crypto-gradient' : 'border-purple-800/30'}
          >
            <Users className="w-4 h-4 mr-1" />
            Streak
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {leaderboardData.slice(0, 15).map((user) => (
            <div
              key={user.walletAddress}
              className={`flex items-center gap-4 p-3 rounded-lg transition-all hover-scale ${
                user.rank && user.rank <= 3 
                  ? 'bg-gradient-to-r from-yellow-900/20 to-purple-900/20 border border-yellow-800/30' 
                  : publicKey && user.walletAddress === publicKey.toString()
                  ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-800/30'
                  : 'bg-purple-900/10 border border-purple-800/20'
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="flex items-center justify-center w-8">
                  {user.rank && getRankIcon(user.rank)}
                </div>
                
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full bg-purple-900/20"
                />
                
                <div className="flex-1">
                  <div className="font-medium">
                    {user.name}
                    {publicKey && user.walletAddress === publicKey.toString() && (
                      <span className="ml-2 text-sm text-blue-400">(You)</span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">Level {user.level}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-bold text-gradient-purple">{getValue(user)}</div>
                {user.rank && user.rank <= 3 && (
                  <Badge className="bg-yellow-900/30 text-yellow-400 border-yellow-800/30">
                    Top 3
                  </Badge>
                )}
                {publicKey && user.walletAddress === publicKey.toString() && (
                  <Badge className="bg-blue-900/30 text-blue-400 border-blue-800/30">
                    Your Rank
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
