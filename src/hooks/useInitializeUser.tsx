// src/hooks/useInitializeUser.ts
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { userState, UserInfo } from '../recoil/atoms/userAtom';
import { jwtDecode } from 'jwt-decode';

export const useInitializeUser = () => {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const decoded = jwtDecode<UserInfo>(token);
        setUser(decoded);
      } catch (e) {
        console.error('Invalid token', e);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [setUser]);
};
