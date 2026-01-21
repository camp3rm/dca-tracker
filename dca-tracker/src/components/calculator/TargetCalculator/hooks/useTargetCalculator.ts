import { useState } from 'react';
import {
	TargetCalculatorFormData,
	TargetCalculatorResults,
} from '../types/index';

export const useTargetCalculator = () => {
	  const [results, setResults] = useState<TargetCalculatorResults | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number>(0);

		const fetchCurrentPrice = async (coinSymbol: string) => {
    try {
      const res = await fetch(`/api/binance/${coinSymbol}USDT`);
      const data = await res.json();
      setCurrentPrice(parseFloat(data.price));
    } catch (error) {
      console.error('Error fetching price:', error);
    }
  };

	const calculateTarget = (data: TargetCalculatorFormData) => {
    const currentValue = data.amountOwned * currentPrice;
    const investment = data.amountOwned * data.averageEntry;
    const targetValue = data.amountOwned * data.targetPrice;
    const currentProfit = currentValue - investment;
    const targetProfit = targetValue - investment;
    const currentROI = (currentProfit / investment) * 100;
    const targetROI = (targetProfit / investment) * 100;
    const percentToTarget = ((data.targetPrice - currentPrice) / currentPrice) * 100;

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
  };

	return {
    results,
    currentPrice,
    fetchCurrentPrice,
    calculateTarget,
    resetResults,
  };
};
