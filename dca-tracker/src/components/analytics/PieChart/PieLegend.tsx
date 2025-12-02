import React from "react";

export default function PieLegend({ data }: { data: any[] }) {
	return (
		<div className="pie-legend">
			{data.map((item, index) => (
				<div key={item.name} className="pie-legend__item">
					<span 
						className="pie-legend__color" 
						style={{ backgroundColor: item.color }} 
					/>
					<span className="pie-legend__label">
						{item.name}: ${item.value}
					</span>
				</div>
			))}
		</div>
	);
}
