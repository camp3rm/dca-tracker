import React from 'react';
import '@/styles/table.scss';
import TransactionRow from './TransactionRow';

export default function DcaTable() {
	const mockedData = [
		{
			date: '2025-11-01',
			coin: 'ETH',
			invested: 10,
			amount: 0.0025,
			buyPrice: 4000,
			currentPrice: 4200,
			avgEntry: 4050,
			currentValue: 10.5,
			profit: 0.5,
			roi: -5,
			targets: { x3: 30, x5: 50, x10: 100 },
			risks: { x3: 'low', x5: 'medium', x10: 'high' },
		},
		{
			date: '2025-11-01',
			coin: 'ETH',
			invested: 10,
			amount: 0.0025,
			buyPrice: 4000,
			currentPrice: 42010,
			avgEntry: 4050,
			currentValue: 100.5,
			profit: 0.15,
			roi: 5,
			targets: { x3: 30, x5: 50, x10: 100 },
			risks: { x3: 'low', x5: 'medium', x10: 'high' },
		},
	];
	return (
		<>
			<table className="dca-table">
				<thead className="header">
					<tr className="header__row">
						<th className="header__item header__item--date">Date</th>
						<th className="header__item header__item--symbol">Coin</th>
						<th className="header__item header__item--invested">Invested</th>
						<th className="header__item header__item--amount">Amount</th>
						<th className="header__item header__item--buy__price">
							Purchase price
						</th>
						<th className="header__item header__item--current__price">
							Current price
						</th>
						<th className="header__item header__item--average__entry">
							Average entry
						</th>
						<th className="header__item header__item--current__value">
							Current value
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
					{mockedData.map((item, index) => (
						<TransactionRow
							key={index}
							item={item}
						/>
					))}
				</tbody>
			</table>
		</>
	);
}
