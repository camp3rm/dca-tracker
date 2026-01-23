import React from 'react';
import { useDCASimulator } from './hooks/useDCASimulator';
import { DCASimulatorForm } from './components/DCASimulatorForm';
import { DCASimulatorFormData } from './types/types';
import './dcasomulator.scss';
export const DCASimulator = () => {
	const handleSubmit = (data: DCASimulatorFormData) => {
		calculateDCA(data);
	};

	const { results, calculateDCA, resetResults } = useDCASimulator();

	return (
		<section className="simulator-calculator">
			<h2>DCASimulator</h2>
			<DCASimulatorForm onSubmit={handleSubmit} />

			<div className="results">
				<div className="final-investment">
					<span>Final Invested</span>
					{results && (
						<span className="value">${results.finalInvested.toFixed(2)}</span>
					)}
				</div>
				<div className="final-value">
					<span>Final Value</span>
					{results && (
						<span className="value">${results.finalValue.toFixed(2)}</span>
					)}
				</div>
				<div className="total-profit">
					<span>Total Profit</span>
					{results && (
						<span className="value">${results.totalProfit.toFixed(2)}</span>
					)}
				</div>
				<div className="total-roi">
					<span>Total ROI %t</span>
					{results && (
						<span className="value">${results.totalROI.toFixed(2)}</span>
					)}
				</div>

				{results && (
					<button
						className="reset-btn"
						onClick={resetResults}>
						Reset
					</button>
				)}
			</div>

			<table className="results-table">
				<thead className="table-header">
					<tr className="table-row">
						<th className="table-header-cell">Month</th>
						<th className="table-header-cell">Total Invested</th>
						<th className="table-header-cell">Current Value</th>
						<th className="table-header-cell">Profit</th>
						<th className="table-header-cell">ROI %</th>
					</tr>
				</thead>
				<tbody className="table-body">
					{results?.monthlyResults.map((month) => (
						<tr
							className="table-row"
							key={month.month}>
							<td className="table-data-cell">{month.month}</td>
							<td className="table-data-cell">
								${month.totalInvested.toFixed(2)}
							</td>
							<td className="table-data-cell">
								${month.currentValue.toFixed(2)}
							</td>
							<td
								className={`table-data-cell ${
									month.profit >= 0 ? 'positive' : 'negative'
								}`}>
								{' '}
								${month.profit.toFixed(2)}
							</td>
							<td className="table-data-cell">{month.roi.toFixed(2)}%</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
};
