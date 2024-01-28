import { TTimedDiscount } from "@/sanity/queries/pages/zodSchemas/general";
"use client";
import { useEffect, useState } from "react";

const TimedDiscount = ({ discount }: {
  discount: TTimedDiscount;
}) => {

  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const discountEndTime = new Date(discount.duracion.fin).getTime();
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const timeLeft = discountEndTime - now;
      if (timeLeft < 0) {
        clearInterval(intervalId);
        setTimeRemaining('Discount has ended');
      } else {
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [discount]);
  return (
    <section className="w-full h-[84px] bg-slate-900 text-white flex items-center justify-center flex-col">
      <p className="text-center text-white text-lg font-semibold font-inter leading-7">{discount.texto}</p>
      <p className="text-center text-white text-lg font-semibold font-inter leading-7">
        {timeRemaining}
      </p>
    </section>
  );
}

export default TimedDiscount;