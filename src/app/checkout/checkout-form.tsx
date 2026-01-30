'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { CreditCard } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2, 'Name is too short'),
  address: z.string().min(5, 'Address is too short'),
  city: z.string().min(2, 'City is too short'),
  postalCode: z.string().min(4, 'Postal code is too short'),
  country: z.string().min(2, 'Country is too short'),
  cardName: z.string().min(2, 'Name on card is too short'),
  cardNumber: z.string().regex(/^\d{16}$/, 'Invalid card number'),
  cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid format (MM/YY)'),
  cardCvc: z.string().regex(/^\d{3,4}$/, 'Invalid CVC'),
});

export function CheckoutForm() {
  const router = useRouter();
  const { clearCart, cartItems } = useCart();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
      cardName: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Order placed:', { ...values, items: cartItems });
    toast({
        title: 'Order Placed!',
        description: 'Thank you for your purchase. A confirmation has been sent to your email.'
    })
    clearCart();
    router.push('/checkout/success');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>

        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Shipping Address</h3>
            <FormField name="name" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField name="address" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Address</FormLabel><FormControl><Input placeholder="123 Main St" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField name="city" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="Anytown" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="postalCode" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Postal Code</FormLabel><FormControl><Input placeholder="12345" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="country" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Country</FormLabel><FormControl><Input placeholder="United States" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
            </div>
        </div>

        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Payment Details</h3>
            <FormField name="cardName" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Name on Card</FormLabel><FormControl><Input placeholder="John M. Doe" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
             <FormField name="cardNumber" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Card Number</FormLabel><FormControl><Input placeholder=".... .... .... ...." {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField name="cardExpiry" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Expiry (MM/YY)</FormLabel><FormControl><Input placeholder="MM/YY" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                 <FormField name="cardCvc" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>CVC</FormLabel><FormControl><Input placeholder="123" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
            </div>
        </div>

        <Button type="submit" size="lg" className="w-full">
            <CreditCard className="mr-2" />
            Place Order
        </Button>
      </form>
    </Form>
  );
}
