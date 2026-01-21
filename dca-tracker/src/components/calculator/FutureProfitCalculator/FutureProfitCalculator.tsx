import React from 'react';
import { useProfitCalculator } from '@components/calculator/FutureProfitCalculator/hooks/useProfitCalculator';
import { ProfitCalculatorForm } from '@components/calculator/FutureProfitCalculator/components/ProfitForm';
import { ProfitCalculatorFormData } from '@components/calculator/FutureProfitCalculator/types/index';
import './profitCalculator.scss'
export const FutureProfitCalculator = () => {
	const { results, calculateProfit, resetResults } = useProfitCalculator();
	const handleSubmit = (data: ProfitCalculatorFormData) => {
		calculateProfit({ ...data, targetMultiplier: data.targetMultiplier });
	};

	return (
		<section className='profit-calculator'>
			<h2>Feature Profit Calculator</h2>
			<ProfitCalculatorForm onSubmit={handleSubmit} />

			{/* {results && ( */}
				<div className="results">
					<p className='current-value'>Current Value{ results && `: ${results.currentValue.toFixed(2)}`}</p>
					<p className='target-price'>Target Price{ results && `: ${results.targetPrice.toFixed(2)}`}</p>
					<p className='future-value'>Future Value{results && `: ${results.futureValue.toFixed(2)}`}</p>
					<p className='profit'>Profit{ results && `: ${results.profit.toFixed(2)}`}</p>

					{results && <button className='reset-btn' onClick={resetResults}>Reset</button> }
				</div>
			{/* )} */}
		</section>
	);
};
