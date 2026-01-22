'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TargetCalculatorFormData } from '../types/index';

import { targetCalculatorSchema } from '../schemas/schema';
import { Input } from './Input';
import coins from '@constants/coins.json';

interface TargetCalculatorFormProps {
  onSubmit: (data: TargetCalculatorFormData) => void;
  onCoinChange: (symbol: string) => void;
}

export const TargetCalculatorForm = ({
	onSubmit, onCoinChange
}: TargetCalculatorFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TargetCalculatorFormData>({
		resolver: zodResolver(targetCalculatorSchema),
		defaultValues: {
			coinSymbol: '',
			amountOwned: 0,
			averageEntry: 0,
			targetPrice: 0,
		},
	});


	return (
		<form
			className="target-calculator-form"
			onSubmit={handleSubmit(onSubmit)}>
			<div className="input-box">
				<label>Coin Symbol</label>
				<select
					style={{ width: '320px' }}
					className="transaction-modal-input"
					{...register('coinSymbol', {
						required: 'Crypto name is required',
					})}
					onChange={(e) =>onCoinChange(e.target.value)}>
					<option
						className="transaction-modal-input"
						value="">
						Select coin
					</option>
					{coins.map((coin) => (
						<option
							key={coin.asset}
							value={coin.asset}>
							{coin.name} ({coin.asset})
						</option>
					))}
				</select>
				{errors.coinSymbol && (
					<span className="error">
						{errors.coinSymbol.message}
					</span>
				)}
			</div>
			<div className="input-box">
				<label>Amount Owned</label>
				<Input
					type="number"
					step="0.00000001"
					placeholder="Amount Owned"
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
			<div className="input-box">
				<label>Average Entry</label>
				<Input
					type="number"
					step="0.01"
					placeholder="Average Entry"
					className="average-entry"
					onFocus={(e) => {
						if (e.target.value === '0') e.target.value = '';
					}}
					onBlur={(e) => {
						if (e.target.value === '') e.target.value = '0';
					}}
					registration={register('averageEntry', { valueAsNumber: true })}
				/>
				{errors.averageEntry && (
					<span className="error">{errors.averageEntry.message}</span>
				)}
			</div>
			<div className="input-box">
				<label>Target Price</label>
				<Input
					type="number"
					step="0.01"
					placeholder="Target Price"
					className="target-price"
					onFocus={(e) => {
						if (e.target.value === '0') e.target.value = '';
					}}
					onBlur={(e) => {
						if (e.target.value === '') e.target.value = '0';
					}}
					registration={register('targetPrice', { valueAsNumber: true })}
				/>
				{errors.targetPrice && (
					<span className="error">{errors.targetPrice.message}</span>
				)}
			</div>
			<button
				className="calculate-button"
				type="submit">
				Calculate
			</button>
		</form>
	);
};
