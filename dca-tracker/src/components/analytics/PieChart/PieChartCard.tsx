import React from 'react';

export default function PieChartCard() {
	return (
		<>
			<div className="quotient__label">
				<h4 className="label-title">Tokens</h4>
				<span className="quotient__label--token">1</span>
				<span className="quotient__label--token">2</span>
				<span className="quotient__label--token">3</span>
				<span className="quotient__label--token">4</span>
				<span className="quotient__label--token">5</span>
				<span className="quotient__label--token">6</span>
				<span className="quotient__label--token">7</span>
			</div>
			<div className="quotient__value">
				<h4 className="value-title">%</h4>
				<span className="quotient__value--token">10</span>
				<span className="quotient__value--token">10</span>
				<span className="quotient__value--token">10</span>
				<span className="quotient__value--token">10</span>
				<span className="quotient__value--token">10</span>
				<span className="quotient__value--token">10</span>
				<span className="quotient__value--token">10</span>
			</div>
		</>
	);
}
