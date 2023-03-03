import { useEffect, useState } from 'react';

import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (userInfo) => {
      if (userInfo) {
        setIsLoggedIn(true);
        setUser(userInfo);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    });
    return () => {
      subscriber();
    };
  }, []);

  return {
    user,
    isLoggedIn,
  };
};
