'use client';
import { useState } from 'react';
import { useTargetCalculator } from '@components/calculator/TargetCalculator/hooks/useTargetCalculator';
import { TargetCalculatorFormData } from '@components/calculator/TargetCalculator/types/index';
import { TargetCalculatorForm } from '@components/calculator/TargetCalculator/components/TargetForm';
import { CalculatorInfo } from '../shared/CalculatorInfo';
import './targetCalculator.scss';

export const TargetCalculator = () => {
	const [showInfo, setShowInfo] = useState(false);
	const {
		results,
		currentPrice,
		fetchCurrentPrice,
		calculateTarget,
		resetResults,
	} = useTargetCalculator();

	const handleToggleInfo = () => {
		setShowInfo((prev) => !prev);
	};

	const handleSubmit = (data: TargetCalculatorFormData) => {
		calculateTarget(data);
	};

	return (
		<section className="target-calculator">
			<div className="calculator">
				<div className="calculator-header">
					<h2>Target Calculator</h2>
					<button
						onClick={handleToggleInfo}
						className={`more-info ${showInfo ? 'active' : ''}`}>
						?
					</button>
				</div>
				<TargetCalculatorForm
					onCoinChange={fetchCurrentPrice}
					onSubmit={handleSubmit}
				/>

				<div className="results">
					<div className="current-price">
						<span>Current Price</span>
						{results && <span className="value">${currentPrice.toFixed(2)}</span>}
					</div>
					<div className="current-value">
						<span>Current Value</span>
						{results && (
							<span className="value">${results.currentValue.toFixed(2)}</span>
						)}
					</div>
					<div className="investment">
						<span>Investment</span>
						{results && (
							<span className="value">${results.investment.toFixed(2)}</span>
						)}
					</div>
					<div className="target-value">
						<span>Target Value</span>
						{results && (
							<span className="value">${results.targetValue.toFixed(2)}</span>
						)}
					</div>
					<div
						className={`current-profit ${
							results
								? results.currentProfit >= 0
									? 'positive'
									: 'negative'
								: ''
						}`}>
						<span>Current Profit</span>
						{results && (
							<span className="value">${results.currentProfit.toFixed(2)}</span>
						)}
					</div>
					<div className="target-profit">
						<span>Target Profit</span>
						{results && (
							<span className="value">${results.targetProfit.toFixed(2)}</span>
						)}
					</div>
					<div
						className={`current-roi ${
							results ? (results.currentROI >= 0 ? 'positive' : 'negative') : ''
						}`}>
						<span>Current ROI</span>
						{results && (
							<span className="value">${results.currentROI.toFixed(2)}%</span>
						)}
					</div>
					<div className="target-roi">
						<span>Target ROI</span>
						{results && (
							<span className="value">${results.targetROI.toFixed(2)}%</span>
						)}
					</div>
					<div className="percent-to-target">
						<span>% to Target</span>
						{results && (
							<span className="value">${results.percentToTarget.toFixed(2)}%</span>
						)}
					</div>

					{results && (
						<button className="reset-btn" onClick={resetResults}>
							Reset
						</button>
					)}
				</div>
			</div>
			{showInfo && <CalculatorInfo type="target" />}
		</section>
	);
};
