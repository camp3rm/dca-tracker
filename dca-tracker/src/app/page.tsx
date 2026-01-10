'use client';
import { useGetCurrentPricesQuery } from '@/services/marketApi';
export default function Home() {
	const { data, refetch, isFetching } = useGetCurrentPricesQuery([
		'BTCUSDT',
		'ETHUSDT',
	]);

	console.log('prices:', data);
	console.log(isFetching);

	return (
		<main>
			<button onClick={() => refetch()}>Manual Refresh</button>
		</main>
	);
}
