import { configureStore } from '@reduxjs/toolkit';
import transactionReducer  from './transactionSlice';
import { marketApi } from '../services/marketApi';

export const store = configureStore({
	reducer: {
		transaction: transactionReducer,
		[marketApi.reducerPath]: marketApi.reducer, // Added marketApi reducer for saving cache data
		// Request status
		// Timestamps for invalidation
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(marketApi.middleware), // Added middleware for polling every N sec,
	// cache invalidation
	// Optimistic update
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
