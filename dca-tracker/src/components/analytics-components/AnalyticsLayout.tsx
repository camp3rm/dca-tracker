'use client';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '@store/store';
import { fetchMultiplePrices } from '@store/coinsSlice';
import { selectUniqueCoinsKey } from '@store/selectors';
import { PortfolioPieChart } from '@/components/analytics-components/portfolioPieChart/PortfolioPieChart';
import { InvestmentOverview } from '@/components/analytics-components/investmentOverview/InvestmentOverview';
import { ROIBarChart } from '@/components/analytics-components/roiBarChart/ROIBarChart';
import { ProfitOverview } from '@/components/analytics-components/profitOverview/ProfitOverview';
import './analytics.scss';

export default function AnalyticsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const uniqueCoinsKey = useSelector(selectUniqueCoinsKey);

  useEffect(() => {
    if (!uniqueCoinsKey) return;

    const symbols = uniqueCoinsKey.split(',').filter(Boolean).map(coin => `${coin}USDT`);
    if (symbols.length === 0) return;

    dispatch(fetchMultiplePrices(symbols));

    const interval = setInterval(() => {
      dispatch(fetchMultiplePrices(symbols));
    }, 60000);

    return () => clearInterval(interval);
  }, [uniqueCoinsKey, dispatch]);

  return (
    <div className="analytics-page">
      {/* Header */}
      <div className="analytics-header">
        <h1>📊 Portfolio Analytics</h1>
        <p>Track your cryptocurrency investment performance</p>
      </div>

      {/* Main Grid: Pie Chart + Stats Cards */}
      <div className="hero-section">
        {/* Left: Large Pie Chart */}
        <div className="pie-chart-container">
          <PortfolioPieChart />
        </div>

        {/* Right: Stats Cards */}
        <div className="stats-cards">
          <InvestmentOverview />
          <ProfitOverview />
        </div>
      </div>

      {/* Bottom: Full Width Bar Chart */}
      <div className="bar-chart-container">
        <ROIBarChart />
      </div>
    </div>
  );
}