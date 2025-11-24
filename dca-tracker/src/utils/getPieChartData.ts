import { mockTransactions } from "@/mocks/mockTransaction";

export const getPieChartData = () => {
    const map = new Map<string, number>();

    mockTransactions.forEach(t => {
        const value = t.amount * t.currentPrice;

        if (map.has(t.symbol)) {
            map.set(t.symbol, map.get(t.symbol)! + value);
        } else {
            map.set(t.symbol, value);
        }
    });

    return Array.from(map, ([name, value]) => ({
        name,
        value: Number(value.toFixed(2)),
    }));
};
