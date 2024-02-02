import "./globals.css";
import type { Metadata } from "next";
import {
  Inter,
  Lora,
  Raleway,
  Tajawal,
  Kanit,
  Crimson_Text,
} from "next/font/google";
import Navbar from "./_components/navbar";
import Footer from "./_components/Footer";
import { headers } from "next/headers";
import Cart from "./_components/cart";
import { getSiteSettings } from "@/sanity/queries/siteSettings";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });

const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway" });

const tajawal = Tajawal({
  weight: [ "200","400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-tajawal",
});

const kanit = Kanit({
  weight: ["200","400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-kanit",
});

const crimson_Text = Crimson_Text({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--crimson-text",
});

export const metadata: Metadata = {
  title: "Arlé",
  description: "Tienda de accesorios Arlé",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const siteSettings = await getSiteSettings()
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${lora.variable} ${raleway.variable} ${tajawal.variable} ${kanit.variable} ${crimson_Text.variable} overflow-x-hidden`}>
        <Navbar />
        <Cart showDiscountCode={siteSettings?.mostrarCodigoDeDescuento || false} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
// /perfumepremium/carolina-herrera/good-girl-supreme-edp/ff2cfa02-3708-4bdf-9211-c329b7b0fad5
