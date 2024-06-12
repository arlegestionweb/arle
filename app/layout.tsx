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
import PlausibleProvider from 'next-plausible'
import PopUpBanner from "./_components/PopUpBanner";
import { unstable_noStore as noStore } from "next/cache";



const jomolhari = Jomolhari({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-jomolhari",
})

const crimson = Crimson_Text({
  weight: ["400", "600", "700"],
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
  
  noStore();
  const siteSettings = await getSiteSettings();
  const nuestrasSedes = await getNuestrasSedesContent();

  const url = process.env.NEXT_PUBLIC_SITE_URL

  return (
    <html lang="en">
      <head>
        {/* <PlausibleProvider domain={isProduction ? "arle.co" : "beta.arle.co"} /> */}
        <script defer data-domain={url} src="https://plausible.io/js/script.js"></script>

      </head>

      <body
        className={`${inter.variable} ${tajawal.variable} ${raleway.variable} ${kanit.variable} ${crimson.variable} ${jomolhari.variable} ${play.variable} overflow-x-hidden no-scrollbar`}
      >
        { siteSettings?.popup && siteSettings.popup.usarPopup &&
        <PopUpBanner popup={siteSettings.popup}/>
        }
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
