import { z } from 'zod';

export const goalCalculatorSchema = z.object({
  goalAmount: z.number({
    message: "Goal amount must be a valid number",
  })
    .positive("Goal must be positive")
    .min(1, "Goal must be at least $1")
    .max(100000000, "Goal amount seems unrealistic"),

  currentPrice: z.number({
    message: "Current price must be a valid number",
  })
    .positive("Price must be positive")
    .min(0.01, "Price must be at least $0.01")
    .max(10000000, "Price seems unrealistic"),

  targetMultiplier: z.enum(['2x', '3x', '5x', '10x'], {
    message: "Please select a target multiplier",
  }),
});

export type GoalCalculatorForm = z.infer<typeof goalCalculatorSchema>;
