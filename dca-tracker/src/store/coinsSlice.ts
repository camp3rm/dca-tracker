import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface CoinPrice {
	symbol: string;
	price: number;
	lastUpdated: string;
}

interface CoinsState {
	prices: Record<string, CoinPrice>;
	loading: Record<string, boolean>;
	errors: Record<string, string | null>;
	isBatchFetching: boolean;
}

const initialState: CoinsState = {
	prices: {},
	loading: {},
	errors: {},
	isBatchFetching: false,
};

const CACHE_DURATION_MS = 30000; // 30 seconds

export const fetchMultiplePrices = createAsyncThunk(
	'coins/fetchMultiplePrices',
	async (symbols: string[], { getState, rejectWithValue }) => {
		const state = getState() as RootState;
		const now = Date.now();

		const symbolsToFetch = symbols.filter((symbol) => {
			const cached = state.coins.prices[symbol];
			if (!cached) return true;
			const cacheAge = now - new Date(cached.lastUpdated).getTime();
			return cacheAge > CACHE_DURATION_MS;
		});

		if (symbolsToFetch.length === 0) {
			return { results: [], skipped: true };
		}

		const fetchPromises = symbolsToFetch.map(async (symbol) => {
			try {
				const res = await fetch(`/api/binance/${symbol}`);
				if (!res.ok) {
					const errorData = await res.json();
					throw new Error(errorData.error || 'Failed to fetch price');
				}
				const data = await res.json();
				return {
					symbol,
					price: parseFloat(data.price) || 0,
					success: true as const,
				};
			} catch (err) {
				return {
					symbol,
					error: err instanceof Error ? err.message : 'Unknown error',
					success: false as const,
				};
			}
		});

		const results = await Promise.all(fetchPromises);
		return { results, skipped: false };
	}
);

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
	extraReducers: (builder) => {
		builder
			.addCase(fetchMultiplePrices.pending, (state) => {
				state.isBatchFetching = true;
			})
			.addCase(fetchMultiplePrices.fulfilled, (state, action) => {
				state.isBatchFetching = false;
				if (action.payload.skipped) return;

				const now = new Date().toISOString();
				action.payload.results.forEach((result) => {
					if (result.success) {
						state.prices[result.symbol] = {
							symbol: result.symbol,
							price: result.price,
							lastUpdated: now,
						};
						state.loading[result.symbol] = false;
						state.errors[result.symbol] = null;
					} else {
						state.loading[result.symbol] = false;
						state.errors[result.symbol] = result.error;
					}
				});
			})
			.addCase(fetchMultiplePrices.rejected, (state) => {
				state.isBatchFetching = false;
			});
	},
});

export const {
	fetchPriceStart,
	fetchPriceSuccess,
	fetchPriceFailure,
	clearPriceError,
} = coinsSlice.actions;

export default coinsSlice.reducer;