export interface Coin {
  symbol: string;
  name: string;
  icon: string;
}

export const supportedCoins: Coin[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=025'
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=025'
  }
];
