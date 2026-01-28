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
				<label>Current Price ($)</label>
				<Input
					type="number"
					step="0.01"
					placeholder="e.g. 50000"
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
			<div className="input-box">
				<label>Amount Owned</label>
				<Input
					type="number"
					step="0.00000001"
					placeholder="e.g. 0.5"
					className="amount-owned"
					onFocus={(e) => {
						if (e.target.value === '0') e.target.value = '';
					}}
					onBlur={(e) => {
						if (e.target.value === '') e.target.value = '0';
					}}
					registration={register('amountOwned', { valueAsNumber: true })}
				/>
				{errors.amountOwned && (
					<span className="error">{errors.amountOwned.message}</span>
				)}
			</div>
			<div className="input-box-multiplier">
				<label>Target Multiplier</label>
			<select
				className="target-multiplier"
				{...register('targetMultiplier')}>
				<option value="2x">2x</option>
				<option value="3x">3x</option>
				<option value="5x">5x</option>
				<option value="10x">10x</option>
			</select>
			</div>
			<button
				className="calculate-button"
				type="submit">
				Calculate
			</button>
		</form>
	);
};
