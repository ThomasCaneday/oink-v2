import { useState, useEffect } from 'react';
import { Ad } from '../data/ads';
import { userService } from '../services/userService';
import { toastManager } from '../services/toastManager';

interface AdPlayerProps {
  ad: Ad;
  onComplete: () => void;
  onClose: () => void;
}

const AdPlayer = ({ ad, onComplete, onClose }: AdPlayerProps) => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleEarnPoints = async () => {
    try {
      // Replace with actual user wallet address from auth
      const user = await userService.getUser('YOUR_WALLET_ADDRESS');
      if (user) {
        await userService.updateUserPoints(user.walletAddress, ad.points);
        toastManager.showToast(`Earned ${ad.points} points! 🎉`);
      }
    } catch (error) {
      console.error('Error awarding points:', error);
      toastManager.showToast('Error awarding points');
    } finally {
      onComplete();
    }
  };

  return (
    <div className="ad-player">
      <button onClick={onClose} className="close-button">×</button>
      <img src={ad.imageUrl} alt={ad.title} className="ad-image" />
      <h3>{ad.title}</h3>
      <p>{ad.description}</p>
      {!completed ? (
        <div className="timer">Wait {timeLeft} seconds...</div>
      ) : (
        <button onClick={handleEarnPoints} className="earn-points-button">
          Earn {ad.points} Points
        </button>
      )}
    </div>
  );
};

export default AdPlayer;
