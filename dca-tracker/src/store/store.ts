import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from './transactionSlice';
import coinsReducer from './coinsSlice';
import { marketApi } from '../services/marketApi';

export const store = configureStore({
	reducer: {
		transaction: transactionReducer,
		coins: coinsReducer,
		[marketApi.reducerPath]: marketApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(marketApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;