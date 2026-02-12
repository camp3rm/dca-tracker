'use client';
import { useState } from 'react';
import { useInvestmentGoalCalculator } from '@/components/calculator/InvestmentGoalCalculator/hooks/useInvestCalculator';
import { InvestmentGoalCalculatorForm } from '@components/calculator/InvestmentGoalCalculator/components/InvestmentForm';
import { GoalCalculatorFormData } from '@components/calculator/InvestmentGoalCalculator/types/index';
import { CalculatorInfo } from '../shared/CalculatorInfo';
import './goalCalculator.scss';
import '../errorAlert.scss'


export const InvestmentGoalCalculator = () => {
	const [showInfo, setShowInfo] = useState(false);
	const { results, calculateGoal, resetResults, error, setError } = useInvestmentGoalCalculator();

	const handleToggleInfo = () => {
		setShowInfo((prev) => !prev);
	};

	const handleSubmit = (data: GoalCalculatorFormData) => {
		calculateGoal({ ...data, targetMultiplier: data.targetMultiplier });
	};

	return (
		<section className="invest-calculator">
			<div className="calculator">
				<div className="calculator-header">
					<h2>Investment Goal Calculator</h2>
					<button
						onClick={handleToggleInfo}
						className={`more-info ${showInfo ? 'active' : ''}`}>
						?
					</button>
				</div>

				{error && (
        <div className="error-alert">
          <span className="error-icon">⚠️</span>
          <span className="error-message">{error}</span>
          <button 
            className="error-close" 
            onClick={() => setError(null)}
          >
            ×
          </button>
        </div>
      )}
				<InvestmentGoalCalculatorForm onSubmit={handleSubmit} />

				<div className="results">
					<div className="investment-value">
						<span>Investment Needed</span>
						{results && (
							<span className="value">${results.investmentNeeded.toFixed(2)}</span>
						)}
					</div>
					<div className="coins-needed">
						<span>Coins to Buy</span>
						{results && (
							<span className="value">${results.coinsNeeded.toFixed(2)}</span>
						)}
					</div>
					<div className="target-price">
						<span>Target Price</span>
						{results && (
							<span className="value">${results.targetPrice.toFixed(2)}</span>
						)}
					</div>
					<div className="potential-profit">
						<span>Potential Profit</span>
						{results && (
							<span className="value">${results.potentialProfit.toFixed(2)}</span>
						)}
					</div>

					{results && (
						<button className="reset-btn" onClick={resetResults}>
							Reset
						</button>
					)}
				</div>
			</div>
			{showInfo && <CalculatorInfo type="investmentGoal" />}
		</section>
	);
};
