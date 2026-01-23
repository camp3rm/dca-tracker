'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DCASimulatorFormData } from '../types/types';

import { dcaSimulatorSchema } from '../schema/schema';
import { Input } from './Input';

interface DCASimulatorFormProps {
	onSubmit: (data: DCASimulatorFormData) => void;
}

export const DCASimulatorForm = ({
	onSubmit,
}: DCASimulatorFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<DCASimulatorFormData>({
		resolver: zodResolver(dcaSimulatorSchema),
		defaultValues: {
			initialInvestment: 1000,
			monthlyInvestment: 100,
			duration: 12,
			expectedROI: 10,
		},
	});

	return (
		<form
			className="dca-simulator-form"
			onSubmit={handleSubmit(onSubmit)}>
			<div className="input-box">
				<label>Initial Investment</label>
				<Input
					type="number"
					step="1"
					placeholder="Initial Investment"
					className="initial-investment"
					onFocus={(e) => {
						if (e.target.value === '1000') e.target.value = '';
					}}
					onBlur={(e) => {
						if (e.target.value === '') e.target.value = '1000';
					}}
					registration={register('initialInvestment', { valueAsNumber: true })}
				/>
				{errors.initialInvestment && (
					<span className="error">{errors.initialInvestment.message}</span>
				)}
			</div>
			<div className="input-box">
				<label>Monthly Investment</label>
				<Input
					type="number"
					step="1"
					placeholder="Monthly Investment"
					className="monthly-investment"
					onFocus={(e) => {
						if (e.target.value === '100') e.target.value = '';
					}}
					onBlur={(e) => {
						if (e.target.value === '') e.target.value = '100';
					}}
					registration={register('monthlyInvestment', { valueAsNumber: true })}
				/>
				{errors.monthlyInvestment && (
					<span className="error">{errors.monthlyInvestment.message}</span>
				)}
			</div>
			<div className="input-box">
				<label>Duration</label>
				<Input
					type="number"
					step="1"
					placeholder="Duration"
					className="duration"
					onFocus={(e) => {
						if (e.target.value === '12') e.target.value = '';
					}}
					onBlur={(e) => {
						if (e.target.value === '') e.target.value = '12';
					}}
					registration={register('duration', { valueAsNumber: true })}
				/>
				{errors.duration && (
					<span className="error">{errors.duration.message}</span>
				)}
			</div>
			<div className="input-box">
				<label>Expected ROI</label>
				<Input
					type="number"
					step="1"
					placeholder="Expected ROI"
					className="expected-roi"
					onFocus={(e) => {
						if (e.target.value === '10') e.target.value = '';
					}}
					onBlur={(e) => {
						if (e.target.value === '') e.target.value = '10';
					}}
					registration={register('expectedROI', { valueAsNumber: true })}
				/>
				{errors.expectedROI && (
					<span className="error">{errors.expectedROI.message}</span>
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
