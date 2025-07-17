import { getUserData, saveUserData, recordReferral } from './user-data';

export interface ReferralTier {
  name: string;
  required: number;
  reward: number;
  color: string;
}

export const REFERRAL_TIERS: ReferralTier[] = [
  { name: 'Bronze Recruiter', required: 5, reward: 50, color: 'text-amber-600' },
  { name: 'Silver Recruiter', required: 10, reward: 75, color: 'text-gray-300' },
  { name: 'Gold Recruiter', required: 25, reward: 100, color: 'text-yellow-400' },
  { name: 'Diamond Recruiter', required: 50, reward: 150, color: 'text-blue-400' },
  { name: 'Legendary Recruiter', required: 100, reward: 200, color: 'text-purple-400' }
];

const REFERRAL_STORAGE_KEY = 'meme_warrior_referrals';

interface ReferralData {
  referrerAddress: string;
  referralCode: string;
}

export const generateReferralCode = (walletAddress: string): string => {
  // Use the last 6 characters of the wallet address
  const shortAddress = walletAddress.slice(-6);
  // Add a random component
  const randomPart = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${randomPart}${shortAddress}`;
};

export const saveReferralCode = (walletAddress: string, referralCode: string): void => {
  try {
    const referralData: ReferralData = {
      referrerAddress: walletAddress,
      referralCode
    };
    const allReferrals = JSON.parse(localStorage.getItem(REFERRAL_STORAGE_KEY) || '{}');
    allReferrals[referralCode] = referralData;
    localStorage.setItem(REFERRAL_STORAGE_KEY, JSON.stringify(allReferrals));
  } catch (error) {
    console.error('Error saving referral code:', error);
  }
};

export const getReferralCode = (walletAddress: string): string => {
  try {
    const allReferrals = JSON.parse(localStorage.getItem(REFERRAL_STORAGE_KEY) || '{}');
    const referralData = Object.values(allReferrals).find(
      (data: ReferralData) => data.referrerAddress === walletAddress
    );
    if (referralData) {
      return (referralData as ReferralData).referralCode;
    }
    // If no code exists, generate and save a new one
    const newCode = generateReferralCode(walletAddress);
    saveReferralCode(walletAddress, newCode);
    return newCode;
  } catch {
    const newCode = generateReferralCode(walletAddress);
    saveReferralCode(walletAddress, newCode);
    return newCode;
  }
};

export const getCurrentTier = (referralCount: number): ReferralTier => {
  return (
    REFERRAL_TIERS.slice()
      .reverse()
      .find(tier => referralCount >= tier.required) || REFERRAL_TIERS[0]
  );
};

export const getNextTier = (referralCount: number): ReferralTier | null => {
  return (
    REFERRAL_TIERS.find(tier => referralCount < tier.required) || null
  );
};

export const processReferral = (
  referralCode: string,
  newUserAddress: string
): {
  success: boolean;
  referrerAddress?: string;
  error?: string;
} => {
  try {
    const allReferrals = JSON.parse(localStorage.getItem(REFERRAL_STORAGE_KEY) || '{}');
    const referralData = allReferrals[referralCode] as ReferralData | undefined;

    if (!referralData) {
      return { success: false, error: 'Invalid referral code' };
    }

    const referrerAddress = referralData.referrerAddress;
    if (referrerAddress === newUserAddress) {
      return { success: false, error: 'Cannot refer yourself' };
    }

    // Record the referral for the referrer
    const result = recordReferral(referrerAddress);
    
    // Give the new user a bonus
    const newUserData = getUserData(newUserAddress);
    const bonusXP = 100; // Bonus XP for being referred
    const updatedData = {
      ...newUserData,
      totalXP: newUserData.totalXP + bonusXP,
      level: Math.floor((newUserData.totalXP + bonusXP) / 1000) + 1,
    };
    saveUserData(newUserAddress, updatedData);

    return {
      success: true,
      referrerAddress,
    };
  } catch (error) {
    console.error('Error processing referral:', error);
    return { success: false, error: 'Failed to process referral' };
  }
};

export const getReferralUrl = (referralCode: string): string => {
  const baseUrl = window.location.origin;
  return `${baseUrl}?ref=${referralCode}`;
}; 