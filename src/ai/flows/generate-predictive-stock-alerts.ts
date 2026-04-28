'use server';
/**
 * @fileOverview A Genkit flow for generating predictive alerts about potential blood type shortages or anticipating surges in demand.
 *
 * - generatePredictiveStockAlerts - A function that handles the predictive alert generation process.
 * - GeneratePredictiveStockAlertsInput - The input type for the generatePredictiveStockAlerts function.
 * - GeneratePredictiveStockAlertsOutput - The return type for the generatePredictiveStockAlerts function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GeneratePredictiveStockAlertsInputSchema = z.object({
  bloodType: z.string().describe('The blood type for which to generate predictions (e.g., A+, O-).'),
  location: z.string().describe('The geographical area for which to predict demand/shortage.'),
  historicalDataSummary: z
    .string()
    .describe(
      'A summary of historical stock levels and demand patterns for the specified blood type and location.'
    ),
  currentTrendsSummary: z
    .string()
    .describe(
      'A summary of current trends and events affecting blood demand (e.g., seasonal changes, local incidents).'
    ),
});
export type GeneratePredictiveStockAlertsInput = z.infer<typeof GeneratePredictiveStockAlertsInputSchema>;

const GeneratePredictiveStockAlertsOutputSchema = z.object({
  prediction: z
    .string()
    .describe(
      'A concise prediction about potential blood shortages or demand surges (e.g., "B+ stock likely to run out in 2 days", "High demand detected in this area").'
    ),
  severity: z
    .enum(['Low', 'Medium', 'High', 'Critical'])
    .describe('The severity level of the predicted alert.'),
  recommendedAction: z
    .string()
    .describe(
      'A suggested proactive action to address the predicted situation (e.g., "Increase donor drives", "Transfer stock from nearby banks").'
    ),
});
export type GeneratePredictiveStockAlertsOutput = z.infer<typeof GeneratePredictiveStockAlertsOutputSchema>;

export async function generatePredictiveStockAlerts(
  input: GeneratePredictiveStockAlertsInput
): Promise<GeneratePredictiveStockAlertsOutput> {
  return generatePredictiveStockAlertsFlow(input);
}

const generatePredictiveStockAlertsPrompt = ai.definePrompt({
  name: 'generatePredictiveStockAlertsPrompt',
  input: { schema: GeneratePredictiveStockAlertsInputSchema },
  output: { schema: GeneratePredictiveStockAlertsOutputSchema },
  prompt: `You are an AI analyst for a blood coordination system. Your task is to analyze blood stock data and current trends to provide predictive alerts for blood banks.

Analyze the following information for blood type: {{{bloodType}}} in location: {{{location}}}.

Historical Data Summary: {{{historicalDataSummary}}}
Current Trends Summary: {{{currentTrendsSummary}}}

Based on this analysis, generate a clear prediction, assign a severity level (Low, Medium, High, Critical), and recommend a proactive action. The prediction should be concise and actionable.`,
});

const generatePredictiveStockAlertsFlow = ai.defineFlow(
  {
    name: 'generatePredictiveStockAlertsFlow',
    inputSchema: GeneratePredictiveStockAlertsInputSchema,
    outputSchema: GeneratePredictiveStockAlertsOutputSchema,
  },
  async (input) => {
    const { output } = await generatePredictiveStockAlertsPrompt(input);
    return output!;
  }
);
