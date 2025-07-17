import { UserData } from './user-data';

export interface LeaderboardEntry {
  walletAddress: string;
  name: string;
  avatar: string;
  xp: number;
  memes: number;
  streak: number;
  level: number;
  rank?: number;
}

const STORAGE_KEY = 'meme_warrior_user_data';

const generateName = (address: string): string => {
  const names = [
    'CryptoKing', 'MemeQueen', 'DiamondHands', 'ToTheMoon', 'DogeCoin',
    'PepeMaster', 'ShibaLord', 'WhalAlert', 'HODLer', 'DegenPlayer',
    'NFTFlip', 'YieldFarm', 'AlphaTrade', 'BetaBull', 'GammaGain',
    'DeltaDegen', 'EpsilonElite', 'ZetaZone', 'EtaEarn', 'ThetaThrive'
  ];
  
  // Use the last 2 bytes of the address as a seed
  const seed = parseInt(address.slice(-4), 16);
  return names[seed % names.length];
};

export const getLeaderboardData = (): LeaderboardEntry[] => {
  try {
    const allData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    
    // Convert user data to leaderboard entries
    const entries: LeaderboardEntry[] = Object.entries(allData).map(([address, data]: [string, UserData]) => ({
      walletAddress: address,
      name: generateName(address),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${address}`,
      xp: data.totalXP,
      memes: data.memeCount,
      streak: data.streak,
      level: data.level
    }));

    // Add some mock data if there are fewer than 10 real users
    if (entries.length < 10) {
      const mockCount = 10 - entries.length;
      for (let i = 0; i < mockCount; i++) {
        const mockAddress = `mock${i}`;
        entries.push({
          walletAddress: mockAddress,
          name: generateName(mockAddress),
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${mockAddress}`,
          xp: Math.floor(Math.random() * 10000) + 5000,
          memes: Math.floor(Math.random() * 100) + 10,
          streak: Math.floor(Math.random() * 30) + 1,
          level: Math.floor((Math.random() * 10000 + 5000) / 500) + 1
        });
      }
    }

    return entries;
  } catch {
    return [];
  }
};

export const sortLeaderboard = (
  entries: LeaderboardEntry[],
  sortBy: 'xp' | 'memes' | 'streak' = 'xp'
): LeaderboardEntry[] => {
  const sorted = [...entries].sort((a, b) => {
    switch (sortBy) {
      case 'xp': return b.xp - a.xp;
      case 'memes': return b.memes - a.memes;
      case 'streak': return b.streak - a.streak;
      default: return b.xp - a.xp;
    }
  });

  // Add rank
  return sorted.map((entry, index) => ({
    ...entry,
    rank: index + 1
  }));
};

export const getUserRank = (
  walletAddress: string,
  sortBy: 'xp' | 'memes' | 'streak' = 'xp'
): number => {
  const entries = getLeaderboardData();
  const sorted = sortLeaderboard(entries, sortBy);
  const userEntry = sorted.find(entry => entry.walletAddress === walletAddress);
  return userEntry?.rank || 0;
}; 