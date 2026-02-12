

export type TargetMultiplier = '2x' | '3x' | '5x' | '10x';

export interface ProfitCalculatorFormData {
  currentPrice: number;
  amountOwned: number;
  targetMultiplier: TargetMultiplier;
}

export interface ProfitCalculatorResults {
  currentValue: number;
  targetPrice: number;
  futureValue: number;
  profit: number;
  roi: number;
}