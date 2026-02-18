import { supabase } from "@/lib/supabase";

export default async function AdminOrders() {
  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      {orders?.map((order) => (
        <div key={order.id} className="border p-4 mb-4">
          <p><strong>ID:</strong> {order.id}</p>
          <p><strong>Name:</strong> {order.customer_name}</p>
          <p><strong>Total:</strong> ₹{order.total_amount}</p>
          <p><strong>Status:</strong> {order.status}</p>
        </div>
      ))}
    </div>
  );
}
