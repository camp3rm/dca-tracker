'use client';
import React, { useEffect, useMemo } from 'react';
import '../tables/table.scss';
import TransactionRow from './TransactionRow';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@store/store';
import {
	fetchPriceStart,
	fetchPriceSuccess,
	fetchPriceFailure,
} from '@store/coinsSlice';

export default function DcaTable() {
	const dispatch = useDispatch<AppDispatch>();
	const transactions = useSelector(
		(state: RootState) => state.transaction.transactions
	);
	const coinsPrices = useSelector((state: RootState) => state.coins.prices);

	useEffect(() => {
		const updatePrices = async () => {
			const uniqueCoins = [
				...new Set(transactions.map((t) => `${t.cryptoName}USDT`)),
			];

			console.log(`🔄 Оновлення цін для ${uniqueCoins.length} монет...`);

			for (const symbol of uniqueCoins) {
				dispatch(fetchPriceStart(symbol));
				try {
					const res = await fetch(`/api/binance/${symbol}`);
					if (!res.ok) {
						const errorData = await res.json();
						throw new Error(errorData.error || 'Failed to fetch price');
					}

					const data = await res.json();
					const price = parseFloat(data.price) || 0;

					dispatch(fetchPriceSuccess({ symbol, price }));

					await new Promise((resolve) => setTimeout(resolve, 50));
				} catch (err) {
					console.error(`❌ Помилка отримання ціни для ${symbol}:`, err);
					dispatch(
						fetchPriceFailure({
							symbol,
							error: err instanceof Error ? err.message : 'Unknown error',
						})
					);
				}
			}

			console.log('✅ Оновлення цін завершено');
		};

		if (transactions.length > 0) {
			updatePrices();
			const interval = setInterval(updatePrices, 60000);

			return () => {
				clearInterval(interval);
				console.log('🛑 Автооновлення цін зупинено');
			};
		}
	}, [transactions, dispatch]);

	const groupedData = useMemo(() => {
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

			if (
				new Date(transaction.date) < new Date(grouped[coin].firstPurchaseDate)
			) {
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
				const percentToTarget =
					((targetPrice - currentPrice) / currentPrice) * 100;

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
	}, [transactions, coinsPrices]);

	if (transactions.length === 0) {
		return (
			<div className="dca-table-empty">
				<p>No transactions. Add the first transaction!</p>
			</div>
		);
	}

	return (
		<div className="dca-table-wrapper">
			<div className="portfolio-stats">
				<div className="stat-card">
					<span className="stat-label">Total coins</span>
					<span className="stat-value">{groupedData.length}</span>
				</div>
				<div className="stat-card">
					<span className="stat-label">Total investments</span>
					<span className="stat-value">
						$
						{groupedData
							.reduce((sum, item) => sum + item.invested, 0)
							.toFixed(2)}
					</span>
				</div>
				<div className="stat-card">
					<span className="stat-label">Current value</span>
					<span className="stat-value">
						$
						{groupedData
							.reduce((sum, item) => sum + item.currentValue, 0)
							.toFixed(2)}
					</span>
				</div>
				<div className="stat-card">
					<span className="stat-label">Total profit</span>
					<span
						className={`stat-value ${
							groupedData.reduce((sum, item) => sum + item.profit, 0) >= 0
								? 'positive'
								: 'negative'
						}`}>
						$
						{groupedData.reduce((sum, item) => sum + item.profit, 0).toFixed(2)}
					</span>
				</div>
			</div>

			<table className="dca-table">
				<thead className="header">
					<tr className="header__row">
						<th className="header__item header__item--date">First Purchase</th>
						<th className="header__item header__item--symbol">Coin</th>
						<th className="header__item header__item--invested">
							Total Invested
						</th>
						<th className="header__item header__item--amount">Total Amount</th>
						<th className="header__item header__item--buy__price">
							Avg Entry Price
						</th>
						<th className="header__item header__item--current__price">
							Current Price
						</th>
						<th className="header__item header__item--current__value">
							Current Value
						</th>
						<th className="header__item header__item--profit">Profit</th>
						<th className="header__item header__item--roi">ROI</th>
						<th className="header__item header__item--target__3x">Target 3x</th>
						<th className="header__item header__item--target__5x">Target 5x</th>
						<th className="header__item header__item--target__10x">
							Target 10x
						</th>
					</tr>
				</thead>
				<tbody className="body">
					{groupedData.map((item) => (
						<TransactionRow
							key={item.id}
							item={item}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
}
