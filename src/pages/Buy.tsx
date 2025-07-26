import { useState } from 'react';
import { rampService } from '../services/rampService';
import { userService } from '../services/userService';
import { toastManager } from '../services/toastManager';

const Buy = () => {
  const [loading, setLoading] = useState(false);

  const handleBuy = async (amount: number) => {
    try {
      setLoading(true);
      const user = await userService.getUser('YOUR_WALLET_ADDRESS'); // You'll need to get this from Magic
      
      if (user) {
        rampService.show({
          swapAmount: amount,
          userAddress: user.walletAddress,
          hostApiKey: import.meta.env.VITE_RAMP_HOST_API_KEY,
        });

        // Award points (100 points per $10)
        const pointsToAward = Math.floor((amount / 10) * 100);
        await userService.updateUserPoints(user.walletAddress, pointsToAward);
        
        // Update streak
        await userService.updateStreak(user.walletAddress);
        
        toastManager.showToast(`Earned ${pointsToAward} points!`);
      }
    } catch (error) {
      console.error('Error during purchase:', error);
      toastManager.showToast('Error processing purchase');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="buy">
      <h1>Buy Crypto</h1>
      <div className="buy-options">
        <button 
          onClick={() => handleBuy(5)} 
          disabled={loading}
        >
          Buy $5
        </button>
        <button 
          onClick={() => handleBuy(10)} 
          disabled={loading}
        >
          Buy $10
        </button>
        <button 
          onClick={() => handleBuy(20)} 
          disabled={loading}
        >
          Buy $20
        </button>
      </div>
    </div>
  );
};

export default Buy;
