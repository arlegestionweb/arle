import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";


const Footer = () => {
  return (
    <section className="relative lg:pb-[420px]">
      <footer className="lg:fixed bottom-0 -z-10 min-h-[420px] w-screen px-4 md:px-10 py-6 md:py-7 text-white bg-[#00002E]">
        <section className="flex flex-col lg:flex-row gap-10 lg:gap-20 pb-8">
          <div>
            <Image src={"/logo-footer.png"} width={121} height={72} alt="logo" />
            <p className="text-lg">Acerca de nosotros</p>
          </div>
          <div>
            <h3 className="pb-4 text-stone-400 text-2xl font-semibold font-lora leading-7">Products</h3>
            <ul className="space-y-2">
              <li>Perfumes</li>
              <li>Relojes</li>
              <li>Gafas</li>
              <li>Estado de compra</li>
            </ul>
          </div>
          <div>
            <h3 className="pb-4 text-stone-400 text-2xl font-semibold font-lora leading-7">Conoce nuestras sedes</h3>
            <ul className="space-y-2">
              <li>
                <div className="flex gap-1.5 items-center">
                  <HiOutlineLocationMarker/>
                  <h4 className="w-[268px] text-white font-bold font-inter leading-snug">[nombre-sede]</h4>
                </div>
                <div className="w-72 text-white font-normal font-raleway leading-snug">Jardín plaza, Cra. 98 #16 - 200, Cali, Valle del Cauca</div>
              </li>
              <li>
                <div className="flex gap-1.5 items-center">
                  <HiOutlineLocationMarker/>
                  <h4 className="w-[268px] text-white font-bold font-inter leading-snug">[nombre-sede]</h4>
                </div>
                <div className="w-72 text-white font-normal font-raleway leading-snug">Jardín plaza, Cra. 98 #16 - 200, Cali, Valle del Cauca</div>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="pb-4 text-stone-400 text-2xl font-semibold font-lora leading-7">Legal</h3>
            <ul className="space-y-2">
              <li>Términos y condiciones</li>
              <li>Política de privacidad</li>
              <li>Garantías, cambios y devoluciones</li>
              <li>Políticas de Envio.</li>
              <li>Políticas de Cookies</li>
              <li>Preguntas Frecuentes</li>
            </ul>
          </div>
        </section>
        <section className="border-b-[1px] pb-3 border-white text-white flex justify-center space-x-5">
          <a className="w-9 h-9 flex bg-stone-400 text-black justify-center items-center" target="">
            <FaFacebookF size={18}/>
          </a>
          <a className="w-9 h-9 flex bg-stone-400 text-black justify-center items-center" target="">
            <FaTwitter size={18}/>
          </a>
          <a className="w-9 h-9 flex bg-stone-400 text-black justify-center items-center" target="">
            <FaInstagram size={18}/>
          </a>
          <a className="w-9 h-9 flex bg-stone-400 text-black justify-center items-center" target="">
            <FaLinkedinIn size={18}/>
          </a>
          <a className="w-9 h-9 flex bg-stone-400 text-black justify-center items-center" target="">
            <FaYoutube size={18}/>
          </a>
        </section>
        <section className="pt-3">
          <div className="text-center text-stone-400 text-sm font-normal font-raleway leading-normal">
            Copyright © 2023 Arlé | All Rights Reserved |<br />
            Términos y condiciones | Privacy Policy
          </div>
        </section>
      </footer>
    </section>
  );
};

export default Footer;
