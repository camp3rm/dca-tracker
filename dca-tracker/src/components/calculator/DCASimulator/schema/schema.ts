import { z } from 'zod';

export const dcaSimulatorSchema = z.object({
	initialInvestment: z.number().min(0.01, { message: 'Initial investment must be greater than 0' }),
monthlyInvestment: z.number().min(0.01, { message: 'Monthly investment must be greater than 0' }),
duration: z.number().min(1, { message: 'Duration must be at least 1 month' }),
	expectedROI: z.number().min(-100, { message: 'ROI must be greater than -100%' }),
});

export type DCASimulatorForm = z.infer<typeof dcaSimulatorSchema>;
