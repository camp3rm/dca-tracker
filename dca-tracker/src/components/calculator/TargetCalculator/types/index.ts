export interface TargetCalculatorFormData {
  coinSymbol: string;
  amountOwned: number;
  averageEntry: number;
  targetPrice: number;
}

export interface TargetCalculatorResults {
  currentPrice: number;
  currentValue: number;
  investment: number;
  targetValue: number;
  currentProfit: number;
  targetProfit: number;
  currentROI: number;
  targetROI: number;
  percentToTarget: number;
}