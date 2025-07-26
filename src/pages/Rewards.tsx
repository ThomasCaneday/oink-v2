import { useState, useEffect } from 'react';
import { rewards } from '../data/rewards';
import { userService } from '../services/userService';
import { toastManager } from '../services/toastManager';
import type { User } from '../services/userService';
import type { Reward } from '../data/rewards';

const Rewards = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [redeeming, setRedeeming] = useState<string | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      // Replace with actual user wallet address from auth
      const userData = await userService.getUser('YOUR_WALLET_ADDRESS');
      setUser(userData);
    } catch (error) {
      console.error('Error loading user:', error);
    }
  };

  const handleRedeem = async (reward: Reward) => {
    if (!user) return;
    
    try {
      setRedeeming(reward.id);
      
      if (user.points >= reward.points) {
        await userService.updateUserPoints(user.walletAddress, -reward.points);
        toastManager.showToast(`Redeemed ${reward.name}! 🎉`);
        await loadUser(); // Refresh user data
      } else {
        toastManager.showToast('Not enough points! 😢');
      }
    } catch (error) {
      console.error('Error redeeming reward:', error);
      toastManager.showToast('Error redeeming reward');
    } finally {
      setRedeeming(null);
    }
  };

  return (
    <div className="rewards">
      <h1>Rewards Shop</h1>
      {user && (
        <div className="points-display">
          Your Points: {user.points}
        </div>
      )}
      <div className="rewards-grid">
        {rewards.map(reward => (
          <div key={reward.id} className="reward-card">
            <img src={reward.imageUrl} alt={reward.name} className="reward-image" />
            <h3>{reward.name}</h3>
            <p>{reward.description}</p>
            <div className="reward-footer">
              <span className="points-cost">{reward.points} points</span>
              <button
                onClick={() => handleRedeem(reward)}
                disabled={!user || user.points < reward.points || loading || redeeming === reward.id}
                className="redeem-button"
              >
                {redeeming === reward.id ? 'Redeeming...' : 'Redeem'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rewards;
