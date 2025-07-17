
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, MessageCircle, Users } from 'lucide-react';
import { TwitterTimelineEmbed, TwitterFollowButton } from 'react-twitter-embed';

const SocialEmbeds: React.FC = () => {
  const socialLinks = [
    {
      name: 'Twitter',
      handle: '@MemeWarriorCoin',
      followers: '15.2K',
      icon: '🐦',
      url: 'https://twitter.com/memewarrior',
      color: 'from-blue-400 to-blue-600'
    },
    {
      name: 'Telegram',
      handle: 'MemeWarrior Official',
      members: '8.7K',
      icon: '✈️',
      url: 'https://t.me/memewarrior',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Discord',
      handle: 'Meme Warriors',
      members: '12.1K',
      icon: '🎮',
      url: 'https://discord.gg/memewarrior',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      name: 'Reddit',
      handle: 'r/MemeWarrior',
      members: '6.8K',
      icon: '📱',
      url: 'https://reddit.com/r/memewarrior',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const announcements = [
    {
      title: '🚀 Token Launch in 30 Days!',
      description: 'Get ready for the biggest meme coin launch of 2024',
      time: '2 hours ago'
    },
    {
      title: '🎯 New Badge System Live',
      description: 'Unlock exclusive badges and climb the leaderboard',
      time: '1 day ago'
    },
    {
      title: '🔥 Community Milestone: 10K Members',
      description: 'Thank you for making this community amazing!',
      time: '3 days ago'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gradient-purple mb-4">Join the Community</h2>
        <p className="text-muted-foreground">Connect with fellow meme warriors across all platforms</p>
      </div>

      {/* Social Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {socialLinks.map((social, index) => (
          <Card key={index} className="bg-card-gradient border-purple-800/30 hover-glow hover-scale">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">{social.icon}</div>
              <h3 className="font-bold text-lg mb-2">{social.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{social.handle}</p>
              <p className="text-2xl font-bold text-gradient-gold mb-4">
                {social.members || social.followers}
              </p>
              <Button
                asChild
                className={`w-full bg-gradient-to-r ${social.color} hover:scale-105 transition-transform`}
              >
                <a href={social.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Join Now
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Social Feeds */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Twitter Timeline */}
        <Card className="bg-card-gradient border-purple-800/30 hover-glow overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🐦</span>
                <span>Twitter Feed</span>
              </div>
              <TwitterFollowButton screenName="memewarrior" />
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-[500px] bg-purple-900/20">
            <TwitterTimelineEmbed
              sourceType="profile"
              screenName="memewarrior"
              options={{ height: 500 }}
              theme="dark"
              noHeader
              transparent
            />
          </CardContent>
        </Card>

        {/* Telegram Group */}
        <Card className="bg-card-gradient border-purple-800/30 hover-glow overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">✈️</span>
                <span>Telegram Group</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-[500px] bg-purple-900/20">
            <iframe
              src="https://t.me/memewarrior"
              width="100%"
              height="500"
              frameBorder="0"
              className="bg-transparent"
            />
          </CardContent>
        </Card>
      </div>

      {/* Latest Announcements */}
      <Card className="bg-card-gradient border-purple-800/30 hover-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-blue-400" />
            Latest Announcements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {announcements.map((announcement, index) => (
              <div key={index} className="p-4 bg-purple-900/20 rounded-lg border border-purple-800/30 hover-scale">
                <h4 className="font-medium mb-2">{announcement.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{announcement.description}</p>
                <p className="text-xs text-muted-foreground">{announcement.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card-gradient border-purple-800/30 text-center hover-glow">
          <CardContent className="p-6">
            <Users className="w-8 h-8 mx-auto mb-3 text-purple-400" />
            <div className="text-3xl font-bold text-gradient-gold">42.8K</div>
            <div className="text-sm text-muted-foreground">Total Members</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card-gradient border-purple-800/30 text-center hover-glow">
          <CardContent className="p-6">
            <MessageCircle className="w-8 h-8 mx-auto mb-3 text-blue-400" />
            <div className="text-3xl font-bold text-gradient-purple">156.2K</div>
            <div className="text-sm text-muted-foreground">Messages Today</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card-gradient border-purple-800/30 text-center hover-glow">
          <CardContent className="p-6">
            <ExternalLink className="w-8 h-8 mx-auto mb-3 text-green-400" />
            <div className="text-3xl font-bold text-gradient-gold">89%</div>
            <div className="text-sm text-muted-foreground">Active Rate</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SocialEmbeds;
