import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThreeScene from "@/components/ThreeScene";

export const metadata: Metadata = {
  title: {
    default: "Acclevate Business Solutions",
    template: "%s | Acclevate",
  },
  description: "Acclevate Business Solutions - Transforming businesses through strategic insight and operational excellence. Partner with us to solve complex challenges and drive growth.",
  keywords: ["consulting", "business solutions", "strategy", "digital transformation", "operations", "leadership"],
  authors: [{ name: "Acclevate Business Solutions" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%232B3674' rx='20' width='100' height='100'/><text x='50' y='70' font-size='60' text-anchor='middle' fill='white'>A</text></svg>"
        />
      </head>
      <body className="font-sans antialiased">
        <ThreeScene />
        <div className="relative z-1">
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
