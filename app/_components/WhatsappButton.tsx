"use client"
import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa6"



export const WhatsappButton = () => {
    const pathname = usePathname()

  if (pathname.includes("admin") || pathname.includes("mass-uploads")) return;
  return (
    <div className="fixed z-20 bottom-8 right-6 rounded-xl bg-green-400 p-[4px] shadow-[-3px_3px_5px_1px_rgba(0,0,0,0.25)] ">
        <FaWhatsapp className="text-[50px] text-white" />
    </div>
  )
}