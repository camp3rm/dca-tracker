import { z } from 'zod';

export const profitCalculatorSchema = z.object({
  currentPrice: z.number({
    message: 'Current price must be a valid number',
  })
  .min(0.01, { message: 'Price must be greater than 0' })
  .positive({ message: 'Price must be a positive number' }),
  amountOwned: z.number({
    message: 'Amount must be a valid number',
  })
  .min(0.00000001, { message: 'Amount must be greater than 0' })
  .positive("Amount must be positive"),
  targetMultiplier: z.enum(['2x', '3x', '5x', '10x'], {
    message: "Please select a target multiplier",
  }),
});

export type ProfitCalculatorForm = z.infer<typeof profitCalculatorSchema>;
