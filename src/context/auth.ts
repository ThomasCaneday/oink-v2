import { createContext } from 'react';
import { Magic } from 'magic-sdk';
import type { AppUser } from '../types/magic';

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  magic: Magic;
}

export const AuthContext = createContext<AuthContextType | null>(null);
