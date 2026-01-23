import { useState } from 'react';
import {
	DCASimulatorFormData,
	DCASimulatorResults,
	MonthlyResult,
} from '../types/types';
export const useDCASimulator = () => {
	const [results, setResults] = useState<DCASimulatorResults | null>(null);

	const calculateDCA = (data: DCASimulatorFormData) => {
		const monthlyRate = data.expectedROI / 100 / 12;
		let currentValue = data.initialInvestment;
		let totalInvested = data.initialInvestment;
		const monthlyResults: MonthlyResult[] = [];
		for (let month = 1; month <= data.duration; month++) {
			totalInvested += data.monthlyInvestment;
			currentValue = currentValue * (1 + monthlyRate) + data.monthlyInvestment;
			const profit = currentValue - totalInvested;
			const roi = (profit / totalInvested) * 100;
			monthlyResults.push({
				month,
				totalInvested,
				currentValue,
				profit,
				roi,
			});
		}
		setResults({
    monthlyResults,
    finalInvested: totalInvested,
    finalValue: currentValue,
    totalProfit: currentValue - totalInvested,
    totalROI: ((currentValue - totalInvested) / totalInvested) * 100,
  });
	};
	const resetResults = () => {
		setResults(null);};

	return {
		results,
		calculateDCA,
		resetResults,
	};
};
