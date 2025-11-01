import tackerData from '@/lib/api';
import React from 'react';

export default function TransactionRow() {
	const data = tackerData();

	console.log('TransactionRow data:', data);
	return (
		<div className="transaction-row" style={{width: '100%', height: '100%'}}>
			<span className='col-date'></span>
			<span className='col-symbol' style={{color: 'red'}}>{coin}</span>
			<span className='col-invested'></span>
			<span className='col-amount'></span>
			<span className='col-buy__price'></span>
			<span className='col-current__price'>{currentPriceUSD}</span>
			<span className='col-average-entry'></span>
			<span className='col-current-value'></span>
			<span className='col-profit'></span>
			<span className='col-roi'></span>
			<span className='col-target__3x'></span>
			<span className='col-target__5x'></span>
			<span className='col-target__10x'></span>
		</div>
	);
}
