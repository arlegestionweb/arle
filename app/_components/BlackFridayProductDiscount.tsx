"use client"

import { useEffect, useState } from "react";

const BlackFridayProductDiscount = ({discountPercent}: {discountPercent: number}) => {

  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    // Fecha fija: 30 de noviembre a la medianoche
    const discountEndTime = new Date('2024-11-30T00:00:00').getTime();

    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const timeLeft = discountEndTime - now;

      if (timeLeft < 0) {
        clearInterval(intervalId);
        setTimeRemaining('Discount has ended');
      } else {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        setTimeRemaining(`${days}días ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <article className="bg-black text-white px-3 py-2 flex flex-col items-center font-tajawal">
      <h5 className="font-bold text-sm xs:text-base text-center text-gray-200 whitespace-nowrap">¡BLACK DAYS!</h5>
      <span className="whitespace-nowrap font-bold text-lg xs:text-xl sm:text-2xl">{discountPercent}% OFF</span>
      <p>{timeRemaining}</p>
      <p>TIEMPO LIMITADO.</p>
    </article>
  )
}

export default BlackFridayProductDiscount