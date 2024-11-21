"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export const WhatsappButton = () => {

  const pathname = usePathname()
  if (pathname.includes("admin") || pathname.includes("mass-uploads")) return;

  return (
    <Link href="https://wa.me/573160700015?text=Hola,%20estoy%20interesad@%20en%20recibir%20una%20asesoría%20personalizada%20con%20ARLÉ!" target="_blank" className="fixed z-20 bottom-8 right-6 overflow-hidden w-[65px] h-[65px] cursor-pointer hover:scale-110 transition-all ease-out">
        <img className="w-full h-full drop-shadow-[1px_1px_2px_rgb(0,0,0,0.4)] absolute" src="/Whatsapp Logo.png" alt="Whatsapp Logo" />
    </Link>
  )
}