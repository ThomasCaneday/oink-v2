import { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import type { User } from '../services/userService';

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [leaderboard, setLeaderboard] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Replace with actual user wallet address from auth
      const [userData, leaderboardData] = await Promise.all([
        userService.getUser('YOUR_WALLET_ADDRESS'),
        userService.getLeaderboard()
      ]);

      setUser(userData);
      setLeaderboard(leaderboardData);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="dashboard">Loading...</div>;
  }

  return (
    <div className="dashboard">
      {user ? (
        <>
          <div className="user-stats">
            <h2>Your Stats</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Wallet</h3>
                <p>{user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)}</p>
              </div>
              <div className="stat-card">
                <h3>Total Invested</h3>
                <p>${user.totalInvested.toFixed(2)}</p>
              </div>
              <div className="stat-card">
                <h3>Points</h3>
                <p>{user.points}</p>
              </div>
              <div className="stat-card">
                <h3>Investment Streak</h3>
                <p>{user.streakCount} days 🔥</p>
              </div>
            </div>
          </div>

          <div className="leaderboard">
            <h2>Top Investors This Week</h2>
            <div className="leaderboard-list">
              {leaderboard.map((leader, index) => (
                <div 
                  key={leader.walletAddress}
                  className={`leaderboard-item ${leader.walletAddress === user.walletAddress ? 'current-user' : ''}`}
                >
                  <span className="rank">#{index + 1}</span>
                  <span className="address">
                    {leader.walletAddress.slice(0, 6)}...{leader.walletAddress.slice(-4)}
                  </span>
                  <span className="points">{leader.points} pts</span>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="login-prompt">
          <h2>Welcome to Oink! 🐽</h2>
          <p>Please log in to view your dashboard.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
