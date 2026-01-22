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
			<h2>Future Profit Calculator</h2>
			<ProfitCalculatorForm onSubmit={handleSubmit} />

			{/* {results && ( */}
				<div className="results">
					<div className='current-value'>
						<span>Current Value</span>
						{results && <span className='value'>${results.currentValue.toFixed(2)}</span>}
					</div>
					<div className='target-price'>
						<span>Target Price</span>
						{results && <span className='value'>${results.targetPrice.toFixed(2)}</span>}
					</div>
					<div className='future-value'>
						<span>Future Value</span>
						{results && <span className='value'>${results.futureValue.toFixed(2)}</span>}
					</div>
					<div className='profit'>
						<span>Profit</span>
						{results && <span className='value'>${results.profit.toFixed(2)}</span>}
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
