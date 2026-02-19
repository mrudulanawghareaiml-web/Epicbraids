"use client";

export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 flex items-center justify-center">
      <Card className="max-w-lg w-full text-center">
        <CardHeader>
          <div className="mx-auto bg-green-100 dark:bg-green-900/50 p-3 rounded-full w-fit">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
          <CardTitle className="text-3xl mt-4">
            Order Confirmed!
          </CardTitle>
          <CardDescription className="text-lg">
            Thank you for your purchase.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {orderId && (
            <div className="p-3 bg-muted rounded-md flex flex-col items-center gap-2">
              <span className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                Order Reference
              </span>
              <code className="text-sm font-mono break-all">
                {orderId}
              </code>
            </div>
          )}

          <p className="text-muted-foreground">
            We've received your order and will start processing it right away.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <Button asChild size="lg">
              <Link href="/products">Continue Shopping</Link>
            </Button>

            <Button variant="outline" size="lg" asChild>
              <Link href="/account/orders">View My Orders</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
