import "./globals.css";
import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import Navbar from "./_components/navbar";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter'  });

const lora = Lora({ subsets: ["latin"], variable: '--font-lora' });


export const metadata: Metadata = {
  title: "Arlé",
  description: "Tienda de accesorios Arlé",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <html lang="en">
      <body className={`${inter.variable} ${lora.variable} overflow-x-hidden`}>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
