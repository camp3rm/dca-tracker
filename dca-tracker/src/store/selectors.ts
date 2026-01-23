import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

export const selectTransactions = (state: RootState) => state.transaction.transactions;
export const selectCoinsPrices = (state: RootState) => state.coins.prices;
export const selectCoinsLoading = (state: RootState) => state.coins.loading;
export const selectCoinsErrors = (state: RootState) => state.coins.errors;

export const selectUniqueCoins = createSelector(
	[selectTransactions],
	(transactions) => [...new Set(transactions.map((t) => t.cryptoName))].sort()
);

export const selectUniqueCoinsKey = createSelector(
	[selectUniqueCoins],
	(coins) => coins.join(',')
);

export const selectGroupedTransactions = createSelector(
	[selectTransactions, selectCoinsPrices],
	(transactions, coinsPrices) => {
		const grouped: Record<
			string,
			{
				coin: string;
				transactions: typeof transactions;
				totalInvested: number;
				totalCoins: number;
				avgEntry: number;
				firstPurchaseDate: string;
				allPurchasePrices: number[];
			}
		> = {};

		transactions.forEach((transaction) => {
			const coin = transaction.cryptoName;
			if (!grouped[coin]) {
				grouped[coin] = {
					coin,
					transactions: [],
					totalInvested: 0,
					totalCoins: 0,
					avgEntry: 0,
					firstPurchaseDate: transaction.date,
					allPurchasePrices: [],
				};
			}

			grouped[coin].transactions.push(transaction);
			grouped[coin].totalInvested += transaction.amountPurchased;
			grouped[coin].totalCoins += transaction.coinsNumber;
			grouped[coin].allPurchasePrices.push(transaction.purchasePrice);

			if (new Date(transaction.date) < new Date(grouped[coin].firstPurchaseDate)) {
				grouped[coin].firstPurchaseDate = transaction.date;
			}
		});

		const result = Object.values(grouped).map((group) => {
			const symbol = `${group.coin}USDT`;
			const currentPrice = coinsPrices[symbol]?.price || 0;
			const avgEntry = group.totalInvested / group.totalCoins;
			const currentValue = group.totalCoins * currentPrice;
			const profit = currentValue - group.totalInvested;
			const roi = (profit / group.totalInvested) * 100;

			const target3x = avgEntry * 3;
			const target5x = avgEntry * 5;
			const target10x = avgEntry * 10;

			const getRiskLevel = (targetMultiplier: number) => {
				const targetPrice = avgEntry * targetMultiplier;
				const percentToTarget = ((targetPrice - currentPrice) / currentPrice) * 100;

				if (percentToTarget < 50) return 'low';
				if (percentToTarget < 150) return 'medium';
				return 'high';
			};

			return {
				id: group.coin,
				date: group.firstPurchaseDate,
				coin: group.coin,
				invested: group.totalInvested,
				amount: group.totalCoins,
				buyPrice: avgEntry,
				allPurchasePrices: group.allPurchasePrices,
				transactionsCount: group.transactions.length,
				currentPrice: currentPrice,
				avgEntry: avgEntry,
				currentValue: currentValue,
				profit: profit,
				roi: roi,
				targets: {
					x3: target3x,
					x5: target5x,
					x10: target10x,
				},
				risks: {
					x3: getRiskLevel(3),
					x5: getRiskLevel(5),
					x10: getRiskLevel(10),
				},
			};
		});

		return result.sort((a, b) => b.roi - a.roi);
	}
);

// Memoized: portfolio stats
export const selectPortfolioStats = createSelector(
	[selectGroupedTransactions],
	(groupedData) => ({
		totalCoins: groupedData.length,
		totalInvested: groupedData.reduce((sum, item) => sum + item.invested, 0),
		currentValue: groupedData.reduce((sum, item) => sum + item.currentValue, 0),
		totalProfit: groupedData.reduce((sum, item) => sum + item.profit, 0),
	})
);

// Memoized: check if any price is loading
export const selectIsAnyPriceLoading = createSelector(
	[selectCoinsLoading],
	(loading) => Object.values(loading).some(Boolean)
);
