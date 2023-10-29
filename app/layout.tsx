import "./globals.css";
import type { Metadata } from "next";
import { Inter, Lora, Raleway } from "next/font/google";
import Navbar from "./_components/navbar";
import Footer from "./_components/Footer";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter'  });

const lora = Lora({ subsets: ["latin"], variable: '--font-lora' });

const raleway = Raleway({ subsets: ["latin"], variable: '--font-raleway' });


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
      <body className={`${inter.variable} ${lora.variable} ${raleway.variable} overflow-x-hidden`}>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
