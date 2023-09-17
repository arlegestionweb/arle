import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./_components/navbar";
import MobileNavBar from "./_components/navbar/NavMobile";


const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className+' overflow-x-hidden'}>
        <MobileNavBar />
        {children}
      </body>
    </html>
  );
}
