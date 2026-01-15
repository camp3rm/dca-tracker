// src/store/transactionSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TransactionState {
	id: string;
	date: string;
	cryptoName: string;
	amountPurchased: number;
	coinsNumber: number;
	purchasePrice: number;
}

interface TransactionsState {
	transactions: TransactionState[];
}

const initialState: TransactionsState = {
	transactions: [],
};

const transactionSlice = createSlice({
	name: 'transaction',
	initialState,
	reducers: {
		setTransaction: (state, action: PayloadAction<TransactionState>) => {
			state.transactions.push(action.payload);
		},
		removeTransaction: (state, action: PayloadAction<string>) => {
			state.transactions = state.transactions.filter(
				(t) => t.id !== action.payload
			);
		},
		clearAllTransactions: (state) => {
			state.transactions = [];
		},
	},
});

export const { setTransaction, removeTransaction, clearAllTransactions } =
	transactionSlice.actions;
export default transactionSlice.reducer;
