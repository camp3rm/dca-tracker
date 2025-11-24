import usePortfolioData from '@/lib/api';
import React from 'react';
type Transaction = {
	id: string;
	date: string;
	coin: string;
	invested: number;
	amount: number;
	buyPrice: number;
	currentPrice: number;
	avgEntry: number;
	currentValue: number;
	profit: number;
	roi: number;
	targets: { x3: number; x5: number; x10: number };
	risks: { x3: string; x5: string; x10: string };
};
export default function TransactionRow({ item }: { item: Transaction }) {
	const data = usePortfolioData();

	return (
		<tr className="body__row">
			<td className="body__item body__item--date">{item.date}</td>
			<td className="body__item body__item--symbol">{item.coin}</td>
			<td className="body__item body__item--invested">{item.invested}</td>
			<td className="body__item body__item--amount">{item.amount}</td>
			<td className="body__item body__item--buy__price">
				{/* {item.buyPrice.toFixed(2)} */}
				{item.buyPrice}
			</td>
			<td className="body__item body__item--current__price">
				{/* {item.currentPrice.toFixed(2)} */}
				{item.currentPrice}
			</td>
			<td className="body__item body__item--average__entry">
				{/* {item.avgEntry.toFixed(2)} */}
				{item.avgEntry}
			</td>
			<td className="body__item body__item--current__value">
				{/* {item.currentValue.toFixed(2)} */}
				{item.currentValue}
			</td>
			<td className="body__item body__item--profit">{item.profit}</td>
			<td className="body__item body__item--roi">{item.roi}%</td>
			<td className="body__item body__item--target__3x">{item.targets.x3}</td>
			<td className="body__item body__item--target__5x">{item.targets.x5}</td>
			<td className="body__item body__item--target__10x">{item.targets.x10}</td>
		</tr>
	);
}
