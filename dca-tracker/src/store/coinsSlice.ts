import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CoinPrice {
	symbol: string;
	price: number;
	lastUpdated: string;
}

interface CoinsState {
	prices: Record<string, CoinPrice>;
	loading: Record<string, boolean>;
	errors: Record<string, string | null>;
}

const initialState: CoinsState = {
	prices: {},
	loading: {},
	errors: {},
};

const coinsSlice = createSlice({
	name: 'coins',
	initialState,
	reducers: {
		fetchPriceStart: (state, action: PayloadAction<string>) => {
			const symbol = action.payload;
			state.loading[symbol] = true;
			state.errors[symbol] = null;
		},
		fetchPriceSuccess: (
			state,
			action: PayloadAction<{ symbol: string; price: number }>
		) => {
			const { symbol, price } = action.payload;
			state.prices[symbol] = {
				symbol,
				price,
				lastUpdated: new Date().toISOString(),
			};
			state.loading[symbol] = false;
			state.errors[symbol] = null;
		},
		fetchPriceFailure: (
			state,
			action: PayloadAction<{ symbol: string; error: string }>
		) => {
			const { symbol, error } = action.payload;
			state.loading[symbol] = false;
			state.errors[symbol] = error;
		},
		clearPriceError: (state, action: PayloadAction<string>) => {
			state.errors[action.payload] = null;
		},
	},
});

export const {
	fetchPriceStart,
	fetchPriceSuccess,
	fetchPriceFailure,
	clearPriceError,
} = coinsSlice.actions;

export default coinsSlice.reducer;