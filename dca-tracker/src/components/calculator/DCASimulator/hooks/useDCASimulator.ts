import { useState } from 'react';
import {
	DCASimulatorFormData,
	DCASimulatorResults,
	MonthlyResult,
} from '../types/types';
export const useDCASimulator = () => {
	const [results, setResults] = useState<DCASimulatorResults | null>(null);
	const [error, setError] = useState<string | null>(null);



	const calculateDCA = (data: DCASimulatorFormData) => {
			try {
    const monthlyRate = data.expectedROI / 100 / 12;
    
    if (Math.abs(monthlyRate) > 0.5) {
      throw new Error("Expected ROI seems unrealistic (max ±50% per month)");
    }
    
    let currentValue = data.initialInvestment;
    let totalInvested = data.initialInvestment;
    const monthlyResults: MonthlyResult[] = [];
    
    for (let month = 1; month <= data.duration; month++) {
      totalInvested += data.monthlyInvestment;
      currentValue = currentValue * (1 + monthlyRate) + data.monthlyInvestment;
      
      if (!isFinite(currentValue) || isNaN(currentValue)) {
        throw new Error(`Calculation failed at month ${month}. Values became too large or invalid.`);
      }
      
      if (currentValue < 0) {
        throw new Error(`Portfolio value became negative at month ${month}. Check your ROI value.`);
      }
      
      const profit = currentValue - totalInvested;
      const roi = (profit / totalInvested) * 100;
      
      monthlyResults.push({ month, totalInvested, currentValue, profit, roi });
    }
    
    setResults({
      monthlyResults,
      finalInvested: totalInvested,
      finalValue: currentValue,
      totalProfit: currentValue - totalInvested,
      totalROI: ((currentValue - totalInvested) / totalInvested) * 100,
    });
    setError(null);} 
		catch(error) {
		const errorMessage = error instanceof Error 
      ? error.message 
      : "Calculation failed";
    setError(errorMessage);
	}

	};
	const resetResults = () => {
		setResults(null);};

	return {
		results,
		error,
		setError,
		calculateDCA,
		resetResults,
	};
};
