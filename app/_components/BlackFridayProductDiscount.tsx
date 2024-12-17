"use client"

import { useEffect, useState } from "react";

const BlackFridayProductDiscount = ({discountPercent}: {discountPercent: number | null}) => {

  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    // Fecha fija: 30 de noviembre a la medianoche
    const discountEndTime = new Date('2024-11-30T05:00:00').getTime();

    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const timeLeft = discountEndTime - now;

      if (timeLeft < 0) {
        clearInterval(intervalId);
        setTimeRemaining('Discount has ended');
      } else {
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <article className="text-white bg-[#AE3434] rounded-md px-6 pt-2 pb-1 leading-none flex flex-col items-center font-tajawal w-fit">
      {discountPercent && ( 
        <>
        <h5 className="font-bold text-sm xs:text-base text-center text-gray-200 whitespace-nowrap">¡Descuento Navideño!</h5>
        <span className="whitespace-nowrap font-bold text-lg xs:text-xl sm:text-2xl">{discountPercent}% OFF</span>
        </>
      )}
      <h5 className="font-bold text-sm xs:text-base text-center text-gray-200 whitespace-nowrap">¡Recibe tus compras en menos de 48 horas!</h5>
      <h5 className="font-bold text-sm xs:text-lg text-center text-gray-200 whitespace-nowrap">Si estás en Cali te llega HOY.</h5>
      {/* <p>{timeRemaining}</p> */}
      {/* <p>ÚLTIMA OPORTUNIDAD.</p> */}
    </article>
  )
}

export default BlackFridayProductDiscount