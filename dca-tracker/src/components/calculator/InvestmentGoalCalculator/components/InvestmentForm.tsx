'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GoalCalculatorFormData } from '../types/index';

import { goalCalculatorSchema } from '../schemas/schema';
import { Input } from './Input';

interface GoalCalculatorFormProps {
	onSubmit: (data: GoalCalculatorFormData) => void;
}

export const InvestmentGoalCalculatorForm = ({ onSubmit }: GoalCalculatorFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<GoalCalculatorFormData>({
		resolver: zodResolver(goalCalculatorSchema),
		defaultValues: {
			goalAmount: 0,
			currentPrice: 0,
			targetMultiplier: '3x',
		},
	});


	return (
		<form
			className="invest-calculator-form"
			onSubmit={handleSubmit(onSubmit)}>
			<div className="input-box">
				<label>Goal Amount</label>
				<Input
					type="number"
					step="0.1"
					placeholder="Goal Amount"
					className="goal-amount"
					onFocus={(e) => {
						if (e.target.value === '0') e.target.value = '';
					}}
					onBlur={(e) => {
						if (e.target.value === '') e.target.value = '0';
					}}
					registration={register('goalAmount', { valueAsNumber: true })}
				/>
				{errors.goalAmount && (
					<span className="error">{errors.goalAmount.message}</span>
				)}
			</div>
			<div className="input-box">
				<label>Current Price</label>
				<Input
					type="number"
					step="0.01"
					placeholder="Current Price"
					className="current-price"
					onFocus={(e) => {
						if (e.target.value === '0') e.target.value = '';
					}}
					onBlur={(e) => {
						if (e.target.value === '') e.target.value = '0';
					}}
					registration={register('currentPrice', { valueAsNumber: true })}
				/>
				{errors.currentPrice && (
					<span className="error">{errors.currentPrice.message}</span>
				)}
			</div>

			<select
				className="target-multiplier"
				{...register('targetMultiplier')}>
				<option value="2x">2x</option>
				<option value="3x">3x</option>
				<option value="5x">5x</option>
				<option value="10x">10x</option>
			</select>
			<button
				className="calculate-button"
				type="submit">
				Calculate
			</button>
		</form>
	);
};
