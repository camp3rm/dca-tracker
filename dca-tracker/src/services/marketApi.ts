import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BinanceTicker} from './types'
export const marketApi = createApi({
	reducerPath: 'marketApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://api.binance.com' }),
	tagTypes: ['Prices'],
	endpoints: (builder) =>  ({
		getCurrentPrices:  builder.query<BinanceTicker[], string[]> ({
			 query: (symbols) => `/api/v3/ticker/price?symbols=${JSON.stringify(symbols)}`,
			 providesTags: ['Prices']
		})
	}),
});

export const {useGetCurrentPricesQuery} = marketApi;