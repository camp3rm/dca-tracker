import React from 'react'

type CalculationProps = {
	currentPrice: number;
	amount: number;
	invested: number;
	averageEntry: number;
}

 const currentValue = ({currentPrice, amount}: CalculationProps)=> {
	return 	currentPrice * amount;	
}
console.log(currentValue);

 const profit = ({currentPrice, invested, amount}: CalculationProps) => {
	return ((currentPrice*amount) - invested);
}

 const roi = ({averageEntry, currentPrice}: CalculationProps)=>{
	return ((currentPrice/averageEntry - 1) * 100);
}

export const calculations = {
	currentValue,
	profit,
	roi
}

