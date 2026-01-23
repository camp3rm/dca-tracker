'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { TabButton } from '@/components/ui/tabButton/TabButton';
import './calculator.scss';

const CalculatorSkeleton = () => (
	<div className="calculator-skeleton">Loading...</div>
);

const DCASimulator = dynamic(
	() => import('@/components/calculator/DCASimulator/DCASimulator').then(mod => mod.DCASimulator),
	{ loading: () => <CalculatorSkeleton /> }
);

const FutureProfitCalculator = dynamic(
	() => import('@/components/calculator/FutureProfitCalculator/FutureProfitCalculator').then(mod => mod.FutureProfitCalculator),
	{ loading: () => <CalculatorSkeleton /> }
);

const InvestmentGoalCalculator = dynamic(
	() => import('@/components/calculator/InvestmentGoalCalculator/InvestmentGoalCalculator').then(mod => mod.InvestmentGoalCalculator),
	{ loading: () => <CalculatorSkeleton /> }
);

const TargetCalculator = dynamic(
	() => import('@/components/calculator/TargetCalculator/TargetCalculator').then(mod => mod.TargetCalculator),
	{ loading: () => <CalculatorSkeleton /> }
);
type CalculatorProps = {
	title: string;
};
type CalculatorTab = 'profit' | 'goal' | 'target' | 'simulator';

export const Calculator = ({ title }: CalculatorProps) => {
	const [isActiveTab, setIsActiveTab] = useState<CalculatorTab>('profit');

	const tabs = [
		{ id: 'profit' as CalculatorTab, label: 'Future Profit' },
		{ id: 'goal' as CalculatorTab, label: 'Investment Goal' },
		{ id: 'target' as CalculatorTab, label: 'Target Calculator' },
		{ id: 'simulator' as CalculatorTab, label: 'DCA Simulator' },
	];


	return (
		<section className="calculator-container">
			<p className="calculator-title">{title}</p>
			<div className="btns-container">
				{tabs.map((tab) => (
					<TabButton
						key={tab.id}
						title={tab.label}
						isActive={isActiveTab === tab.id}
						onClick={() => setIsActiveTab(tab.id)}
					/>
				))}
			</div>
			<div className="current-calculator">
				{isActiveTab === 'profit' && <FutureProfitCalculator />}
				{isActiveTab === 'goal' && <InvestmentGoalCalculator />}
				{isActiveTab === 'target' && <TargetCalculator />}
				{isActiveTab === 'simulator' && <DCASimulator />}
			</div>
		</section>
	);
};
