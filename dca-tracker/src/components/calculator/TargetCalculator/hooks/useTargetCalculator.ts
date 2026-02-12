import { useState } from 'react';
import {
	TargetCalculatorFormData,
	TargetCalculatorResults,
} from '../types/index';

export const useTargetCalculator = () => {
	const [results, setResults] = useState<TargetCalculatorResults | null>(null);
	const [currentPrice, setCurrentPrice] = useState<number>(0);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const fetchCurrentPrice = async (coinSymbol: string) => {
    setIsLoading(true);
    setError(null);
		try {
			const res = await fetch(`/api/binance/${coinSymbol}USDT`);
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("Coin not found. Please select another coin.");
        }
        if (res.status === 500) {
          throw new Error("Server error. Please try again later.");
        }
        throw new Error("Failed to fetch price. Please try again.");
      }
			const data = await res.json();
			if (!data.price) {
        throw new Error("Price data is missing. Please try again.");
      }
      
      const price = parseFloat(data.price);
      
      if (isNaN(price)) {
        throw new Error("Invalid price data received.");
      }
      
      setCurrentPrice(price);
		} catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Unknown error occurred";
      setError(errorMessage);
      setCurrentPrice(0);
      
    } finally {
      setIsLoading(false);
    }
	};

	const calculateTarget = (data: TargetCalculatorFormData) => {
    if (currentPrice === 0) {
      setError("Please select a coin first to fetch current price");
      return;
    }
    setError(null);
		const currentValue = data.amountOwned * currentPrice;
		const investment = data.amountOwned * data.averageEntry;
		const targetValue = data.amountOwned * data.targetPrice;
		const currentProfit = currentValue - investment;
		const targetProfit = targetValue - investment;
		const currentROI =
			investment !== 0 ? (currentProfit / investment) * 100 : 0;
		const targetROI = investment !== 0 ? (targetProfit / investment) * 100 : 0;
		const percentToTarget =
			currentPrice !== 0
				? ((data.targetPrice - currentPrice) / currentPrice) * 100
				: 0;

		setResults({
			currentPrice,
			currentValue,
			investment,
			targetValue,
			currentProfit,
			targetProfit,
			currentROI,
			targetROI,
			percentToTarget,
		});
	};

	const resetResults = () => {
		setResults(null);
		setCurrentPrice(0);
    setError(null);
	};

	return {
		results,
		currentPrice,
    error,
    setError,
    isLoading,
		fetchCurrentPrice,
		calculateTarget,
		resetResults,
	};
};
