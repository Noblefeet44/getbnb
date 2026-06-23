import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GetBnB — Your European Rental Concierge",
  description:
    "Relocating to Europe? Tell us your budget, destination, and move-in date. We'll send you hand-curated, verified rental matches — fast. No listings to scroll. No guesswork.",
  keywords: [
    "European rental",
    "expat housing",
    "relocation rental",
    "rent in Europe",
    "European property search",
    "furnished apartments Europe",
    "expat concierge",
  ],
  authors: [{ name: "GetBnB" }],
  openGraph: {
    title: "GetBnB — Your European Rental Concierge",
    description:
      "Find your perfect European rental in 48 hours. We curate verified options so you don't have to scroll for months.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "GetBnB — Your European Rental Concierge",
    description:
      "Relocating to Europe? We handle the entire rental search for you.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
