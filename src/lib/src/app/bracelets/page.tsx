import { supabase } from '@/lib/supabase';

export default async function BraceletsPage() {
  // Get data from database
  const { data: bracelets, error } = await supabase
    .from('bracelets')
    .select('*');

  if (error) {
    return <p>Error loading products</p>;
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">
        Our Bracelets
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {bracelets?.map((item) => {
          // Split images (because we saved them with commas)
          const images = item.images?.split(',');

          return (
            <div
              key={item.id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              {/* Product Image */}
              <img
                src={images?.[0]}
                alt={item.name}
                className="w-full h-48 object-cover rounded-md mb-3"
              />

              {/* Name */}
              <h2 className="font-semibold text-lg">
                {item.name}
              </h2>

              {/* Price */}
              <p className="text-gray-600">
                ₹{item.price}
              </p>

              {/* Description */}
              <p className="text-sm mt-2 text-gray-500 line-clamp-2">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
