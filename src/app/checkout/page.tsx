import { CheckoutForm } from './checkout-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { OrderSummary } from './order-summary';

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline">Checkout</h1>
        <p className="text-muted-foreground mt-2 text-lg">Almost there! Please fill in your details to complete the order.</p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
        <Card>
          <CardHeader>
            <CardTitle>Shipping & Payment</CardTitle>
            <CardDescription>Enter your shipping address and payment details.</CardDescription>
          </CardHeader>
          <CardContent>
            <CheckoutForm />
          </CardContent>
        </Card>
        
        <div className="row-start-1 lg:row-start-auto">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <OrderSummary />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
