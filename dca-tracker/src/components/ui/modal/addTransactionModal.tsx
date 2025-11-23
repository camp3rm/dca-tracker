'use client'
import './transactionModal.scss';
import DateInput from '@components/ui/DateInput/DateInput';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@store/store';
import { setTransaction } from '@store/transactionSlice';

interface AddTransactionModalProps {
	modal: () => void;
}
type FormData = {
	date: Date | null;
	cryptoName: string;
	amountPurchased: string;
	coinsNumber: string;
	purchasePrice: string;
};

export default function AddTransactionModal({
	modal,
}: AddTransactionModalProps) {
	const dispatch = useDispatch<AppDispatch>();
	const transaction = useSelector(
		(state: RootState) => state.transaction.transactions
	);

	const {
		register,
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			date: null,
			cryptoName: '',
			amountPurchased: '',
			coinsNumber: '',
			purchasePrice: '',
		},
	});

	const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
		const transactionData = {
			...data,
			date: data.date ? data.date.toISOString() : new Date().toISOString(),
			amountPurchased: Number(data.amountPurchased),
			coinsNumber: Number(data.coinsNumber),
			purchasePrice: Number(data.purchasePrice),
		};

		dispatch(setTransaction(transactionData));
		console.log('Transaction added:', transactionData);
		modal();
		reset();
	};
	return (
		<div
			className="transaction-modal"
			onClick={modal}>
			<section
				className="transaction-modal__backdrop"
				onClick={(e) => e.stopPropagation()}>
				<h1 className="transaction-modal__title">Transaction form</h1>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="transaction-modal__form">
					<Controller
						name="date"
						control={control}
						rules={{ required: 'Date is required' }}
						render={({ field }) => (
							<DateInput
								selected={field.value}
								onChange={(date) => field.onChange(date)}
							/>
						)}
					/>
					{errors.date && (
						<span className="transaction-modal__error">
							{errors.date.message}
						</span>
					)}

					<input
						className="transaction-modal__input"
						type="text"
						placeholder="Cryptocurrency name"
						{...register('cryptoName', { required: 'Crypto name is required' })}
					/>
					{errors.cryptoName && (
						<span className="transaction-modal__error">
							{errors.cryptoName.message}
						</span>
					)}

					<input
						className="transaction-modal__input"
						type="number"
						step="0.01"
						placeholder="Amount Purchased ($)"
						{...register('amountPurchased', {
							required: 'Amount is required',
							valueAsNumber: true,
							min: { value: 0.01, message: 'Must be greater than 0' },
						})}
					/>
					{errors.amountPurchased && (
						<span className="transaction-modal__error">
							{errors.amountPurchased.message}
						</span>
					)}

					<input
						className="transaction-modal__input"
						type="number"
						step="0.00000001"
						placeholder="Number of coins"
						{...register('coinsNumber', {
							required: 'Number of coins is required',
							valueAsNumber: true,
							min: { value: 0.00000001, message: 'Must be greater than 0' },
						})}
					/>
					{errors.coinsNumber && (
						<span className="transaction-modal__error">
							{errors.coinsNumber.message}
						</span>
					)}

					<input
						className="transaction-modal__input"
						type="number"
						step="0.01"
						placeholder="Purchase Price ($)"
						{...register('purchasePrice', {
							required: 'Purchase price is required',
							valueAsNumber: true,
							min: { value: 0.01, message: 'Must be greater than 0' },
						})}
					/>
					{errors.purchasePrice && (
						<span className="transaction-modal__error">
							{errors.purchasePrice.message}
						</span>
					)}

					<button
						className="transaction-modal__button--add"
						type="submit">
						Add Transaction
					</button>
					<button
						className="transaction-modal__button--cancel"
						onClick={modal}
						type="button">
						Cancel
					</button>
				</form>
			</section>
		</div>
	);
}
