import type { TransactionState } from '@store/transactionSlice';

interface CoinData {
  coin: string;
  totalInvested: number;
  totalCoins: number;
  currentValue: number;
  profit: number;
  roi: number;
  percentage: number;
}

export const processAnalyticsData = (
  transactions: TransactionState[],
  coinsPrices: Record<string, { price: number }>
): CoinData[] => {

  const grouped: Record<string, Omit<CoinData, 'percentage'>> = {};

  transactions.forEach(t => {
    if (!grouped[t.cryptoName]) {
      grouped[t.cryptoName] = {
        coin: t.cryptoName,
        totalInvested: 0,
        totalCoins: 0,
        currentValue: 0,
        profit: 0,
        roi: 0,
      };
    }

    grouped[t.cryptoName].totalInvested += t.amountPurchased;
    grouped[t.cryptoName].totalCoins += t.coinsNumber;
  });

  let totalPortfolioValue = 0;

  const coinsData = Object.values(grouped).map(coin => {
    const symbol = `${coin.coin}USDT`;
    const currentPrice = coinsPrices[symbol]?.price || 0;
    const currentValue = coin.totalCoins * currentPrice;
    const profit = currentValue - coin.totalInvested;
    const roi = coin.totalInvested > 0 ? (profit / coin.totalInvested) * 100 : 0;

    totalPortfolioValue += currentValue;

    return {
      ...coin,
      currentValue,
      profit,
      roi,
      percentage: 0,
    };
  });

  return coinsData.map(coin => ({
    ...coin,
    percentage: totalPortfolioValue > 0 ? (coin.currentValue / totalPortfolioValue) * 100 : 0,
  }));
};