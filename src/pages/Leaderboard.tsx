import { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import { useAuth } from '../context/useAuth';
import type { User } from '../services/userService';

const Leaderboard = () => {
  const { user: authUser } = useAuth();
  const [leaders, setLeaders] = useState<User[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      setLoading(true);
      const topUsers = await userService.getTopUsers(5);
      setLeaders(topUsers);

      // Get current user's rank if logged in
      if (authUser?.metadata?.publicAddress) {
        const rank = await userService.getUserRank(authUser.metadata.publicAddress);
        setUserRank(rank);
      }
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="leaderboard">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
      
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <div className="top-users mb-8">
            {leaders.map((user, index) => (
              <div 
                key={user.walletAddress} 
                className="flex items-center justify-between p-4 mb-2 bg-white rounded-lg shadow"
              >
                <div className="flex items-center">
                  <div className="rank-badge mr-4">
                    {index + 1}
                  </div>
                  <div>
                    <div className="truncate max-w-xs">
                      {user.email || user.walletAddress.substring(0, 8) + '...'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {user.points} points
                    </div>
                  </div>
                </div>
                <div className="streak-count text-sm">
                  {user.streakCount} day streak
                </div>
              </div>
            ))}
          </div>

          {userRank !== null && (
            <div className="your-rank mt-8">
              <h2 className="text-xl font-semibold mb-4">Your Position</h2>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="font-medium">Rank #{userRank}</div>
                <div className="text-sm text-gray-600">
                  Keep earning points to climb the leaderboard!
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Leaderboard;
