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
					<h2>Investment Goal Calculator</h2>
					<InvestmentGoalCalculatorForm onSubmit={handleSubmit} />
		
					{/* {results && ( */}
						<div className="results">
							<div className='investment-value'>
								<span>Investment Needed</span>
								{results && <span className='value'>${results.investmentNeeded.toFixed(2)}</span>}
							</div>
							<div className='coins-needed'>
								<span>Coins to Buy</span>
								{results && <span className='value'>${results.coinsNeeded.toFixed(2)}</span>}
							</div>
							<div className='target-price'>
								<span>Target Price</span>
								{results && <span className='value'>${results.targetPrice.toFixed(2)}</span>}
							</div>
							<div className='potential-profit'>
								<span>Potential Profit</span>
								{results && <span className='value'>${results.potentialProfit.toFixed(2)}</span>}
							</div>

							{results && (
								<button className='reset-btn' onClick={resetResults}>
									Reset
								</button>
							)}
						</div>
					{/* )} */}
				</section>
	);
};
