import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { rampService } from '../services/rampService';
import { userService } from '../services/userService';
import { toastManager } from '../services/toastManager';
import { supportedCoins, type Coin } from '../data/coins';

const AMOUNT_OPTIONS = [5, 10, 20, 50, 100];

const Buy = () => {
  const { user: authUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<Coin>(supportedCoins[0]);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const handleBuy = async () => {
    if (!selectedAmount || !authUser?.metadata?.publicAddress) return;

    try {
      setLoading(true);
      const user = await userService.getUser(authUser.metadata.publicAddress);
      
      if (user) {
        // Check if RAMP API key is available
        const rampKey = import.meta.env.VITE_RAMP_HOST_API_KEY;
        
        if (rampKey) {
          // Use real Ramp integration
          rampService.show({
            swapAmount: selectedAmount,
            swapAsset: selectedCoin.symbol,
            userAddress: user.walletAddress,
            hostApiKey: rampKey,
          });
        } else {
          // Mock mode - simulate successful purchase
          toastManager.showToast(`Simulated purchase of ${selectedCoin.symbol}`);
          
          // Add transaction to user's history (mock data)
          // In real implementation, this would be handled by Ramp's callback
          await userService.addTransaction({
            walletAddress: user.walletAddress,
            amount: selectedAmount,
            coin: selectedCoin.symbol,
            date: new Date(),
          });
        }

        // Award points (100 points per $10)
        const pointsToAward = Math.floor((selectedAmount / 10) * 100);
        await userService.updateUserPoints(user.walletAddress, pointsToAward);
        
        // Update streak
        await userService.updateStreak(user.walletAddress);
        
        toastManager.showToast(`Earned ${pointsToAward} points! 🎉`);
      }
    } catch (error) {
      console.error('Error during purchase:', error);
      toastManager.showToast('Error processing purchase');
    } finally {
      setLoading(false);
      setSelectedAmount(null);
    }
  };

  if (!authUser) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Buy Crypto</h2>
          <p className="mt-2 text-lg text-gray-600">Please log in to start investing.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Buy Crypto
        </h1>
        
        {/* Coin Selection */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Coin</h2>
          <div className="grid grid-cols-2 gap-4">
            {supportedCoins.map(coin => (
              <button
                key={coin.symbol}
                onClick={() => setSelectedCoin(coin)}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  selectedCoin.symbol === coin.symbol
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200'
                }`}
              >
                <div className="flex items-center">
                  <img src={coin.icon} alt={coin.name} className="w-8 h-8 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">{coin.name}</div>
                    <div className="text-sm text-gray-500">{coin.symbol}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Amount Selection */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Amount</h2>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
            {AMOUNT_OPTIONS.map(amount => (
              <button
                key={amount}
                onClick={() => setSelectedAmount(amount)}
                className={`py-3 px-4 rounded-lg border font-medium ${
                  selectedAmount === amount
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 text-gray-700 hover:border-blue-200'
                }`}
              >
                ${amount}
              </button>
            ))}
          </div>
        </div>

        {/* Buy Button */}
        <div className="text-center">
          <button
            onClick={handleBuy}
            disabled={loading || !selectedAmount}
            className={`inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
              loading || !selectedAmount
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </>
            ) : (
              `Buy ${selectedCoin.symbol}`
            )}
          </button>
        </div>

        {/* Points Info */}
        {selectedAmount && (
          <div className="mt-4 text-center text-sm text-gray-500">
            You'll earn {Math.floor((selectedAmount / 10) * 100)} points for this purchase!
          </div>
        )}
      </div>
    </div>
  );
};

export default Buy;
