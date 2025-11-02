'use client'
import './transactionModal.scss';
import DateInput from '@components/ui/DateInput/DateInput';
import {useForm, SubmitHandler, Controller} from 'react-hook-form';

interface AddTransactionModalProps {
  modal: () => void;
}
type FormData = {
	date: Date | null;
	cryptoName: string;
	amountPurchased: number;
	numberOfCoins: number;
	purchasePrice: number;
};

export default function addTransactionModal({ modal} : AddTransactionModalProps) {
	const { register, control, handleSubmit, formState: { errors } } = useForm<FormData>(
		{
			defaultValues: {
				date: null,
		}
});

	const onSubmit: SubmitHandler<FormData> = data => console.log(data);
	return (
		<div className='modal-backdrop'>
		<section className='transaction-modal'>
			<h1 className='transaction-modal__title'>Transaction form</h1>
			<form onSubmit={handleSubmit(onSubmit)} className='transaction-modal__form'>
				<Controller
        name="date"
        control={control}
        render={({ field }) => (
          <DateInput
            selected={field.value}
            onChange={(date) => field.onChange(date)}
          />
        )}
      />
				<input type="text" placeholder='Cryptocurrency name'/>
				<input type="text" placeholder='Amount Purchased ($)'/>
				<input type="text" placeholder='Number of coins'/>
				<input type="text" placeholder='Purchase Price ($)' />
				<button type='submit'>Add Transaction</button>
				<button onClick={modal} type='button'>Cancel</button>
			</form>
		</section>
		</div>
	)
}
