export const COIN_MAPPING = {
	BTC: 'BTCUSDT',
	ETH: 'ETHUSDT',
	BNB: 'BNBUSDT',
	SOL: 'SOLUSDT',
	XRP: 'XRPUSDT',
	ADA: 'ADAUSDT',
	DOGE: 'DOGEUSDT',
	DOT: 'DOTUSDT',
	MATIC: 'MATICUSDT',
	AVAX: 'AVAXUSDT',
	LINK: 'LINKUSDT',
	WLD: 'WLDUSDT',
} as const;

export type SupportedCoin = keyof typeof COIN_MAPPING;
export type BinanceTicker = (typeof COIN_MAPPING)[SupportedCoin];

export const symbolToTicker = (symbol: SupportedCoin): BinanceTicker => {
  return COIN_MAPPING[symbol];
}