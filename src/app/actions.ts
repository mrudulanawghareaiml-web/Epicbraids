'use server';

import { generateBraceletRecommendation } from '@/ai/flows/generate-bracelet-recommendation';

export async function handleRecommendation(
  prevState: any,
  formData: FormData
) {
  const colorPreferences = formData.get('colorPreferences') as string;

  if (!colorPreferences) {
    return {
      image: null,
      error: 'Please enter your color preferences.',
    };
  }

  try {
    const result = await generateBraceletRecommendation({ colorPreferences });
    if (result.braceletImage) {
      return {
        image: result.braceletImage,
        error: null,
      };
    }
    return {
        image: null,
        error: 'Failed to generate image. Please try again.'
    }
  } catch (error) {
    console.error(error);
    return {
      image: null,
      error: 'An unexpected error occurred. Please try again later.',
    };
  }
}
