"use client"
import { TNuestrasSedesSchema } from "@/sanity/queries/pages/nuestrasSedesQueries";
import { TSiteSettings } from "@/sanity/queries/siteSettings";
import { toKebabCase } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import { HiOutlineLocationMarker } from "react-icons/hi";

type FooterProps = {
  settings: TSiteSettings,
  sedes: TNuestrasSedesSchema,
}

const titulosLegales: Record<string, string> = {
  terminosCondiciones: "Términos y condiciones",
  politicasPrivacidad: "Políticas de Privacidad",
  garantiasCambiosDevoluciones: "Garantias, Cambios y Devoluciones",
  politicasEnvio: "Políticas de envío",
  politicasCookies: "Políticas de Cookies",
}

const SocialLogo = ({red}:  {red: string}) => {
  if(red === 'facebook') return(<FaFacebookF size={18} />)
  if(red === 'X') return(<FaXTwitter size={18} />)
  if(red === 'WhatsApp') return(<FaWhatsapp size={22} />)
  if(red === 'Instagram') return(<FaInstagram size={22} />)
  if(red === 'linkedIn') return(<FaLinkedinIn size={18} />)
  if(red === 'YouTube') return(<FaYoutube size={22} />)
  if(red === 'TikTok') return(<FaTiktok size={18} />)
  if(red === 'Otra') return(<TbWorld size={22} />)
}

const Footer = ({settings, sedes}: FooterProps) => {

  const pathname = usePathname();

  if (pathname.includes("admin")) return;
  return (
    <section className="lg:fixed ">
      <footer className=" flex flex-col lg:fixed bottom-0 -z-10 min-h-[100vh] w-screen p-6 md:px-10 pt-6 md:pt-20  text-white bg-[#00002E] pointer-events-auto">
        <div className="flex-1 pt-10 pb-20 w-[182px] h-[130px] flex justify-center self-center items-center">
          <Image
            src={"/logo-footer.svg"}
            width={249}
            height={176}
            alt="logo"
          />
        </div>
        <section className="flex flex-col items-start justify-center lg:flex-row gap-[50px] lg:gap-20 pb-[50px]">
          <section>
            <h3 className="pb-4 text-guidelines-on-color-beige font-lora text-2xl font-semibold leading-7 cursor-default">
              <Link href={"/listing"}>
              Productos
              </Link>
            </h3>
            <ul className="flex flex-col gap-4 text-lg">
              <li>
                <Link href="/listing?type=perfume">Perfumes</Link>
              </li>
              <li>
                <Link href="/listing?type=reloj">Relojes</Link>
              </li>
              <li>
                <Link href="/listing?type=gafa">Gafas</Link>
              </li>
              <li>
                <Link href="">Estado de compra</Link>
              </li>
            </ul>
          </section>
          <section>
            <h3 className="pb-4 text-guidelines-on-color-beige font-lora text-2xl font-semibold leading-7 cursor-default">
              Arlé
            </h3>
            <ul className="flex flex-col gap-4 text-lg">
              <li><Link href="/sobre-nosotros">Sobre Nosotros</Link></li>
              <li><Link href="/nuestras-sedes">Nuestras Sedes</Link></li>
              <li><Link href="/trabaja-con-nosotros">Trabaja con Nosotros</Link></li>
            </ul>
          </section>
          {sedes && (
          <section>
            <h3 className="pb-4 text-guidelines-on-color-beige font-lora text-2xl font-semibold leading-7 cursor-default">
              Visítanos
            </h3>
            <ul className="flex flex-col gap-4 text-lg">
              {sedes.sedes.map((sede, index)=>(
              <li key={index + sede.nombre}>
                <Link href={`/nuestras-sedes/${toKebabCase(sede.nombre)}`}>
                  <div className="flex gap-1.5 items-center">
                    <HiOutlineLocationMarker />
                      <h4 className="w-[268px] text-white font-bold font-inter leading-snug">
                        {sede.nombre}
                      </h4>
                  </div>
                  <div className="w-72 text-white font-normal font-raleway leading-snug">
                    {`${sede.nombre}, ${sede.direccion}, ${sede.ciudad}`}
                  </div>
                </Link>
              </li>
              ))}
            </ul>
          </section>)}
          {settings.legal && (
          <section>
            <h3 className="pb-4 text-guidelines-on-color-beige font-lora text-2xl font-semibold leading-7 cursor-default">
              Legal
            </h3>
            <ul className="flex flex-col gap-4 text-lg">
            {Object.entries(settings.legal).map(([key, value], index)=>{
              if (!value || !titulosLegales[key]) return null;
              return(
              <li key={index}>{titulosLegales[key]}</li>
            )})}
              </ul>
          </section>
          )}
        </section>
          <section className="border-b-[1px] pb-3 border-white text-white flex justify-center md:justify-end space-x-5">
            {settings.linksSociales && settings.linksSociales.map((item, index) => {
              if(!item.redSocial) return null
              return(
              <Link
                className="w-9 h-9 flex bg-guidelines-on-color-beige text-black justify-center items-center"
                key={index + item.redSocial}
                href={item.url}
                target="_blank">
                <SocialLogo red={item.redSocial} />
              </Link>
            )})}
          </section>
        <section className="pt-3">
          <div className="text-center text-guidelines-on-color-beige text-sm font-normal font-raleway leading-normal cursor-default">
            Copyright © 2023 Arlé | Todos los Derechos Reservados | Diseñado por
            GoJaguar.co
          </div>
        </section>
      </footer>
    </section>
  );
};

export default Footer;
