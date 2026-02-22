"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: form.name,
      email: form.email,
      message: form.message,
    }),
  });

  const data = await res.json();

  if (data.success) {
    alert("Message sent successfully.");
    setForm({ name: "", email: "", message: "" });
  } else {
    alert("Failed to send message.");
  }
};

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-12">
        Contact Us
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-xs font-bold uppercase tracking-widest">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border px-4 py-3 mt-2 text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-widest">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border px-4 py-3 mt-2 text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-widest">
            Message
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full border px-4 py-3 mt-2 text-sm"
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-8 py-4 uppercase text-xs tracking-widest hover:bg-gray-900"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}