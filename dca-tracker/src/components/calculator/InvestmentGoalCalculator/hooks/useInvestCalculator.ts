import { useState } from 'react';
import { GoalCalculatorFormData, GoalCalculatorResults } from '../types/index';

export const useInvestmentGoalCalculator = () => {
	const [results, setResults] = useState<GoalCalculatorResults | null>(null);
	const [error, setError] = useState<string | null>(null);


	const calculateGoal = (data: GoalCalculatorFormData) => {
		try {
			const multiplierValue = parseFloat(data.targetMultiplier.replace('x', ''));
    
    if (isNaN(multiplierValue)) {
      throw new Error("Invalid multiplier value");
    }

    const targetPrice = data.currentPrice * multiplierValue;
    const coinsNeeded = data.goalAmount / targetPrice;
    
    if (!isFinite(coinsNeeded)) {
      throw new Error("Target price is too low for this goal");
    }
    
    const investmentNeeded = coinsNeeded * data.currentPrice;
    const potentialProfit = data.goalAmount - investmentNeeded;
    
    if (potentialProfit < 0) {
      throw new Error("Goal is not achievable with this multiplier. Try a higher multiplier.");
    }

    setResults({
      targetPrice,
      coinsNeeded,
      investmentNeeded,
      potentialProfit,
    });
    setError(null);
		} catch (error) {
			 const errorMessage = error instanceof Error 
      ? error.message 
      : "Calculation failed";
    setError(errorMessage);
    setResults(null);
		}
	};

	const resetResults = () => {
		setResults(null);
	};

	return {
		results,
		error,
		setError,
		calculateGoal,
		resetResults,
	};
};
