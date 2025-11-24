'use client'
// import { mockTransactions } from '@mocks/mockTransaction';
import { getPieChartData } from '@utils/getPieChartData';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';


export default function AllocationPortfolio() {
const data = getPieChartData();


	return (
		<>
			<div className="chart">
<div className="piechart">
      <PieChart width={320} height={320}>
        <Pie 
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          label
        />
        <Tooltip />
      </PieChart>
    </div>
			</div>
		</>
	);
}
