"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";

const Footer = () => {
  const pathname = usePathname()

  if (pathname.includes("admin")) return;
  return (
    <section className="relative lg:pb-[100vh]">
      <footer className=" flex flex-col lg:fixed bottom-0 -z-10 min-h-[100vh] w-screen p-6 md:px-10 pt-6 md:pt-20  text-white bg-[#00002E]">
        <div className="flex-1 pt-10 pb-20 w-[182px] h-[130px] flex justify-center self-center items-center">
          <Image
            src={"/logo-footer.svg"}
            width={249}
            height={176}
            alt="logo"
          />
        </div>
        <section className="flex flex-col items-start justify-center lg:flex-row gap-[50px] lg:gap-20 pb-[50px]">
          <div>
            <h3 className="pb-4 text-guidelines-on-color-beige font-lora text-2xl font-semibold leading-7">
              Products
            </h3>
            <ul className="flex flex-col gap-4 text-lg">
              <li>Perfumes</li>
              <li>Relojes</li>
              <li>Gafas</li>
              <li>Estado de compra</li>
            </ul>
          </div>
          <div>
            <h3 className="pb-4 text-guidelines-on-color-beige font-lora text-2xl font-semibold leading-7">
              Arlé
            </h3>
            <ul className="flex flex-col gap-4 text-lg">
              <li>Sobre Nosotros</li>
              <li>Nuestras Sedes</li>
              <li>Trabaja con Nosotros</li>
            </ul>
          </div>
          <div>
            <h3 className="pb-4 text-guidelines-on-color-beige font-lora text-2xl font-semibold leading-7">
              Visítanos
            </h3>
            <ul className="flex flex-col gap-4 text-lg">
              <li>
                <div className="flex gap-1.5 items-center">
                  <HiOutlineLocationMarker />
                  <h4 className="w-[268px] text-white font-bold font-inter leading-snug">
                    [nombre-sede]
                  </h4>
                </div>
                <div className="w-72 text-white font-normal font-raleway leading-snug">
                  Jardín plaza, Cra. 98 #16 - 200, Cali, Valle del Cauca
                </div>
              </li>
              <li>
                <div className="flex gap-1.5 items-center">
                  <HiOutlineLocationMarker />
                  <h4 className="w-[268px] text-white font-bold font-inter leading-snug">
                    [nombre-sede]
                  </h4>
                </div>
                <div className="w-72 text-white font-normal font-raleway leading-snug">
                  Jardín plaza, Cra. 98 #16 - 200, Cali, Valle del Cauca
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="pb-4 text-guidelines-on-color-beige font-lora text-2xl font-semibold leading-7">
              Legal
            </h3>
            <ul className="flex flex-col gap-4 text-lg">
              <li>Términos y condiciones</li>
              <li>Política de privacidad</li>
              <li>Garantías, cambios y devoluciones</li>
              <li>Políticas de Envio.</li>
              <li>Políticas de Cookies</li>
              <li>Preguntas Frecuentes</li>
            </ul>
          </div>
        </section>
        <section className="border-b-[1px] pb-3 border-white text-white flex justify-center md:justify-end space-x-5">
          <a
            className="w-9 h-9 flex bg-guidelines-on-color-beige text-black justify-center items-center"
            target="">
            <FaFacebookF size={18} />
          </a>
          <a
            className="w-9 h-9 flex bg-guidelines-on-color-beige text-black justify-center items-center"
            target="">
            <FaTwitter size={18} />
          </a>
          <a
            className="w-9 h-9 flex bg-guidelines-on-color-beige text-black justify-center items-center"
            target="">
            <FaInstagram size={18} />
          </a>
          <a
            className="w-9 h-9 flex bg-guidelines-on-color-beige text-black justify-center items-center"
            target="">
            <FaLinkedinIn size={18} />
          </a>
          <a
            className="w-9 h-9 flex bg-guidelines-on-color-beige text-black justify-center items-center"
            target="">
            <FaYoutube size={18} />
          </a>
        </section>
        <section className="pt-3">
          <div className="text-center text-guidelines-on-color-beige text-sm font-normal font-raleway leading-normal">
            Copyright © 2023 Arlé | Todos los Derechos Reservados | Diseñado por GoJaguar.co
          </div>
        </section>
      </footer>
    </section>
  );
};

export default Footer;
