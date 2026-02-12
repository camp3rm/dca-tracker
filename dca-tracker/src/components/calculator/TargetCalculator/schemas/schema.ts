import { z } from 'zod';

export const targetCalculatorSchema = z.object({
  coinSymbol: z.string({
    message: "Please select a coin",
  })
    .min(1, "Coin symbol is required"),

  amountOwned: z.number({
    message: "Amount must be a valid number",
  })
    .positive("Amount must be positive")
    .min(0.00000001, "Amount too small")
    .max(1000000, "Amount seems too high"),

  averageEntry: z.number({
    message: "Average entry price must be a valid number",
  })
    .positive("Entry price must be positive")
    .min(0.01, "Entry price must be at least $0.01")
    .max(10000000, "Entry price seems unrealistic"),

  targetPrice: z.number({
    message: "Target price must be a valid number",
  })
    .positive("Target price must be positive")
    .min(0.01, "Target price must be at least $0.01")
    .max(100000000, "Target price seems unrealistic"),
});

export type TargetCalculatorForm = z.infer<typeof targetCalculatorSchema>;
