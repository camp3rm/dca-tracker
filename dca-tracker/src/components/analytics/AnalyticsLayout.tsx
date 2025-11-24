import './analytics.scss';
import KpiCards from '@components/analytics/KpiCards/KpiCards';
import PortfolioPieChart from '@components/analytics/PieChart/PortfolioPieChart';
import AllocationPortfolio from '@components/analytics/PieChart/AllocationPortfolio';

export default function AnalyticsLayout() {
	return (
		<section className="wallet-analytics">	
						<KpiCards />				
					<div className="wallet-analytics__chart">
						<AllocationPortfolio/>
						<PortfolioPieChart/>
					</div>
				</section>
	)
}
