import React from 'react';
import { useProfitCalculator } from '@components/calculator/FutureProfitCalculator/hooks/useProfitCalculator';
import { ProfitCalculatorForm } from '@components/calculator/FutureProfitCalculator/components/ProfitForm';
import { ProfitCalculatorFormData } from '@components/calculator/FutureProfitCalculator/types/index';

export const FutureProfitCalculator = () => {
	const { results, calculateProfit, resetResults } = useProfitCalculator();
	const handleSubmit = (data: ProfitCalculatorFormData) => {
		calculateProfit({ ...data, targetMultiplier: data.targetMultiplier });
	};

	return (
		<>
			<h2>Feature Profit Calculator</h2>
			<ProfitCalculatorForm onSubmit={handleSubmit} />

			{results && (
				<div className="results">
					<p>Current Value: {results.currentValue.toFixed(2)}</p>
					<p>Target Price: {results.targetPrice.toFixed(2)}</p>
					<p>Future Value: {results.futureValue.toFixed(2)}</p>
					<p>Profit: {results.profit.toFixed(2)}</p>

					<button onClick={resetResults}>Reset</button>
				</div>
			)}
		</>
	);
};
