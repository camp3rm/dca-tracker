'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { processAnalyticsData } from '@/utils/analyticsHelpers';
import './ROIBarChart.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export const ROIBarChart = () => {
  const transactions = useSelector(
    (state: RootState) => state.transaction.transactions
  );
  const coinsPrices = useSelector((state: RootState) => state.coins.prices);

  const coinsData = processAnalyticsData(transactions, coinsPrices);

  const chartData = {
    labels: coinsData.map(coin => coin.coin),
    datasets: [
      {
        label: 'ROI (%)',
        data: coinsData.map(coin => coin.roi),
        backgroundColor: coinsData.map(coin =>
          coin.roi >= 0 ? '#3fb950' : '#f85149'
        ),
        borderColor: '#161b22',
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
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
            return `ROI: ${(context.parsed.y ?? 0).toFixed(2)}%`;
          },
        },
      },
      datalabels: {
        color: '#c9d1d9',
        anchor: 'end',
        align: 'end',
        font: {
          size: 12,
          weight: 'bold',
        },
        formatter: (value: number) => {
          return value.toFixed(2) + '%';
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: '#30363d',
        },
        ticks: {
          color: '#8b949e',
        },
      },
      y: {
        grid: {
          color: '#30363d',
        },
        ticks: {
          color: '#8b949e',
          callback: function (value) {
            return Number(value).toFixed(2) + '%';
          },
        },
      },
    },
  };

  if (transactions.length === 0) {
    return null;
  }

  return (
    <div className="roi-bar-chart">
      <h3>ROI by Coin</h3>
      <div className="chart-container">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};
