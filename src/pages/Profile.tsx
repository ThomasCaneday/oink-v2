import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { userService } from '../services/userService';
import type { User } from '../services/userService';

const Profile = () => {
  const { user: authUser, logout } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    if (authUser?.metadata?.publicAddress) {
      loadUserData(authUser.metadata.publicAddress);
    }
  }, [authUser]);

  const loadUserData = async (walletAddress: string) => {
    try {
      const data = await userService.getUser(walletAddress);
      setUserData(data);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!authUser) {
    return (
      <div className="profile">
        <h1>Profile</h1>
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="profile">
      <h1>Profile</h1>
      <div className="profile-info">
        <div className="info-group">
          <h3>Email</h3>
          <p>{authUser.metadata?.email}</p>
        </div>
        <div className="info-group">
          <h3>Wallet Address</h3>
          <p>{authUser.metadata?.publicAddress}</p>
        </div>
        {userData && (
          <>
            <div className="info-group">
              <h3>Total Investment</h3>
              <p>${userData.totalInvested.toFixed(2)}</p>
            </div>
            <div className="info-group">
              <h3>Points Balance</h3>
              <p>{userData.points}</p>
            </div>
            <div className="info-group">
              <h3>Current Streak</h3>
              <p>{userData.streakCount} days</p>
            </div>
          </>
        )}
      </div>
      <button onClick={handleLogout} className="logout-button">
        Log Out
      </button>
    </div>
  );
};

export default Profile;
