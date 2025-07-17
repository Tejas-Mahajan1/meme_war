
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge as BadgeUI } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { BADGES, getRarityColor, getRarityBg, getBadgeProgress } from '@/lib/badges';
import { getUserData, UserData } from '@/lib/user-data';

const BadgeTracker: React.FC = () => {
  const { publicKey } = useWallet();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (publicKey) {
      const data = getUserData(publicKey.toString());
      setUserData(data);
    } else {
      setUserData(null);
    }
  }, [publicKey]);

  if (!publicKey || !userData) {
    return (
      <Card className="bg-card-gradient border-purple-800/30 hover-glow overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-b border-purple-800/30">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <span className="text-gradient-purple">Badge Collection</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center text-muted-foreground">
          Connect your wallet to view and track your badges
        </CardContent>
      </Card>
    );
  }

  const earnedBadges = BADGES.filter(badge => userData.badges.includes(badge.id));
  const unearnedBadges = BADGES.filter(badge => !userData.badges.includes(badge.id));

  return (
    <Card className="bg-card-gradient border-purple-800/30 hover-glow overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-b border-purple-800/30">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <span className="text-gradient-purple">Badge Collection</span>
          </div>
          <BadgeUI className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
            {earnedBadges.length}/{BADGES.length} Earned
          </BadgeUI>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Earned Badges Section */}
        {earnedBadges.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-green-400 mb-3 flex items-center gap-2">
              <Star className="w-4 h-4" />
              Earned Badges
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {earnedBadges.map((badge) => {
                const IconComponent = badge.icon;
                return (
                  <div
                    key={badge.id}
                    className={`relative p-4 rounded-xl border-2 ${getRarityBg(badge.rarity)} hover-scale group cursor-pointer`}
                  >
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
                      <Star className="w-2.5 h-2.5 text-black" />
                    </div>
                    <div className="text-center">
                      <div className={`p-3 rounded-lg ${getRarityBg(badge.rarity)} mx-auto w-fit mb-2`}>
                        <IconComponent className={`w-8 h-8 ${getRarityColor(badge.rarity)}`} />
                      </div>
                      <h5 className="font-medium text-sm mb-1">{badge.name}</h5>
                      <BadgeUI 
                        variant="outline" 
                        className={`text-xs ${getRarityColor(badge.rarity)} border-current`}
                      >
                        {badge.rarity}
                      </BadgeUI>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Progress Badges Section */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            In Progress
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unearnedBadges.map((badge) => {
              const IconComponent = badge.icon;
              const progress = getBadgeProgress(badge, userData);
              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-lg border ${getRarityBg(badge.rarity)} opacity-80 hover:opacity-100 transition-opacity hover-scale`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${getRarityBg(badge.rarity)}`}>
                      <IconComponent className={`w-6 h-6 ${getRarityColor(badge.rarity)}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium truncate">{badge.name}</h4>
                        <BadgeUI 
                          variant="outline" 
                          className={`text-xs ${getRarityColor(badge.rarity)} border-current`}
                        >
                          {badge.rarity}
                        </BadgeUI>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{badge.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Progress</span>
                          <span className={getRarityColor(badge.rarity)}>{Math.floor(progress)}%</span>
                        </div>
                        <Progress 
                          value={progress} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BadgeTracker;
