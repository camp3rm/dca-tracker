'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { processAnalyticsData } from '@/utils/analyticsHelpers';
import './ProfitOverview.scss';

export const ProfitOverview = () => {
  const transactions = useSelector(
    (state: RootState) => state.transaction.transactions
  );
  const coinsPrices = useSelector((state: RootState) => state.coins.prices);

  const coinsData = processAnalyticsData(transactions, coinsPrices);

  const totalProfit = coinsData.reduce(
    (sum, coin) => sum + coin.profit,
    0
  );

  const averageROI = coinsData.length > 0
    ? coinsData.reduce((sum, coin) => sum + coin.roi, 0) / coinsData.length
    : 0;

  if (transactions.length === 0) {
    return null;
  }

  return (
    <div className="profit-overview">
      <div className="overview-card">
        <div className="card-icon">
          {totalProfit >= 0 ? '💰' : '📉'}
        </div>
        <div className="card-content">
          <h4>Total Profit/Loss</h4>
          <p className={`card-value ${totalProfit >= 0 ? 'positive' : 'negative'}`}>
            {totalProfit >= 0 ? '+' : ''}${totalProfit.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="overview-card">
        <div className="card-icon">📊</div>
        <div className="card-content">
          <h4>Average ROI</h4>
          <p className={`card-value ${averageROI >= 0 ? 'positive' : 'negative'}`}>
            {averageROI >= 0 ? '+' : ''}{averageROI.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
};