import { useState, useEffect } from 'react';
import { ads } from '../data/ads';
import AdPlayer from '../components/AdPlayer';
import { userService } from '../services/userService';
import type { User } from '../services/userService';

const Ads = () => {
  const [selectedAd, setSelectedAd] = useState<string | null>(null);
  const [watchedToday, setWatchedToday] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadUserData();
    const watched = localStorage.getItem('watchedAds');
    if (watched) {
      setWatchedToday(JSON.parse(watched));
    }
  }, []);

  const loadUserData = async () => {
    try {
      // Replace with actual user wallet address from auth
      const userData = await userService.getUser('YOUR_WALLET_ADDRESS');
      setUser(userData);
    } catch (error) {
      console.error('Error loading user:', error);
    }
  };

  const handleAdComplete = (adId: string) => {
    const newWatched = [...watchedToday, adId];
    setWatchedToday(newWatched);
    localStorage.setItem('watchedAds', JSON.stringify(newWatched));
    setSelectedAd(null);
    loadUserData(); // Refresh user data to show updated points
  };

  const canWatchMore = watchedToday.length < 3;

  return (
    <div className="ads-page">
      <h1>Watch & Earn</h1>
      {user && (
        <div className="points-display">
          Your Points: {user.points}
        </div>
      )}
      
      {selectedAd ? (
        <AdPlayer
          ad={ads.find(ad => ad.id === selectedAd)!}
          onComplete={() => handleAdComplete(selectedAd)}
          onClose={() => setSelectedAd(null)}
        />
      ) : (
        <>
          <div className="ads-remaining">
            {canWatchMore ? (
              <p>You can watch {3 - watchedToday.length} more ads today</p>
            ) : (
              <p>You've reached the daily limit. Come back tomorrow!</p>
            )}
          </div>
          
          <div className="ads-grid">
            {ads.map(ad => (
              <div 
                key={ad.id}
                className={`ad-card ${watchedToday.includes(ad.id) ? 'watched' : ''}`}
              >
                <img src={ad.imageUrl} alt={ad.title} className="ad-thumbnail" />
                <h3>{ad.title}</h3>
                <p>{ad.description}</p>
                <button
                  onClick={() => setSelectedAd(ad.id)}
                  disabled={!canWatchMore || watchedToday.includes(ad.id)}
                >
                  {watchedToday.includes(ad.id) ? 'Watched' : `Watch for ${ad.points} pts`}
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Ads;
