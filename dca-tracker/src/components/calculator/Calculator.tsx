'use client';
import { useState } from 'react';
import { TabButton } from '@/components/ui/tabButton/TabButton';
import { DCASimulator } from '@/components/calculator/DCASimulator/DCASimulator';
import { FutureProfitCalculator } from '@/components/calculator/FutureProfitCalculator/FutureProfitCalculator';
import { InvestmentGoalCalculator } from '@/components/calculator/InvestmentGoalCalculator/InvestmentGoalCalculator';
import { TargetCalculator } from '@/components/calculator/TargetCalculator/TargetCalculator';
import './calculator.scss';
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
