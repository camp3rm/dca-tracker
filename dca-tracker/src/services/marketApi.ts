import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import coins from '@constants/coins.json';

export const marketApi = createApi({
	reducerPath: 'marketApi',
	baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
	endpoints: (builder) => ({
		getAllCoins: builder.query<typeof coins, void>({
			queryFn: () => ({ data: coins }),
		}),
	}),
});

export const { useGetAllCoinsQuery } = marketApi;

