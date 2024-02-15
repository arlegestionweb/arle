"use client";
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
import { SlLocationPin } from "react-icons/sl";
import { GoArrowUpRight } from "react-icons/go";

type FooterProps = {
  settings: TSiteSettings;
  sedes: TNuestrasSedesSchema;
};

const titulosLegales: Record<string, string> = {
  terminosCondiciones: "Términos y condiciones",
  politicasPrivacidad: "Políticas de Privacidad",
  garantiasCambiosDevoluciones: "Garantias, Cambios y Devoluciones",
  politicasEnvio: "Políticas de envío",
  politicasCookies: "Políticas de Cookies",
};

const SocialLogo = ({ red }: { red: string }) => {
  if (red === "facebook") return <FaFacebookF size={18} />;
  if (red === "X") return <FaXTwitter size={18} />;
  if (red === "WhatsApp") return <FaWhatsapp size={22} />;
  if (red === "Instagram") return <FaInstagram size={22} />;
  if (red === "linkedIn") return <FaLinkedinIn size={18} />;
  if (red === "YouTube") return <FaYoutube size={22} />;
  if (red === "TikTok") return <FaTiktok size={18} />;
  if (red === "Otra") return <TbWorld size={22} />;
};

const Footer = ({ settings, sedes }: FooterProps) => {
  const pathname = usePathname();

  if (pathname.includes("admin")) return;
  return (
    <section className="lg:fixed ">
      <footer className=" flex flex-col lg:fixed bottom-0 -z-10 min-h-[100vh] w-screen p-6 md:px-20 xs:px-8 sm:px-14 md:pt-20  text-white bg-arle-blue pointer-events-auto">
        <div className="flex-1 pt-10 pb-20 w-[210px] md:w-[260px] flex justify-center self-center items-center">
          <Image src={"/logo-footer.svg"} width={280} height={200} alt="logo" />
        </div>
        <section className="flex flex-col items-start justify-center lg:flex-row gap-[50px] lg:gap-20 pb-[50px]">
          <section>
            <h2 className="pb-4">
              <Link className="text-arle-beige text-2xl lux-title cursor-pointer" href={"/listing"}>Productos</Link>
            </h2>
            <ul className="flex flex-col gap-4 text-lg">
              <li className="section-text underline-offset-2 hover:underline">
                <Link href="/listing?type=perfume">Perfumes</Link>
              </li>
              <li className="section-text underline-offset-2 hover:underline">
                <Link href="/listing?type=reloj">Relojes</Link>
              </li>
              <li className="section-text underline-offset-2 hover:underline">
                <Link href="/listing?type=gafa">Gafas</Link>
              </li>
              <li>
                <Link className="section-text underline-offset-2 hover:underline flex gap-1" href="">
                <GoArrowUpRight className="w-5 h-5 -mt-0.5" />
                  Estado de compra
                </Link>
              </li>
            </ul>
          </section>
          <section>
            <h2 className="pb-4 text-arle-beige text-2xl lux-title cursor-default">
              Arlé
            </h2>
            <ul className="flex flex-col gap-4 text-lg">
              <li className="section-text underline-offset-2 hover:underline">
                <Link href="/sobre-nosotros">Sobre Nosotros</Link>
              </li>
              <li className="section-text underline-offset-2 hover:underline">
                <Link href="/nuestras-sedes">Nuestras Sedes</Link>
              </li>
              <li className="section-text underline-offset-2 hover:underline">
                <Link href="/trabaja-con-nosotros">Trabaja con Nosotros</Link>
              </li>
              <li>
                <Link className="section-text underline-offset-2 hover:underline flex gap-1" href="https://wa.me/573160700015?text=Hola,%20estoy%20interesad@%20en%20recibir%20una%20asesoría%20personalizada%20con%20Arlé!">
                <GoArrowUpRight className="w-5 h-5 -mt-0.5" />
                  Recibe una Asesoría
                </Link>
              </li>
            </ul>
          </section>
          {sedes && (
            <section>
              <h2 className="pb-4 text-arle-beige text-2xl lux-title cursor-default">
                Visítanos
              </h2>
              <ul className="flex flex-col gap-4 text-lg">
                {sedes.sedes.map((sede, index) => (
                  <li key={index + sede.nombre}>
                    <Link className="group" href={`/nuestras-sedes/${toKebabCase(sede.nombre)}`}>
                      <div className="flex gap-1 items-start">
                      <SlLocationPin className="w-4 h-4"/>
                        <h3 className="w-[268px] text-white font-normal font-tajawal leading-snug group-hover:underline underline-offset-2">
                          {sede.nombre}
                        </h3>
                      </div>
                      <div className="w-72 section-text">
                        {`${sede.direccion}, ${sede.ciudad}`}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {settings.legal && (
            <section>
              <h2 className="pb-4 text-arle-beige text-2xl lux-title cursor-default">
                Legal
              </h2>
              <ul className="flex flex-col gap-4 text-lg">
                {Object.entries(settings.legal).map(([key, value], index) => {
                  if (!value || !titulosLegales[key]) return null;
                  return (
                    <li className="section-text underline-offset-2 hover:underline" key={`${index}-${titulosLegales[key]}`}>
                      <Link href={`/legal/${key}`}>{titulosLegales[key]}</Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </section>
        <section className="border-b-[1px] pb-3 border-white text-white flex justify-center md:justify-end space-x-5">
          {settings.linksSociales &&
            settings.linksSociales.map((item, index) => {
              if (!item.redSocial) return null;
              return (
                <Link
                  className="w-9 h-9 flex bg-arle-beige text-black justify-center items-center hover:scale-[1.08]"
                  key={index + item.redSocial}
                  href={item.url}
                  target="_blank"
                >
                  <SocialLogo red={item.redSocial} />
                </Link>
              );
            })}
        </section>
        <section className="pt-3">
          <div className="text-center text-arle-beige text-sm font-light font-inter cursor-default">
            Copyright © 2023 Arlé | Todos los Derechos Reservados | Diseñado por
            GoJaguar.co
          </div>
        </section>
      </footer>
    </section>
  );
};

export default Footer;
