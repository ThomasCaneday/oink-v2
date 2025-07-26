import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk';

interface RampConfig {
  swapAmount?: number;
  swapAsset?: string;
  userAddress: string;
  hostApiKey: string;
}

export const rampService = {
  show({ swapAmount, swapAsset = 'ETH', userAddress, hostApiKey }: RampConfig) {
    new RampInstantSDK({
      hostApiKey,
      hostAppName: 'Oink',
      swapAmount: swapAmount?.toString(),
      swapAsset,
      userAddress,
    }).show();
  },
};
