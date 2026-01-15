import { NextResponse } from 'next/server';

export async function GET(
	_req: Request,
	{ params }: { params: Promise<{ symbol: string }> }
) {
	try {
		const { symbol } = await params;

		if (!symbol) {
			return NextResponse.json(
				{ error: 'Symbol is required' },
				{ status: 400 }
			);
		}

		console.log(`📡 Запит ціни для: ${symbol}`);

		const response = await fetch(
			`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
				signal: AbortSignal.timeout(5000),
			}
		);

		if (!response.ok) {
			const errorText = await response.text();
			console.error(`❌ Binance API error for ${symbol}:`, errorText);
			return NextResponse.json(
				{ error: `Binance API error: ${response.status}` },
				{ status: 500 }
			);
		}

		const data = await response.json();
		
		if (!data.price) {
			return NextResponse.json(
				{ error: 'Price not found in response' },
				{ status: 404 }
			);
		}

		console.log(`✅ Ціна для ${symbol}: ${data.price}`);
		return NextResponse.json(data);
	} catch (error) {
		console.error('❌ API Route error:', error);
		return NextResponse.json(
			{
				error:
					error instanceof Error ? error.message : 'Internal server error',
			},
			{ status: 500 }
		);
	}
}