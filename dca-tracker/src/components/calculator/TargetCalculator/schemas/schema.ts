import { z } from 'zod';

export const targetCalculatorSchema = z.object({
  coinSymbol: z.string(),
  amountOwned: z.number().min( 0.00000001, { message: 'Amount must be greater than 0' }),
  averageEntry: z.number().min(0.01, {message: 'Average entry must be greater than 0'}),
  targetPrice: z.number().min(0.01, {message: 'Target price must be greater than 0'}),

});

export type ProfitCalculatorForm = z.infer<typeof targetCalculatorSchema>;
