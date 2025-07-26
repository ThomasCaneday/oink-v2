import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export interface User {
  walletAddress: string;
  email: string;
  totalInvested: number;
  points: number;
  streakCount: number;
  lastInvestmentDate: Date | null;
  quizProgress: { [key: string]: boolean };
}

export const userService = {
  async createUser(userData: Partial<User>): Promise<void> {
    if (!userData.walletAddress) throw new Error('Wallet address is required');
    
    const userRef = doc(db, 'users', userData.walletAddress);
    await setDoc(userRef, {
      ...userData,
      totalInvested: 0,
      points: 0,
      streakCount: 0,
      lastInvestmentDate: null,
      quizProgress: {},
    });
  },

  async getUser(walletAddress: string): Promise<User | null> {
    const userRef = doc(db, 'users', walletAddress);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? userSnap.data() as User : null;
  },

  async updateUserPoints(walletAddress: string, pointsToAdd: number): Promise<void> {
    const userRef = doc(db, 'users', walletAddress);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data() as User;
      await setDoc(userRef, {
        ...userData,
        points: userData.points + pointsToAdd,
      });
    }
  },

  async getLeaderboard(): Promise<User[]> {
    const usersRef = collection(db, 'users');
    const q = query(
      usersRef,
      orderBy('points', 'desc'),
      limit(5)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as User);
  },

  async updateStreak(walletAddress: string): Promise<void> {
    const userRef = doc(db, 'users', walletAddress);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data() as User;
      const now = new Date();
      const lastInvestment = userData.lastInvestmentDate ? new Date(userData.lastInvestmentDate) : null;
      
      let newStreakCount = 1;
      if (lastInvestment) {
        const timeDiff = now.getTime() - lastInvestment.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        
        if (daysDiff <= 1) {
          newStreakCount = userData.streakCount + 1;
        }
      }
      
      await setDoc(userRef, {
        ...userData,
        streakCount: newStreakCount,
        lastInvestmentDate: now,
      });
    }
  },
};
