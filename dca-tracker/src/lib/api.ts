import { useState, useEffect } from 'react';

export interface PortfolioItem {
	coin: string;
	currentPriceUSD: number;
}
const symbol = 'BTCUSDT';
export default function usePortfolioData() {
	const [tackerData, setTrackerData] = useState<PortfolioItem[]>([]);
	useEffect(() => {
		

		const fetchTickerData = async () => {
			try {
				const response = await fetch(`https://api.binance.com/api/v3/ticker?symbol=${symbol}`);
				const data = await response.json();
				console.log(data);
		
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchTickerData();
		const interval = setInterval(fetchTickerData, 60000);

		return () => clearInterval(interval);
	}, []);

	return tackerData;
}
