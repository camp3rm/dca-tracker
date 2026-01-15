'use client';
import { useEffect } from 'react';
import { v4 } from 'uuid';
import DateInput from '@/components/ui/dateInput/DateInput';
import coins from '@constants/coins.json';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@store/store';
import { setTransaction } from '@store/transactionSlice';
import {
	fetchPriceStart,
	fetchPriceSuccess,
	fetchPriceFailure,
} from '@store/coinsSlice';
import './transactionModal.scss';

interface AddTransactionModalProps {
	modal: () => void;
}

type FormData = {
	id: string;
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

	const coinsPrices = useSelector((state: RootState) => state.coins.prices);
	const coinsLoading = useSelector((state: RootState) => state.coins.loading);
	const coinsErrors = useSelector((state: RootState) => state.coins.errors);

	const {
		register,
		control,
		handleSubmit,
		reset,
		watch,
		setValue,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			id: '',
			date: null,
			cryptoName: '',
			amountPurchased: '',
			coinsNumber: '',
			purchasePrice: '',
		},
	});

	const selectedCoin = watch('cryptoName');
	const amountPurchased = parseFloat(watch('amountPurchased') || '0');

	useEffect(() => {
		if (!selectedCoin) return;

		const fetchPrice = async () => {
			const symbol = `${selectedCoin}USDT`;

			// Перевіряємо чи є вже ціна в store і чи вона свіжа (менше 1 хвилини)
			const cachedPrice = coinsPrices[symbol];
			if (cachedPrice) {
				const timeDiff =
					new Date().getTime() - new Date(cachedPrice.lastUpdated).getTime();
				if (timeDiff < 60000) {
					// 1 хвилина
					setValue('purchasePrice', cachedPrice.price.toFixed(2));
					const coinsNumber = amountPurchased / cachedPrice.price || 0;
					setValue('coinsNumber', coinsNumber.toFixed(6));
					return;
				}
			}

			dispatch(fetchPriceStart(symbol));

			try {
				const res = await fetch(`/api/binance/${symbol}`);
				if (!res.ok) throw new Error('Failed to fetch price');

				const data = await res.json();
				const price = parseFloat(data.price) || 0;

				// Зберігаємо в Redux store
				dispatch(fetchPriceSuccess({ symbol, price }));

				setValue('purchasePrice', price.toFixed(2));
				const coinsNumber = amountPurchased / price || 0;
				setValue('coinsNumber', coinsNumber.toFixed(6));
			} catch (err) {
				console.error('Failed to fetch price:', err);
				dispatch(
					fetchPriceFailure({
						symbol,
						error: err instanceof Error ? err.message : 'Unknown error',
					})
				);
			}
		};

		fetchPrice();
	}, [selectedCoin, amountPurchased, setValue, dispatch, coinsPrices]);

	const onSubmit: SubmitHandler<FormData> = (data) => {
		const transactionData = {
			...data,
			id: v4(),
			date: data.date
				? data.date.toLocaleDateString('uk-UA')
				: new Date().toLocaleDateString('uk-UA'),
			amountPurchased: Number(data.amountPurchased),
			coinsNumber: Number(data.coinsNumber),
			purchasePrice: Number(data.purchasePrice),
		};

		dispatch(setTransaction(transactionData));
		modal();
		reset();
	};

	const currentSymbol = selectedCoin ? `${selectedCoin}USDT` : '';
	const isLoading = currentSymbol ? coinsLoading[currentSymbol] : false;
	const error = currentSymbol ? coinsErrors[currentSymbol] : null;

	return (
		<div className="transaction-modal" onClick={modal}>
			<section
				className="transaction-modal__backdrop"
				onClick={(e) => e.stopPropagation()}
			>
				<h1 className="transaction-modal__title">Transaction form</h1>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="transaction-modal__form"
				>
					<Controller
						name="date"
						control={control}
						rules={{ required: 'Date is required' }}
						render={({ field }) => (
							<DateInput selected={field.value} onChange={field.onChange} />
						)}
					/>
					{errors.date && (
						<span className="transaction-modal__error">
							{errors.date.message}
						</span>
					)}

					<select
						style={{ width: '320px' }}
						className="transaction-modal__input"
						{...register('cryptoName', {
							required: 'Crypto name is required',
						})}
					>
						<option className='transaction-modal__input' value="">Select coin</option>
						{coins.map((coin) => (
							<option key={coin.asset} value={coin.asset}>
								{coin.name} ({coin.asset})
							</option>
						))}
					</select>
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

					<div style={{display: 'flex', flexDirection: 'column'}}>
						<input
							className="transaction-modal__input"
							type="number"
							step="0.01"
							placeholder="Purchase Price ($)"
							value={watch('purchasePrice')}
							readOnly
						/>
						{isLoading && (
							<span style={{ fontSize: '16px', color: '#fff', marginTop: '5px' }}>
								Loading...
							</span>
						)}
						{error && (
							<span className="transaction-modal__error">{error}</span>
						)}
					</div>

					<input
						className="transaction-modal__input"
						type="number"
						step="0.00000001"
						placeholder="Number of coins"
						value={watch('coinsNumber')}
						readOnly
					/>

					<button className="transaction-modal__button--add" type="submit">
						Add Transaction
					</button>
					<button
						className="transaction-modal__button--cancel"
						onClick={modal}
						type="button"
					>
						Cancel
					</button>
				</form>
			</section>
		</div>
	);
}