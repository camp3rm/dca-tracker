'use client';
import { useGetCurrentPricesQuery } from '@/services/marketApi';
import DcaTable from './dca-journal/page';

export default function Home() {
	// const { data, refetch, isFetching, isLoading } = useGetCurrentPricesQuery(
	// 	['BTCUSDT', 'ETHUSDT'],
	// 	{
	// 		pollingInterval: 60000,
	// 	}
	// );

	// console.log('prices:', data);
	// console.log('fetching:', isFetching);

	return (
		<main>
			{/* {isLoading && <p>Loading...</p>}
			<button
				onClick={() => refetch()}
				disabled={isFetching}>
				Refresh Now
			</button> */}
			<DcaTable />
		</main>
	);
}
