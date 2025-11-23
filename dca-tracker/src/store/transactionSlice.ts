import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TransactionState {
  date: string;
  cryptoName: string;
  amountPurchased: number;
  coinsNumber: number;
  purchasePrice: number;
}

interface TransactionsState {
  transactions: TransactionState[];
}

const initialState: TransactionsState = { transactions: [] };

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransaction: (state, action: PayloadAction<TransactionState>) => {
      state.transactions.push(action.payload);
    },
  },
});

export const { setTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;