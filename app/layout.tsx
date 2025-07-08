import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { CartProvider } from "@/app/hooks/useCart";

type Children = Readonly<{ children: React.ReactNode }>;

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Teavou App",
  description: "Teavou is a app for tea and coffee lovers to share their experiences and reviews.",
};

export default function RootLayout({ children }: Children) {
  return (
    <html lang="en">
      <body className={`${poppins.variable}`}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
