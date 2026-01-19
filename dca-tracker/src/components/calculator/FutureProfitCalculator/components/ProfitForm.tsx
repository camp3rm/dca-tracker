'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfitCalculatorFormData } from '../types/index';

import { profitCalculatorSchema } from '../schemas/schema';
import { Input } from './Input';

interface ProfitCalculatorFormProps {
	onSubmit: (data: ProfitCalculatorFormData) => void;
}

export const ProfitCalculatorForm = ({
	onSubmit,
}: ProfitCalculatorFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ProfitCalculatorFormData>({
		resolver: zodResolver(profitCalculatorSchema),
		defaultValues: {
			currentPrice: 0,
			amountOwned: 0,
			targetMultiplier: '3x',
		},
	});

	return (
		<form
			className="profit-calculator-form"
			onSubmit={handleSubmit(onSubmit)}>
			<div className="input-box">
				<Input
					type="number"
					step="0.01"
					placeholder="Current Price"
					className="current-price"
					registration={register('currentPrice', { valueAsNumber: true })}
				/>
				{errors.currentPrice && (
					<span className="error">{errors.currentPrice.message}</span>
				)}
			</div>
			<div className="input-box">
				<Input
					type="number"
					step="0.00000001"
					placeholder="Amount Owned"
					className="amount-owned"
					registration={register('amountOwned', { valueAsNumber: true })}
				/>
				{errors.amountOwned && (
					<span className="error">{errors.amountOwned.message}</span>
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
