import React, { createContext, useContext, useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { UserData, getUserData, saveUserData } from './user-data';
import { getReferralCode } from './referral';

interface UserContextType {
  userData: UserData | null;
  referralCode: string | null;
  updateUserData: (newData: UserData) => void;
  refreshUserData: () => void;
}

const UserContext = createContext<UserContextType>({
  userData: null,
  referralCode: null,
  updateUserData: () => {},
  refreshUserData: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { publicKey } = useWallet();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [referralCode, setReferralCode] = useState<string | null>(null);

  const refreshUserData = () => {
    if (publicKey) {
      const data = getUserData(publicKey.toString());
      setUserData(data);
      const code = getReferralCode(publicKey.toString());
      setReferralCode(code);
    } else {
      setUserData(null);
      setReferralCode(null);
    }
  };

  const updateUserData = (newData: UserData) => {
    if (publicKey) {
      saveUserData(publicKey.toString(), newData);
      setUserData(newData);
    }
  };

  useEffect(() => {
    refreshUserData();
  }, [publicKey]);

  return (
    <UserContext.Provider
      value={{
        userData,
        referralCode,
        updateUserData,
        refreshUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}; 