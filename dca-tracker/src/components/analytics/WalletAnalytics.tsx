import React from 'react';
import './analytics.scss';

export default function WalletAnalytics() {
	return (
		<section className="wallet-analytics">
			<h1 className="wallet-analytics__title">Wallet Analytics</h1>

			<div className="wallet-analytics__table">
				<div className="column__name">
					<span className="column__name__item column__name__item--invested">
						Total investment
					</span>
					<span className="column__name__item column__name__item--current">
						Current value
					</span>
					<span className="column__name__item column__name__item--profit">
						Profit
					</span>
					<span className="column__name__item column__name__item--roi">
						ROI
					</span>
				</div>

				<div className="column__value">
					<span className="column__value__item column__value__item--invested">
						10
					</span>
					<span className="column__value__item column__value__item--current">
						28
					</span>
					<span className="column__value__item column__value__item--profit">
						27
					</span>
					<span className="column__value__item column__value__item--roi">
						4
					</span>
				</div>
			</div>

			<div className="wallet-analytics__chart"></div>
		</section>
	);
}
