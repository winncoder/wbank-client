// src/recoil/authState.ts
import { atom } from 'recoil';

export interface UserInfo {
  sub: string;
  username?: string;
  email?: string;
  role?: 'user' | 'admin' | 'guest';
  exp?: number;
  iat?: number;
}

export const userState = atom<UserInfo | null>({
  key: 'userState',
  default: null,
});
