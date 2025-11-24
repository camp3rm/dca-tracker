import React from 'react';
import {mockTransaction} from "@/mocks/mockTransaction"

export default function KpiCard() {

	return (
		<>
		<div className="kpi-column">
					<div className="kpi-column__labels">
						<span className="kpi-column__label kpi-column__label--invested">
							Total investment
						</span>

						<span className="kpi-column__value kpi-column__value--current">
							100
						</span>
					</div>
					<div className="kpi-column__values">
						<span className="kpi-column__label kpi-column__label--current">
							Current value
						</span>
						<span className="kpi-column__value kpi-column__value--invested">
							120
						</span>
					</div>
				</div>
				<div className="kpi-column">
					<div className="kpi-column__labels">
						<span className="kpi-column__label kpi-column__label--profit">
							Profit
						</span>
						<span className="kpi-column__value kpi-column__value--profit">
							20
						</span>
					</div>
					<div className="kpi-column__values">
						<span className="kpi-column__label kpi-column__label--tokens">
							Total tokens
						</span>
						<span className="kpi-column__value kpi-column__value--tokens">
							4
						</span>
					</div>
				</div>
		</>
	)
}
