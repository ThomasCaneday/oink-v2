export interface Ad {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  points: number;
}

export const ads: Ad[] = [
  {
    id: 'ad1',
    title: 'Learn About DeFi',
    description: 'Discover the world of decentralized finance',
    imageUrl: '/ads/defi.png',
    points: 25
  },
  {
    id: 'ad2',
    title: 'NFT Revolution',
    description: 'Understanding digital collectibles',
    imageUrl: '/ads/nft.png',
    points: 25
  },
  {
    id: 'ad3',
    title: 'Crypto Security',
    description: 'Keep your assets safe',
    imageUrl: '/ads/security.png',
    points: 25
  }
];
