import { useState } from "react";
import { useCartStore } from "./store";
import { zodApiResponseSchema } from "@/app/checkout/discount-code/zod";
import { FaCheck } from "react-icons/fa6";
import { cn } from "@/app/_lib/utils";
import { IoMdClose } from "react-icons/io";
import Spinner from "../Spinner";

const CodigoDeDescuento = () => {
  const [isDiscountVerified, setIsDiscountVerified] = useState("loading");
  const [isOpen, setIsOpen] = useState(false);
  const [enteredDiscount, setEnteredDiscount] = useState(false);
  const [inputValue, setInputValue] = useState<String>("")
  const { applyDiscountCode, removeDiscountCode } = useCartStore((state) => state);

  // const [discountCodes, setDiscountCodes] = useState<TDiscountCode[] | undefined>(undefined);

  const handleDiscountCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const verifyDiscountCode = async () => {
    const response = await fetch("/checkout/discount-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: inputValue }),
    });

    const res = await response.json();

    const parsedResponse = zodApiResponseSchema.safeParse(res);

    if (!parsedResponse.success) {
      console.error(parsedResponse.error);
      setIsDiscountVerified("denied");
      return;
    }

    if (parsedResponse.data.status !== 200){
      setIsDiscountVerified("denied");
      return;
    };

    if (parsedResponse.data.status === 200) {
      setIsDiscountVerified("verified");
      applyDiscountCode(
        parsedResponse.data.body.discountCode.codigo,
        parsedResponse.data.body.discountCode.porcentaje
      );
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !enteredDiscount) {
      setEnteredDiscount(true);
      verifyDiscountCode();
    }
  };

  return (
    <section className="flex flex-col w-full pb-4 gap-2">

    {isOpen ? (

      <label
      htmlFor={"discountCode"}
      className="text-zinc-800 text-lg font-medium font-tajawal leading-snug flex justify-between items-center"
      >
      <h4 className="text-neutral-800 text-base font-medium font-tajawal leading-normal">
        Código de descuento
      </h4>

      <div className="flex">
        <input
          className="font-sans font-normal text-sm w-40 focus-visible:outline-arle-blue h-9 px-3 bg-white rounded border border-stone-300"
          name={"discountCode"}
          id={"discountCode"}
          placeholder={""}
          disabled={enteredDiscount ? true : false}
          onChange={handleDiscountCodeChange}
          onKeyDown={handleKeyDown}
          />
        { !enteredDiscount && <div className="px-4 h-9 font-sans font-light text-sm cursor-pointer bg-zinc-200 rounded-tr rounded-br border-r border-t border-b border-stone-300 justify-center items-center gap-1 inline-flex"
        onClick={()=> {setEnteredDiscount(true); verifyDiscountCode()}}>
          Aplicar
        </div>}
        { enteredDiscount && <div className="w-[46px] h-9 bg-zinc-200 rounded-tr rounded-br border-r border-t border-b border-stone-300 justify-center items-center gap-1 inline-flex">
          {isDiscountVerified === "loading" ? (
            <p>...</p>
          ) : isDiscountVerified === "verified" ? ( 
            <FaCheck
            className={"w-3.5 h-3.5 text-green-700"}
            />
          ): isDiscountVerified === "denied" && (
        <IoMdClose className="text-red-400 w-3.5 h-3.5" />
          )
          }
        </div>}
        <div className="flex">
        <IoMdClose className="text-zinc-400 w-3 h-3 ml-3 cursor-pointer" onClick={() => {setIsOpen(false); setEnteredDiscount(false); setInputValue(""); setIsDiscountVerified("loading"); removeDiscountCode()}}/>
      </div>
      </div>
    </label>
          ):(
            <span className="underline hover:cursor-pointer font-sans font-light text-[13px] w-full text-right" onClick={()=> setIsOpen(true)}>
              ¿Tienes un código de Descuento?
            </span>
          )
        }
        { isOpen &&
        <span className="font-inter font-light text-[11px] text-gray-500">
          *Al aplicar un código de descuento, se eliminará cualquier otro descuento que tenga el producto.
        </span>
        }
    <div className="self-stretch h-px bg-stone-300" />
    </section>
  );
};

export default CodigoDeDescuento;