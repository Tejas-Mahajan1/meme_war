import { BADGES, Badge } from './badges';

export interface UserData {
  lastCheckIn: string | null;
  streak: number;
  totalXP: number;
  level: number;
  badges: string[];
  memeCount: number;
  referralCount: number;
}

const STORAGE_KEY = 'meme_warrior_user_data';

const getInitialUserData = (): UserData => ({
  lastCheckIn: null,
  streak: 0,
  totalXP: 0,
  level: 1,
  badges: [],
  memeCount: 0,
  referralCount: 0,
});

export const getUserData = (walletAddress: string): UserData => {
  try {
    const allData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return allData[walletAddress] || getInitialUserData();
  } catch {
    return getInitialUserData();
  }
};

export const saveUserData = (walletAddress: string, data: UserData): void => {
  try {
    const allData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    allData[walletAddress] = data;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allData));
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

export const checkDailyStreak = (lastCheckIn: string | null): boolean => {
  if (!lastCheckIn) return true;

  const last = new Date(lastCheckIn);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - last.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays === 1;
};

export const checkForNewBadges = (userData: UserData): string[] => {
  const newBadges: string[] = [];

  BADGES.forEach(badge => {
    if (!userData.badges.includes(badge.id)) {
      let earned = false;

      switch (badge.type) {
        case 'streak':
          earned = userData.streak >= badge.requirement;
          break;
        case 'meme':
          earned = userData.memeCount >= badge.requirement;
          break;
        case 'xp':
          earned = userData.totalXP >= badge.requirement;
          break;
        case 'referral':
          earned = userData.referralCount >= badge.requirement;
          break;
      }

      if (earned) {
        newBadges.push(badge.id);
      }
    }
  });

  return newBadges;
};

export const performDailyCheckIn = (walletAddress: string): {
  success: boolean;
  xpEarned: number;
  newStreak: number;
  newBadges: string[];
} => {
  const userData = getUserData(walletAddress);
  const today = new Date().toISOString();

  // Check if already checked in today
  if (userData.lastCheckIn && new Date(userData.lastCheckIn).toDateString() === new Date().toDateString()) {
    return { success: false, xpEarned: 0, newStreak: userData.streak, newBadges: [] };
  }

  // Calculate streak
  const maintainedStreak = checkDailyStreak(userData.lastCheckIn);
  const newStreak = maintainedStreak ? userData.streak + 1 : 1;

  // Calculate XP (base + streak bonus)
  const baseXP = 50;
  const streakBonus = Math.floor(newStreak / 7) * 10; // +10 XP per week of streak
  const xpEarned = baseXP + streakBonus;

  // Update user data
  const updatedData: UserData = {
    ...userData,
    lastCheckIn: today,
    streak: newStreak,
    totalXP: userData.totalXP + xpEarned,
    level: Math.floor((userData.totalXP + xpEarned) / 1000) + 1,
  };

  // Check for new badges
  const newBadges = checkForNewBadges(updatedData);
  updatedData.badges = [...updatedData.badges, ...newBadges];

  saveUserData(walletAddress, updatedData);

  return {
    success: true,
    xpEarned,
    newStreak,
    newBadges,
  };
};

export const recordMemeUpload = (walletAddress: string): {
  success: boolean;
  xpEarned: number;
  newBadges: string[];
} => {
  const userData = getUserData(walletAddress);
  const xpEarned = 100;

  const updatedData: UserData = {
    ...userData,
    memeCount: userData.memeCount + 1,
    totalXP: userData.totalXP + xpEarned,
    level: Math.floor((userData.totalXP + xpEarned) / 1000) + 1,
  };

  const newBadges = checkForNewBadges(updatedData);
  updatedData.badges = [...updatedData.badges, ...newBadges];

  saveUserData(walletAddress, updatedData);

  return {
    success: true,
    xpEarned,
    newBadges,
  };
};

export const recordReferral = (walletAddress: string): {
  success: boolean;
  xpEarned: number;
  newBadges: string[];
} => {
  const userData = getUserData(walletAddress);
  const xpEarned = 200;

  const updatedData: UserData = {
    ...userData,
    referralCount: userData.referralCount + 1,
    totalXP: userData.totalXP + xpEarned,
    level: Math.floor((userData.totalXP + xpEarned) / 1000) + 1,
  };

  const newBadges = checkForNewBadges(updatedData);
  updatedData.badges = [...updatedData.badges, ...newBadges];

  saveUserData(walletAddress, updatedData);

  return {
    success: true,
    xpEarned,
    newBadges,
  };
}; 