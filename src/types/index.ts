// src/types/index.ts
export interface UserMetadata {
  email: string;
  publicAddress: string;
  issuer: string;
}

export interface RampConfig {
  swapAmount?: number;
  swapAsset?: string;
  userAddress: string;
  hostApiKey: string;
}

declare module '@ramp-network/ramp-instant-sdk' {
  interface IHostConfig {
    hostApiKey: string;
    hostAppName: string;
    swapAmount?: string;
    swapAsset?: string;
    userAddress: string;
    hostLogoUrl: string;
  }
}
