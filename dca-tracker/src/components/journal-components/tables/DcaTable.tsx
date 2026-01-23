'use client';
import React, { useEffect } from 'react';
import '../tables/table.scss';
import TransactionRow from './TransactionRow';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '@store/store';
import { fetchMultiplePrices } from '@store/coinsSlice';
import {
	selectTransactions,
	selectUniqueCoinsKey,
	selectGroupedTransactions,
	selectPortfolioStats,
} from '@store/selectors';

export default function DcaTable() {
	const dispatch = useDispatch<AppDispatch>();
	const transactions = useSelector(selectTransactions);
	const uniqueCoinsKey = useSelector(selectUniqueCoinsKey);
	const groupedData = useSelector(selectGroupedTransactions);
	const portfolioStats = useSelector(selectPortfolioStats);

	useEffect(() => {
		if (!uniqueCoinsKey) return;

		const symbols = uniqueCoinsKey.split(',').filter(Boolean).map(coin => `${coin}USDT`);
		if (symbols.length === 0) return;

		dispatch(fetchMultiplePrices(symbols));

		const interval = setInterval(() => {
			dispatch(fetchMultiplePrices(symbols));
		}, 60000);

		return () => clearInterval(interval);
	}, [uniqueCoinsKey, dispatch]);

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
					<span className="stat-value">{portfolioStats.totalCoins}</span>
				</div>
				<div className="stat-card">
					<span className="stat-label">Total investments</span>
					<span className="stat-value">
						${portfolioStats.totalInvested.toFixed(2)}
					</span>
				</div>
				<div className="stat-card">
					<span className="stat-label">Current value</span>
					<span className="stat-value">
						${portfolioStats.currentValue.toFixed(2)}
					</span>
				</div>
				<div className="stat-card">
					<span className="stat-label">Total profit</span>
					<span
						className={`stat-value ${
							portfolioStats.totalProfit >= 0 ? 'positive' : 'negative'
						}`}>
						${portfolioStats.totalProfit.toFixed(2)}
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
