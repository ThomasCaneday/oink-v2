export interface Reward {
  id: string;
  name: string;
  description: string;
  points: number;
  imageUrl: string;
}

export const rewards: Reward[] = [
  {
    id: 'nft-1',
    name: 'Exclusive Oink NFT',
    description: 'A unique digital collectible featuring our mascot',
    points: 1000,
    imageUrl: '/rewards/nft.png'
  },
  {
    id: 'sticker-pack',
    name: 'Digital Sticker Pack',
    description: 'A pack of crypto-themed digital stickers',
    points: 500,
    imageUrl: '/rewards/stickers.png'
  },
  {
    id: 'badge-1',
    name: 'Early Adopter Badge',
    description: 'Show off your early supporter status',
    points: 750,
    imageUrl: '/rewards/badge.png'
  },
  {
    id: 'theme-1',
    name: 'Dark Mode Theme',
    description: 'Unlock a sleek dark mode for the app',
    points: 1500,
    imageUrl: '/rewards/theme.png'
  },
  {
    id: 'avatar-1',
    name: 'Premium Avatar',
    description: 'Stand out with a special profile picture',
    points: 2000,
    imageUrl: '/rewards/avatar.png'
  }
];
