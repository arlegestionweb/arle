import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MobileNavBar from "./_components/Nav";


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
      <body className={inter.className}>
        <MobileNavBar />
        {children}
      </body>
    </html>
  );
}
