import { z } from 'zod';

export const goalCalculatorSchema = z.object({
  goalAmount: z.number().min(1, { message: 'Goal amount must be greater than 0' }),
  currentPrice: z.number().min( 0.01, { message: 'Current proice must be greater than 0' }),
  targetMultiplier: z.enum(['2x', '3x', '5x', '10x']),
});

export type ProfitCalculatorForm = z.infer<typeof goalCalculatorSchema>;
