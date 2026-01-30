'use server';
/**
 * @fileOverview Generates a bracelet recommendation based on user color preferences.
 *
 * - generateBraceletRecommendation - A function that generates the bracelet recommendation.
 * - GenerateBraceletRecommendationInput - The input type for the generateBraceletRecommendation function.
 * - GenerateBraceletRecommendationOutput - The return type for the generateBraceletRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBraceletRecommendationInputSchema = z.object({
  colorPreferences: z
    .string()
    .describe('The preferred colors for the bracelet design.'),
});
export type GenerateBraceletRecommendationInput = z.infer<
  typeof GenerateBraceletRecommendationInputSchema
>;

const GenerateBraceletRecommendationOutputSchema = z.object({
  braceletImage: z
    .string()
    .describe(
      "A generated image of a bracelet that matches the user's color preferences. The image is a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateBraceletRecommendationOutput = z.infer<
  typeof GenerateBraceletRecommendationOutputSchema
>;

export async function generateBraceletRecommendation(
  input: GenerateBraceletRecommendationInput
): Promise<GenerateBraceletRecommendationOutput> {
  return generateBraceletRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBraceletRecommendationPrompt',
  input: {schema: GenerateBraceletRecommendationInputSchema},
  output: {schema: GenerateBraceletRecommendationOutputSchema},
  prompt: `Generate an image of a bracelet with the following color preferences: {{{colorPreferences}}}. The bracelet should be visually appealing and suitable for online retail display. Return the image as a data URI.
`,
});

const generateBraceletRecommendationFlow = ai.defineFlow(
  {
    name: 'generateBraceletRecommendationFlow',
    inputSchema: GenerateBraceletRecommendationInputSchema,
    outputSchema: GenerateBraceletRecommendationOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: `Generate an image of a bracelet with the following color preferences: ${input.colorPreferences}. The bracelet should be visually appealing and suitable for online retail display.`,
    });
    return {
      braceletImage: media!.url,
    };
  }
);
