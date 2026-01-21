import React from 'react';
import {useInvestmentGoalCalculator} from '@/components/calculator/InvestmentGoalCalculator/hooks/useInvestCalculator'
import {InvestmentGoalCalculatorForm} from '@components/calculator/InvestmentGoalCalculator/components/InvestmentForm';
import {GoalCalculatorFormData} from '@components/calculator/InvestmentGoalCalculator/types/index'
import './goalCalculator.scss'

export const InvestmentGoalCalculator = () => {
	const {results,
		calculateGoal,
		resetResults} = useInvestmentGoalCalculator();

		const handleSubmit = (data: GoalCalculatorFormData) => {
				calculateGoal({ ...data, targetMultiplier: data.targetMultiplier });
			};

	return (
		<section className='invest-calculator'>
					<h2>Feature Profit Calculator</h2>
					<InvestmentGoalCalculatorForm onSubmit={handleSubmit} />
		
					{/* {results && ( */}
						<div className="results">
							<p className='investment-value'>Investment Needed{ results && `: ${results.investmentNeeded.toFixed(2)}`}</p>
							<p className='coins-needed'>Coins to Buy{ results && `: ${results.coinsNeeded.toFixed(2)}`}</p>
							<p className='target-price'>Target Price{results && `: ${results.targetPrice.toFixed(2)}`}</p>
							<p className='potential-profit'>Potential Profit{ results && `: ${results.potentialProfit.toFixed(2)}`}</p>
		
							{results && <button className='reset-btn' onClick={resetResults}>Reset</button> }
						</div>
					{/* )} */}
				</section>
	);
};
