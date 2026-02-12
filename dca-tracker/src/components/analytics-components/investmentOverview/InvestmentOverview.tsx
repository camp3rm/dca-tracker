'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { processAnalyticsData } from '@/utils/analyticsHelpers';
import './InvestmentOverview.scss';

export const InvestmentOverview = () => {
  const transactions = useSelector(
    (state: RootState) => state.transaction.transactions
  );
  const coinsPrices = useSelector((state: RootState) => state.coins.prices);

  const coinsData = processAnalyticsData(transactions, coinsPrices);

  const totalInvestment = coinsData.reduce(
    (sum, coin) => sum + coin.totalInvested,
    0
  );

  const currentValue = coinsData.reduce(
    (sum, coin) => sum + coin.currentValue,
    0
  );

  const totalProfit = currentValue - totalInvestment;
  const totalROI = totalInvestment > 0 
    ? (totalProfit / totalInvestment) * 100 
    : 0;

  if (transactions.length === 0) {
    return null;
  }

  return (
    <div className="investment-overview">
      <div className="overview-card">
        <div className="card-icon">💰</div>
        <div className="card-content">
          <h4>Total Investment</h4>
          <p className="card-value">${totalInvestment.toFixed(2)}</p>
        </div>
      </div>

      <div className="overview-card">
        <div className="card-icon">📈</div>
        <div className="card-content">
          <h4>Current Value</h4>
          <p className="card-value">${currentValue.toFixed(2)}</p>
          <p className={`card-change ${totalProfit >= 0 ? 'positive' : 'negative'}`}>
            {totalProfit >= 0 ? '+' : ''}${totalProfit.toFixed(2)} ({totalROI.toFixed(2)}%)
          </p>
        </div>
      </div>
    </div>
  );
};