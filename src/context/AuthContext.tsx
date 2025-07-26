import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Magic } from 'magic-sdk';
import type { AppUser, MagicUserMetadata } from '../types/magic';

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  magic: Magic;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const magic = new Magic(import.meta.env.VITE_MAGIC_PUBLISHABLE_KEY);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const isLoggedIn = await magic.user.isLoggedIn();
      const metadata = isLoggedIn ? await magic.user.getMetadata() : null;
      setUser(isLoggedIn ? { isLoggedIn, metadata: metadata as MagicUserMetadata } : null);
    } catch (error) {
      console.error('Error checking user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string) => {
    try {
      await magic.auth.loginWithMagicLink({ email });
      await checkUser();
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await magic.user.logout();
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    magic,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
