import { z } from 'zod';

export const dcaSimulatorSchema = z.object({
  initialInvestment: z.number({
    message: "Initial investment must be a valid number",
  })
    .nonnegative("Initial investment cannot be negative")
    .min(0, "Can start with $0")
    .max(10000000, "Initial investment seems too high"),

  monthlyInvestment: z.number({
    message: "Monthly investment must be a valid number",
  })
    .positive("Monthly investment must be positive")
    .min(0.01, "Monthly investment must be at least $0.01")
    .max(1000000, "Monthly investment seems too high"),

  duration: z.number({
    message: "Duration must be a valid number",
  })
    .int("Duration must be a whole number")
    .positive("Duration must be positive")
    .min(1, "Duration must be at least 1 month")
    .max(600, "Duration cannot exceed 50 years (600 months)"),

  expectedROI: z.number({
    message: "Expected ROI must be a valid number",
  })
    .min(-100, "ROI cannot be less than -100%")
    .max(1000, "ROI cannot exceed 1000% per year"),
});

export type DCASimulatorForm = z.infer<typeof dcaSimulatorSchema>;
