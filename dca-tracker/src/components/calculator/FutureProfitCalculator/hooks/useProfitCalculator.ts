import { useState } from 'react';
import {
	ProfitCalculatorResults,
	ProfitCalculatorFormData,
} from '../types/index';

export const useProfitCalculator = () => {
	const [results, setResults] = useState<ProfitCalculatorResults | null>(null);
	const [error, setError] = useState<string | null>(null);

	const calculateProfit = (data: ProfitCalculatorFormData) => {
		try {
			const multiplierValue = parseFloat(data.targetMultiplier.replace('x', ''));
    
    if (isNaN(multiplierValue)) {
      throw new Error("Invalid multiplier value");
    }

    const currentValue = data.currentPrice * data.amountOwned;
    const targetPrice = data.currentPrice * multiplierValue;
    const futureValue = targetPrice * data.amountOwned;
    const profit = futureValue - currentValue;
    
    if (!isFinite(profit) || !isFinite(futureValue)) {
      throw new Error("Calculation resulted in invalid values. Please check your inputs.");
    }
    
    const roi = (profit / currentValue) * 100;
    
    if (isNaN(roi)) {
      throw new Error("Unable to calculate ROI. Please check your inputs.");
    }

    setResults({
      currentValue,
      targetPrice,
      futureValue,
      profit,
      roi,
    });
    setError(null);
		} catch (err) {
    const errorMessage = err instanceof Error 
      ? err.message 
      : "Calculation failed";
    setError(errorMessage);
    setResults(null);
  }
	};

	const resetResults = () => {
		setResults(null);
		setError(null);
	};

	return {
		results,
		error,
		setError,
		calculateProfit,
		resetResults,
	};
};
