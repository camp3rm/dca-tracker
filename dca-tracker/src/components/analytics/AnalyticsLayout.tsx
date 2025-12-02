import './analytics.scss';
import KpiCards from '@components/analytics/KpiCards/KpiCards';
import PortfolioPieChart from '@components/analytics/PieChart/PortfolioPieChart';

export default function AnalyticsLayout() {
	return (
		<section className="wallet-analytics">
			<KpiCards />
			<div className="wallet-analytics__chart">
				<PortfolioPieChart />
			</div>
		</section>
	);
}
