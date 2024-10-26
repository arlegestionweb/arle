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
import PopUpBanner from "./_components/PopUpBanner";
import Script from "next/script";
import { WhatsappButton } from "./_components/WhatsappButton";



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

  const siteSettings = await getSiteSettings();
  const nuestrasSedes = await getNuestrasSedesContent();


  console.log({siteSettings})

  return (
    <html lang="es">
      <head>
        <meta name="google" content="notranslate" />
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID});
            fbq('track', 'PageView');
          `,
          }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-GXJ0V1YG06"></script>
        <Script id="google-analytics" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-GXJ0V1YG06');
          `,
        }}>
        </Script>
      </head>

      <body
        className={`${inter.variable} ${tajawal.variable} ${raleway.variable} ${kanit.variable} ${crimson.variable} ${jomolhari.variable} ${play.variable} overflow-x-hidden no-scrollbar`}
      >
        {siteSettings?.popup && siteSettings.popup.usarPopup &&
          <PopUpBanner popup={siteSettings.popup} />
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
        <WhatsappButton />
        {children}
        {siteSettings && nuestrasSedes && (
          <Footer settings={siteSettings} sedes={nuestrasSedes} />
        )}
      </body>
    </html>
  );
}
