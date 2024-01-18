import { useState } from "react";
import { useCartStore } from "./store";
import { zodApiResponseSchema } from "@/app/checkout/discount-code/zod";
import { FaCheck } from "react-icons/fa6";
import { cn } from "@/app/_lib/utils";

const CodigoDeDescuento = () => {
  const [isDiscountVerified, setIsDiscountVerified] = useState(false);
  const { applyDiscountCode } = useCartStore((state) => state);

  // const [discountCodes, setDiscountCodes] = useState<TDiscountCode[] | undefined>(undefined);

  const handleDiscountCodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    // if (value === "DCTO30") {
    //   setIsDiscountVerified(true);
    //   applyDiscountCode(value, 30);
    // } else {
    //   setIsDiscountVerified(false);
    // }

    const response = await fetch("checkout/discount-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: value }),
    });

    const res = await response.json();

    const parsedResponse = zodApiResponseSchema.safeParse(res);

    if (!parsedResponse.success) {
      console.error(parsedResponse.error);
      return;
    }

    if (parsedResponse.data.status !== 200) return;

    if (parsedResponse.data.status === 200) {
      setIsDiscountVerified(true);
      applyDiscountCode(
        parsedResponse.data.body.discountCode.codigo,
        parsedResponse.data.body.discountCode.porcentaje
      );
    }
  };
  return (
    <label
      htmlFor={"discountCode"}
      className="text-zinc-800 text-lg font-medium font-tajawal leading-snug flex flex-col"
    >
      <h4 className="text-zinc-800 text-xl font-medium font-tajawal leading-normal">
        Código de descuento
      </h4>

      <div className="flex">
        <input
          className="w-full h-9 px-3 py-1.5 bg-white rounded-tl rounded-bl  border border-stone-300 focus:outline-none focus:border-black"
          name={"discountCode"}
          id={"discountCode"}
          placeholder={"DCTO30"}
          onChange={handleDiscountCodeChange}
        />
        <div className="w-[46px] h-9 bg-zinc-200 rounded-tr rounded-br border-r border-t border-b border-stone-300 justify-center items-center gap-1 inline-flex">
          <FaCheck
            className={cn(
              "w-3.5 h-3.5",
              isDiscountVerified ? "text-green-700" : "text-stone-300"
            )}
          />
        </div>
      </div>
    </label>
  );
};

export default CodigoDeDescuento;