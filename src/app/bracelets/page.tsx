'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function BraceletsPage() {
  const [bracelets, setBracelets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBracelets()
  }, [])

  async function fetchBracelets() {
    const { data, error } = await supabase
      .from('bracelets') 
      .select('*')

    if (error) {
      console.error('Supabase error:', error)
    } else {
      setBracelets(data || [])
    }

    setLoading(false)
  }

  if (loading) return <p>Loading...</p>

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bracelets</h1>

      {bracelets.length === 0 && (
        <p className="text-gray-500">No bracelets found</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {bracelets.map((item) => (
          <div key={item.id} className="border p-4 rounded">
            <h3 className="font-semibold">{item.name}</h3>
            <p>{item.description}</p>
            <p className="font-bold">₹{item.price}</p>

            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.name}
                className="mt-2"
              />
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
