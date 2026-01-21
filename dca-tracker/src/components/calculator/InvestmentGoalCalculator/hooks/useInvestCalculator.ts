import { useState } from 'react';
import { GoalCalculatorFormData, GoalCalculatorResults } from '../types/index';

export const useInvestmentGoalCalculator = () => {
	const [results, setResults] = useState<GoalCalculatorResults | null>(null);

	const calculateGoal = (data: GoalCalculatorFormData) => {
		const targetPrice =
			data.currentPrice * parseFloat(data.targetMultiplier.replace('x', ''));
		const coinsNeeded = data.goalAmount / targetPrice;
		const investmentNeeded = coinsNeeded*data.currentPrice
		const potentialProfit = data.goalAmount - investmentNeeded;

		setResults({
			targetPrice,
			coinsNeeded,
			investmentNeeded,
			potentialProfit,
		});
	};

	const resetResults = () => {
		setResults(null);
	};

	return {
		results,
		calculateGoal,
		resetResults,
	};
};
