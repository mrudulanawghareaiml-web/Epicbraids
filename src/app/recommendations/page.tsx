import { RecommendationForm } from './recommendation-form';
import { Sparkles } from 'lucide-react';

export default function RecommendationsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-block bg-primary/10 p-3 rounded-full mb-4">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-headline">AI Style Advisor</h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Can't decide on a color combination? Describe your desired mood, a favorite place, or simply list some colors, and our AI will create a unique bracelet concept just for you.
        </p>
      </div>
      
      <div className="max-w-2xl mx-auto mt-12">
        <RecommendationForm />
      </div>
    </div>
  );
}
