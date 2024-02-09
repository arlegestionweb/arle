import "./globals.css";
import { Inter, Tajawal, Raleway, Kanit, Crimson_Text, Jomolhari, Play } from "next/font/google";
import Navbar from "./_components/navbar";
import Footer from "./_components/Footer";
import Cart from "./_components/cart";
import {
  getSiteSettings,
  getSiteSettingsMetadata,
} from "@/sanity/queries/siteSettings";
import { getNuestrasSedesContent } from "@/sanity/queries/pages/nuestrasSedesQueries";
import { Suspense } from "react";

const jomolhari = Jomolhari({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-jomolhari",
})

const crimson = Crimson_Text({
  weight: [ "400", "600", "700"],
  subsets: ["latin"],
  variable: "--crimson-pro",
});

const tajawal = Tajawal({
  weight: ["200", "300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-tajawal",
});

const inter = Inter({
  weight: ["200", "300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-kanit",
});

const kanit = Kanit({
  weight: ["200", "300", "400"],
  subsets: ["latin"],
  variable: "--font-kanit",
});

const raleway = Raleway({
  weight: ["300", "400"],
  subsets: ["latin"],
  variable: "--font-raleway",
});

const play = Play({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-play",
})

export async function generateMetadata() {
  // fetch data
  const Metadata = await getSiteSettingsMetadata();
  // optionally access and extend (rather than replace) parent metadata

  return {
    title: Metadata?.titulo,
    description: Metadata?.descripcion,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteSettings = await getSiteSettings();
  const nuestrasSedes = await getNuestrasSedesContent();

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${tajawal.variable} ${raleway.variable} ${kanit.variable} ${crimson.variable} ${jomolhari.variable} ${play.variable} overflow-x-hidden no-scrollbar`}
      >
        <Navbar
          marca={
            siteSettings?.marcaPromocionada &&
            siteSettings.marcaPromocionada.titulo
          }
        />
        <Cart
          showDiscountCode={siteSettings?.mostrarCodigoDeDescuento || false}
        />
        {children}
        {siteSettings && nuestrasSedes && (
          <Footer settings={siteSettings} sedes={nuestrasSedes} />
        )}
      </body>
    </html>
  );
}
