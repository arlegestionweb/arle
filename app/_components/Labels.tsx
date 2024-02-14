import { cn } from "../_lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { BsMagic, BsCheck2Circle } from "react-icons/bs";
import { CiCircleAlert, CiPercent, CiCircleMinus } from "react-icons/ci";
import { twMerge } from "tailwind-merge";

// const labelsVariants = cva(
//   "absolute top-0 flex py-[2px] md:py-1 px-2 gap-1 items-center border-2 whitespace-nowrap pointer-events-none",
//   {
//     variants: {
//       labelType: {
//         nuevo: "bg-color-bg-surface-1-default border-[#bebebe]",
//         "mas vendido": "bg-[#e8f0e6] border-[#396231] text-[#274a21]",
//         "ultimas unidades": "bg-[#ffecc0] border-[#805a00] text-[#583e00]",
//         agotado: "bg-[#fceae9] border-[#b52d2a] text-[#7d1f1d]",
//         "super descuento": "bg-[#bbfdd1] border-[#206e3a] text-[#164c28]",
//       },
//     },
//     defaultVariants: {
//       labelType: "nuevo",
//     },
//   }
// );

type Variant = {
  icon: JSX.Element;
  text: string;
  style: string;
};

const variants: Record<string, Variant> = {
  "Nuevo": {
    icon: <BsMagic />,
    text: "¡Nuevo!",
    style: "bg-color-bg-surface-1-default border-[#bebebe]",
  },
  "Mas Vendido": {
    icon: <BsCheck2Circle />,
    text: "Más Vendido",
    style: "bg-[#e8f0e6] border-[#396231] text-[#274a21]",
  },
  "Ultimas Unidades": {
    icon: <CiCircleAlert />,
    text: "pocas unidades",
    style: "bg-[#ffecc0] border-[#805a00] text-[#583e00]",
  },
  "Agotado": {
    icon: <CiCircleMinus size={19} />,
    text: "Agotado",
    style: "bg-[#fceae9] border-[#b52d2a] text-[#7d1f1d]",
  },
  "Super Descuento": {
    icon: <CiPercent />,
    text: "Súper Descuento",
    style: "bg-[#bbfdd1] border-[#206e3a] text-[#164c28]",
  },
};

type LabelsProps = {
  label: keyof typeof variants;
  className?: string;
}

const Labels = ({ label, className }: LabelsProps) => {
  return (
    <section className={cn( variants[label].style, "absolute top-0 flex py-[2px] md:py-1 px-2 gap-1 items-center border-2 whitespace-nowrap pointer-events-none", className)}>
      {variants[label].icon}
      <span
        className="font-inter font-light text-sm capitalize">
        {variants[label].text}
      </span>
    </section>
  );
};

export default Labels;
