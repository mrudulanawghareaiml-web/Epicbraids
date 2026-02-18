'use client';

import { supabase } from '@/lib/supabase';
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
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ShieldCheck } from 'lucide-react';

// 1. Updated Schema (Removed credit card fields since Razorpay handles them)
const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name is too short'),
  address: z.string().min(5, 'Address is too short'),
  city: z.string().min(2, 'City is too short'),
  postalCode: z.string().min(4, 'Postal code is too short'),
  country: z.string().min(2, 'Country is too short'),
});

export function CheckoutForm() {
  const router = useRouter();
  const { clearCart, cartItems } = useCart();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', name: '', address: '', city: '', postalCode: '', country: '' },
  });

  const { isSubmitting } = form.formState;

  // 2. Finalize Order Logic (Saves to Supabase)
  const finalizeOrder = async (values: z.infer<typeof formSchema>, paymentId: string) => {
    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert([{
        email: values.email,
        customer_name: values.name,
        address: `${values.address}, ${values.city}, ${values.postalCode}, ${values.country}`,
        total_amount: totalAmount,
        status: 'paid', // Mark as paid immediately
      }])
      .select().single();

    if (orderError) throw orderError;

    const orderItems = cartItems.map((item) => ({
      order_id: orderData.id,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    await supabase.from('order_items').insert(orderItems);
    clearCart();
    router.push(`/checkout/success?order=${orderData.id}`);
  };

  // 3. Main Submit (Opens Razorpay)
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

      // Create Razorpay Order via your API
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount }),
      });
      const data = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: totalAmount * 100,
        currency: "INR",
        name: "My Awesome Store",
        description: "Order Payment",
        order_id: data.orderId,
        handler: async (response: any) => {
          await finalizeOrder(values, response.razorpay_payment_id);
        },
        prefill: { name: values.name, email: values.email },
        theme: { color: "#000000" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error: any) {
      toast({ title: "Payment Failed", description: error.message, variant: "destructive" });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem><FormLabel>Email</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <div className="md:col-span-2">
            <FormField control={form.control} name="address" render={({ field }) => (
              <FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-slate-50 p-3 rounded-md">
          <ShieldCheck className="w-4 h-4 text-green-600" />
          Payments are securely processed by Razorpay.
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Preparing Payment...</> : 'Pay Now'}
        </Button>
      </form>
    </Form>
  );
}
