export const metadata = {
  title: "EpicBraids",
  description: "Handcrafted Bracelets & Keychains",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
