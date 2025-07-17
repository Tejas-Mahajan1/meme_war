
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Wallet, 
  Upload, 
  Trophy, 
  Users, 
  Zap, 
  Star, 
  Calendar,
  Share2,
  Coins,
  Rocket,
  Target,
  Gift,
  Crown,
  Flame
} from 'lucide-react';
import WalletConnection from '@/components/WalletConnection';
import MemeUploader from '@/components/MemeUploader';
import DailyCheckIn from '@/components/DailyCheckIn';
import BadgeTracker from '@/components/BadgeTracker';
import Leaderboard from '@/components/Leaderboard';
import ReferralTracker from '@/components/ReferralTracker';
import SocialEmbeds from '@/components/SocialEmbeds';
import CountdownTimer from '@/components/CountdownTimer';
import Navigation from '@/components/Navigation';

const Index = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [userXP, setUserXP] = useState(1250);
  const [userLevel, setUserLevel] = useState(5);
  const [dailyStreak, setDailyStreak] = useState(7);

  const handleWalletConnect = (connected: boolean) => {
    setWalletConnected(connected);
  };

  const addXP = (amount: number) => {
    setUserXP(prev => prev + amount);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-crypto-gradient opacity-10"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="mb-8 animate-float">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-gradient-purple">
              MEME WARRIOR
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The ultimate meme coin experience. Upload, earn, compete, and dominate the meme economy.
            </p>
          </div>

          <CountdownTimer />

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <WalletConnection onConnect={handleWalletConnect} />
            <Button size="lg" className="bg-gaming-gradient hover:glow-pink hover-scale">
              <Rocket className="w-5 h-5 mr-2" />
              Join Waitlist
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Users, label: "Warriors", value: "12,547", color: "text-blue-400" },
              { icon: Trophy, label: "Memes Created", value: "89,234", color: "text-purple-400" },
              { icon: Coins, label: "XP Earned", value: "2.1M", color: "text-yellow-400" },
              { icon: Flame, label: "Daily Streak", value: "365 days", color: "text-red-400" }
            ].map((stat, index) => (
              <Card key={index} className="bg-card-gradient border-purple-800/30 hover-glow hover-scale">
                <CardContent className="p-6 text-center">
                  <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-2xl font-bold text-gradient-gold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* User Dashboard */}
      {walletConnected && (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gradient-purple mb-4">Your Battle Station</h2>
              <p className="text-muted-foreground">Track your progress and climb the ranks</p>
            </div>

            {/* User Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="bg-card-gradient border-purple-800/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    Level {userLevel}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>{userXP} XP</span>
                    <span>{(userLevel + 1) * 500} XP</span>
                  </div>
                  <Progress 
                    value={(userXP % 500) / 5} 
                    className="h-3 bg-purple-900/30"
                  />
                </CardContent>
              </Card>

              <Card className="bg-card-gradient border-purple-800/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-red-400" />
                    Daily Streak
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gradient-gold">{dailyStreak} days</div>
                  <div className="text-sm text-muted-foreground">Keep it going!</div>
                </CardContent>
              </Card>

              <Card className="bg-card-gradient border-purple-800/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-yellow-400" />
                    Rank
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gradient-purple">#47</div>
                  <div className="text-sm text-muted-foreground">Global Leaderboard</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <DailyCheckIn onCheckIn={() => addXP(50)} />
              <MemeUploader onUpload={() => addXP(100)} />
            </div>
          </div>
        </section>
      )}

      {/* Features Grid */}
      <section id="rewards" className="py-16 px-4 bg-gradient-to-b from-background to-purple-950/10">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-800/20 border border-purple-700/30 mb-6">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-purple-300">EPIC FEATURES</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gradient-purple mb-4">
              Unlock Your Potential
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Collect legendary badges, build your empire through referrals, and dominate the meme economy
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-7xl mx-auto">
            <div className="space-y-4">
              <BadgeTracker />
            </div>
            <div className="space-y-4">
              <ReferralTracker />
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-800/30 hover-glow hover-scale">
              <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Achievement System</h3>
              <p className="text-sm text-muted-foreground">Earn rare badges and show off your meme mastery</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-900/30 to-blue-900/20 border border-green-800/30 hover-glow hover-scale">
              <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Referral Rewards</h3>
              <p className="text-sm text-muted-foreground">Grow your network and unlock exclusive tier bonuses</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-900/30 to-purple-900/20 border border-blue-800/30 hover-glow hover-scale">
              <Zap className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">XP Multipliers</h3>
              <p className="text-sm text-muted-foreground">Stack bonuses and accelerate your progression</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <Leaderboard />
        </div>
      </section>

      {/* Social Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <SocialEmbeds />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="bg-card-gradient rounded-2xl p-12 border border-purple-800/30 hover-glow">
            <h2 className="text-4xl font-bold text-gradient-purple mb-6">Ready to Become a Meme Warrior?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join the revolution and start earning XP, collecting badges, and climbing the leaderboard today!
            </p>
            {!walletConnected ? (
              <WalletConnection onConnect={handleWalletConnect} />
            ) : (
              <Button size="lg" className="bg-gaming-gradient hover:glow-pink hover-scale">
                <Target className="w-5 h-5 mr-2" />
                Start Your Quest
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
