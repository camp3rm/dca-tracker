import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TransactionState {
  date: string;
  cryptoName: string;
  amountPurchased: number;
  coinsNumber: number;
  purchasePrice: number;
}

interface TransactionsState {
	transaction: TransactionState[];
}

const initialState: TransactionsState = { transaction: [] };

const transactionSlice = createSlice({
	name: 'transactions',
	initialState,
	reducers: {
		setTransaction: (state, action: PayloadAction<TransactionState>) => {
			state.transaction.push(action.payload);
		},
	},
});

export const { setTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;