'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { processAnalyticsData } from '@/utils/analyticsHelpers';
import '../analytics.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884D8',
  '#82ca9d',
  '#ffc658',
];

export const PortfolioPieChart = () => {
  const transactions = useSelector(
    (state: RootState) => state.transaction.transactions
  );
  const coinsPrices = useSelector((state: RootState) => state.coins.prices);

  const coinsData = processAnalyticsData(transactions, coinsPrices);

  const chartData = {
    labels: coinsData.map(coin => coin.coin),
    datasets: [
      {
        label: 'Portfolio Value',
        data: coinsData.map(coin => coin.currentValue),
        backgroundColor: COLORS,
        borderColor: '#161b22',
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#161b22',
        titleColor: '#58a6ff',
        bodyColor: '#c9d1d9',
        borderColor: '#30363d',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const percentage = coinsData[context.dataIndex].percentage.toFixed(2);
            return `${label}: $${value.toFixed(2)} (${percentage}%)`;
          },
        },
      },
    },
  };

  if (transactions.length === 0) {
    return (
      <div className="chart-empty">
        <p>
          No transactions yet. Add some transactions to see your portfolio
          distribution.
        </p>
      </div>
    );
  }

  return (
    <div className="portfolio-pie-chart">
      <h3>Portfolio Distribution</h3>
      <div className="chart-container">
        <Pie data={chartData} options={options} />
      </div>
      <div className="chart-legend">
        {coinsData.map((coin, index) => (
          <div key={coin.coin} className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="legend-label">{coin.coin}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
