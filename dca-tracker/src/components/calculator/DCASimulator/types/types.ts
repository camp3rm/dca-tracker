export interface DCASimulatorFormData {
  initialInvestment: number;
  monthlyInvestment: number;
  duration: number;
  expectedROI: number;
}

export interface MonthlyResult {
  month: number;
  totalInvested: number;
  currentValue: number;
  profit: number;
  roi: number;
}

export interface DCASimulatorResults {
  monthlyResults: MonthlyResult[];
  finalInvested: number;
  finalValue: number;
  totalProfit: number;
  totalROI: number;
}