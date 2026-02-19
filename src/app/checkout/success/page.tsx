export const dynamic = "force-dynamic";

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

export default function CheckoutSuccessPage() {
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
