import { Star, Trophy, Crown, Shield, Zap, Target, Flame, Gift, Upload, Users } from 'lucide-react';

export type BadgeRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: any; // Lucide icon component
  rarity: BadgeRarity;
  requirement: number;
  type: 'streak' | 'meme' | 'referral' | 'xp' | 'token' | 'competition';
}

export const BADGES: Badge[] = [
  // Streak Badges
  {
    id: '7DayStreak',
    name: 'Week Warrior',
    description: 'Complete a 7-day check-in streak',
    icon: Flame,
    rarity: 'common',
    requirement: 7,
    type: 'streak'
  },
  {
    id: '14DayStreak',
    name: 'Fortnight Fighter',
    description: 'Complete a 14-day check-in streak',
    icon: Flame,
    rarity: 'uncommon',
    requirement: 14,
    type: 'streak'
  },
  {
    id: '30DayStreak',
    name: 'Monthly Master',
    description: 'Complete a 30-day check-in streak',
    icon: Flame,
    rarity: 'rare',
    requirement: 30,
    type: 'streak'
  },
  {
    id: '60DayStreak',
    name: 'Dedication King',
    description: 'Complete a 60-day check-in streak',
    icon: Crown,
    rarity: 'epic',
    requirement: 60,
    type: 'streak'
  },
  {
    id: '90DayStreak',
    name: 'Legendary Loyalist',
    description: 'Complete a 90-day check-in streak',
    icon: Crown,
    rarity: 'legendary',
    requirement: 90,
    type: 'streak'
  },

  // Meme Badges
  {
    id: 'FirstMeme',
    name: 'Meme Initiate',
    description: 'Upload your first meme',
    icon: Upload,
    rarity: 'common',
    requirement: 1,
    type: 'meme'
  },
  {
    id: 'MemeEnthusiast',
    name: 'Meme Enthusiast',
    description: 'Upload 10 memes',
    icon: Upload,
    rarity: 'uncommon',
    requirement: 10,
    type: 'meme'
  },
  {
    id: 'MemeMaster',
    name: 'Meme Master',
    description: 'Upload 50 memes',
    icon: Star,
    rarity: 'rare',
    requirement: 50,
    type: 'meme'
  },

  // XP Badges
  {
    id: 'XPHunter',
    name: 'XP Hunter',
    description: 'Earn 1,000 XP',
    icon: Zap,
    rarity: 'common',
    requirement: 1000,
    type: 'xp'
  },
  {
    id: 'XPWarrior',
    name: 'XP Warrior',
    description: 'Earn 5,000 XP',
    icon: Zap,
    rarity: 'uncommon',
    requirement: 5000,
    type: 'xp'
  },
  {
    id: 'XPLegend',
    name: 'XP Legend',
    description: 'Earn 10,000 XP',
    icon: Shield,
    rarity: 'rare',
    requirement: 10000,
    type: 'xp'
  },

  // Referral Badges
  {
    id: 'FirstReferral',
    name: 'Community Starter',
    description: 'Get your first referral',
    icon: Users,
    rarity: 'common',
    requirement: 1,
    type: 'referral'
  },
  {
    id: 'ReferralChampion',
    name: 'Referral Champion',
    description: 'Get 10 referrals',
    icon: Users,
    rarity: 'rare',
    requirement: 10,
    type: 'referral'
  },
  {
    id: 'ReferralLegend',
    name: 'Referral Legend',
    description: 'Get 50 referrals',
    icon: Crown,
    rarity: 'legendary',
    requirement: 50,
    type: 'referral'
  },
];

export const getRarityColor = (rarity: BadgeRarity): string => {
  switch (rarity) {
    case 'common': return 'text-gray-400';
    case 'uncommon': return 'text-green-400';
    case 'rare': return 'text-blue-400';
    case 'epic': return 'text-purple-400';
    case 'legendary': return 'text-yellow-400';
  }
};

export const getRarityBg = (rarity: BadgeRarity): string => {
  switch (rarity) {
    case 'common': return 'bg-gray-900/20 border-gray-800/30';
    case 'uncommon': return 'bg-green-900/20 border-green-800/30';
    case 'rare': return 'bg-blue-900/20 border-blue-800/30';
    case 'epic': return 'bg-purple-900/20 border-purple-800/30';
    case 'legendary': return 'bg-yellow-900/20 border-yellow-800/30';
  }
};

export const getBadgeProgress = (
  badge: Badge,
  userData: {
    streak: number;
    totalXP: number;
    memeCount?: number;
    referralCount?: number;
  }
): number => {
  switch (badge.type) {
    case 'streak':
      return Math.min(100, (userData.streak / badge.requirement) * 100);
    case 'xp':
      return Math.min(100, (userData.totalXP / badge.requirement) * 100);
    case 'meme':
      return Math.min(100, ((userData.memeCount || 0) / badge.requirement) * 100);
    case 'referral':
      return Math.min(100, ((userData.referralCount || 0) / badge.requirement) * 100);
    default:
      return 0;
  }
}; 