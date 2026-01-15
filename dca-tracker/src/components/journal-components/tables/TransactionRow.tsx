import React, { useState } from 'react';

interface TransactionRowProps {
	item: {
		id: string;
		date: string;
		coin: string;
		invested: number;
		amount: number;
		buyPrice: number;
		allPurchasePrices?: number[];
		transactionsCount?: number;
		currentPrice: number;
		avgEntry: number;
		currentValue: number;
		profit: number;
		roi: number;
		targets: { x3: number; x5: number; x10: number };
		risks: { x3: string; x5: string; x10: string };
	};
}

export default function TransactionRow({ item }: TransactionRowProps) {
	const [showTooltip, setShowTooltip] = useState(false);

	const formatCurrency = (value: number) => {
		return `$${value.toFixed(2)}`;
	};

	const formatAmount = (value: number) => {
		return value.toFixed(6);
	};

	const formatROI = (value: number) => {
		return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
	};

	return (
		<tr className="body__row">
			<td className="body__item body__item--date">{item.date}</td>
			<td className="body__item body__item--symbol">
				{item.coin}
				{item.transactionsCount && item.transactionsCount > 1 && (
					<span className="transactions-badge">{item.transactionsCount}x</span>
				)}
			</td>
			<td className="body__item body__item--invested">
				{formatCurrency(item.invested)}
			</td>
			<td className="body__item body__item--amount">
				{formatAmount(item.amount)}
			</td>
			<td
				className="body__item body__item--buy__price"
				onMouseEnter={() => setShowTooltip(true)}
				onMouseLeave={() => setShowTooltip(false)}
				style={{ position: 'relative' }}>
				{formatCurrency(item.buyPrice)}
				{showTooltip &&
					item.allPurchasePrices &&
					item.allPurchasePrices.length > 1 && (
						<div className="price-tooltip">
							<div className="tooltip-header">Всі покупки:</div>
							{item.allPurchasePrices.map((price, index) => (
								<div
									key={index}
									className="tooltip-price">
									{index + 1}. {formatCurrency(price)}
								</div>
							))}
						</div>
					)}
			</td>
			<td className="body__item body__item--current__price">
				{formatCurrency(item.currentPrice)}
			</td>
			<td className="body__item body__item--current__value">
				{formatCurrency(item.currentValue)}
			</td>
			<td
				className={`body__item body__item--profit ${
					item.profit >= 0 ? 'positive' : 'negative'
				}`}>
				{formatCurrency(item.profit)}
			</td>
			<td
				className={`body__item body__item--roi ${
					item.roi >= 0 ? 'positive' : 'negative'
				}`}>
				{formatROI(item.roi)}
			</td>
			<td className="body__item body__item--target__3x">
				{formatCurrency(item.targets.x3)}
				<span className={`risk-badge risk-badge--${item.risks.x3}`}>
					{item.risks.x3}
				</span>
			</td>
			<td className="body__item body__item--target__5x">
				{formatCurrency(item.targets.x5)}
				<span className={`risk-badge risk-badge--${item.risks.x5}`}>
					{item.risks.x5}
				</span>
			</td>
			<td className="body__item body__item--target__10x">
				{formatCurrency(item.targets.x10)}
				<span className={`risk-badge risk-badge--${item.risks.x10}`}>
					{item.risks.x10}
				</span>
			</td>
		</tr>
	);
}
