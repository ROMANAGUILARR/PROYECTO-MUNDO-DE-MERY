import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "@/styles/globals.css";
import "leaflet/dist/leaflet.css";
import Footer from "@/components/Footer";
import ToasterProvider from "@/components/providers/toaster-provider";
import { CartProvider } from "@/features/cart/cart-context";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "El mundo de Mery",
  description: "Ecommerce minimalista de cerámica decorativa artesanal.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} bg-[--background] text-[--foreground] antialiased`}
      >
        <CartProvider>
          {children}
          <ToasterProvider />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}