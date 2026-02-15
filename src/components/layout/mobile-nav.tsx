export default function Home() {
  return (
    <main className="bg-[#fcfcf7]">

      {/* HERO */}
      <section className="relative h-[500px] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >
        <div className="bg-black/40 absolute inset-0" />
        <div className="relative z-10 text-white">
          <h1 className="text-4xl md:text-6xl font-bold">
            BRACELETS
          </h1>
          <p className="mt-4 text-lg">That tells your story.</p>
          <button className="mt-6 px-6 py-3 bg-white text-black rounded-md">
            Shop Our Collection
          </button>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-center text-2xl font-semibold mb-12">
          Our Featured Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[1,2,3,4].map((item) => (
            <div key={item} className="text-center">
              <div className="bg-gray-200 h-64 mb-4" />
              <h3 className="font-medium">Bracelet Name</h3>
              <p className="text-gray-500">₹299.00</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
