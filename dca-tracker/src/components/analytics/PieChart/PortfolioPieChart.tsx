'use client';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { CHART_COLORS } from '@/styles/constants/colors';
import { getPieChartData } from '@/utils/getPieChartData';
import PieLegend from './PieLegend';
import './piechart.scss';

export default function PortfolioPieChart() {
	const rawData = getPieChartData();

	const data = rawData.map((item, index) => ({
		...item,
		color: CHART_COLORS[index % CHART_COLORS.length],
	}));

	return (
		<>
			<PieChart
				width={400}
				height={400}>
				<Pie
					data={data}
					dataKey="value"
					nameKey="name"
					cx="50%"
					cy="50%"
					outerRadius={120}
					label>
					{data.map((entry, index) => (
						<Cell
							key={index}
							fill={entry.color}
						/>
					))}
				</Pie>
				<Tooltip />
			</PieChart>
			<PieLegend data={data} />
		</>
	);
}
