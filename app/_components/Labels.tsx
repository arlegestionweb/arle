import { cn } from "../_lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { BsMagic, BsCheck2Circle } from "react-icons/bs";
import {CiCircleAlert, CiPercent, CiCircleMinus} from 'react-icons/ci'

const labelsVariants = cva(
  "absolute top-0 flex p-1 md:p-2 gap-1 items-center border-2 whitespace-nowrap",
  {
    variants: {
      labelType: {
        nuevo: "bg-color-bg-surface-1-default border-[#bebebe]",
        "mas vendido": "bg-[#e8f0e6] border-[#396231] text-[#274a21]",
        "ultimas unidades": "bg-[#ffecc0] border-[#805a00] text-[#583e00]",
        agotado: "bg-[#fceae9] border-[#b52d2a] text-[#7d1f1d]",
        "super descuento": "bg-[#bbfdd1] border-[#206e3a] text-[#164c28]",
      },
    },
    defaultVariants: {
      labelType: "nuevo",
    },
  }
);

export type LabelTypes =
  | "nuevo" 
  | "mas vendido"
  | "ultimas unidades"
  | "agotado"
  | "super descuento"

const variants = {
  "nuevo": {
    icon: <BsMagic />,
    text: "¡Nuevo!"
  },
  "mas vendido": {
    icon: <BsCheck2Circle />,
    text: "Más Vendido"
  },
  "ultimas unidades": {
    icon: <CiCircleAlert />,
    text: "pocas unidades"
  },
  "agotado": {
    icon: <CiCircleMinus size={19}/>,
    text: "Agotado"
  },
  "super descuento": {
    icon: <CiPercent />,
    text: "Súper Descuento"
  },
}

interface LabelsProps extends VariantProps<typeof labelsVariants> {
  label: LabelTypes;
  className?: string;
}

const Labels = ({ label, className, labelType }: LabelsProps) => {
  return (
    <div className={cn(labelsVariants({ labelType }), className)}>
      {variants[label].icon}
      <span className="font-tajawal font-medium text-[0.7rem] md:text-base leading-5 capitalize">
        {variants[label].text}
      </span>
    </div>
  );
};

export default Labels;