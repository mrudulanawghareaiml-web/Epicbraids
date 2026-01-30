'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Image from 'next/image';
import { handleRecommendation } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Sparkles, Bot, AlertTriangle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const initialState = {
  image: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Sparkles className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Generate My Bracelet
        </>
      )}
    </Button>
  );
}

export function RecommendationForm() {
  const [state, formAction] = useFormState(handleRecommendation, initialState);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Describe Your Style</CardTitle>
        <CardDescription>e.g., "ocean blues and sandy beige" or "a moody, dark forest theme"</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <Textarea
            name="colorPreferences"
            placeholder="Enter color preferences..."
            rows={4}
            required
          />
          <SubmitButton />
        </form>
        
        <div className="mt-6">
            <FormStatus state={state} />
        </div>
      </CardContent>
    </Card>
  );
}

function FormStatus({ state }: { state: { image: string | null; error: string | null }}) {
    const { pending } = useFormStatus();

    if (pending) {
        return (
            <div className="space-y-4">
                <Skeleton className="w-full h-80 rounded-lg" />
                <Skeleton className="w-1/3 h-6" />
            </div>
        )
    }

    if (state.error) {
        return (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Generation Failed</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
            </Alert>
        )
    }
    
    if (state.image) {
        return (
            <div className="space-y-4">
                <div className="p-4 bg-secondary rounded-lg">
                    <h3 className="font-headline text-2xl text-center">Your AI-Generated Design!</h3>
                </div>
                <Image
                    src={state.image}
                    alt="AI generated bracelet"
                    width={512}
                    height={512}
                    className="rounded-lg w-full h-auto object-contain"
                />
                 <Alert>
                    <Bot className="h-4 w-4" />
                    <AlertTitle>Here's your concept!</AlertTitle>
                    <AlertDescription>
                        Like what you see? Head over to our customization page to bring a similar design to life!
                        <Button variant="link" asChild><a href="/customize">Customize Now</a></Button>
                    </AlertDescription>
                </Alert>
            </div>
        )
    }

    return null;
}
