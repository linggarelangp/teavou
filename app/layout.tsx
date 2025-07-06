import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./hooks/useCart";

type Children = Readonly<{ children: React.ReactNode }>;

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Teavou App",
  description: "Teavou is a app for tea and coffee lovers to share their experiences and reviews.",
};

export default function RootLayout({ children }: Children) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${geistMono.variable}`}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
