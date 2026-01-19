import { z } from 'zod';

export const profitCalculatorSchema = z.object({
  currentPrice: z.number().min(0.01, { message: 'Price must be greater than 0' }),
  amountOwned: z.number().min(0.00000001, { message: 'Amount must be greater than 0' }),
  targetMultiplier: z.enum(['2x', '3x', '5x', '10x']),
});

export type ProfitCalculatorForm = z.infer<typeof profitCalculatorSchema>;
