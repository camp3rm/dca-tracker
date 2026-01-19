import { useState } from 'react';
import {
	ProfitCalculatorResults,
	ProfitCalculatorFormData,
} from '../types/index';

export const useProfitCalculator = () => {
	const [results, setResults] = useState<ProfitCalculatorResults | null>(null);

	const calculateProfit = (data: ProfitCalculatorFormData) => {
		const currentValue = data.currentPrice * data.amountOwned;
		const targetPrice =
			data.currentPrice * parseFloat(data.targetMultiplier.replace('x', ''));
		const futureValue = targetPrice * data.amountOwned;
		const profit = futureValue - currentValue;
		setResults({
			currentValue,
			targetPrice,
			futureValue,
			profit,
		});
	};

	 const resetResults = () => {
    setResults(null);
  };

	return {
		results,
		calculateProfit,
		resetResults
	};
};
