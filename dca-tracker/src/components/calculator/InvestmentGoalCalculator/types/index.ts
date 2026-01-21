export type TargetMultiplier = '2x' | '3x' | '5x' | '10x';

export interface GoalCalculatorFormData {
	goalAmount: number;
	currentPrice: number;
	targetMultiplier: TargetMultiplier;
}

export interface GoalCalculatorResults {
	investmentNeeded: number;
	coinsNeeded: number;
	targetPrice: number;
	potentialProfit: number;
}
