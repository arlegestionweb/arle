"use client"

import React, { useEffect, useState } from 'react'

const BFCounterBanner = () => {

  const [timeRemaining, setTimeRemaining] = useState('');

  const discountEndTime = new Date('2024-12-03T05:00:00').getTime();

  useEffect(() => {
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

        setTimeRemaining(`Quedan ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className='w-full py-2 bg-black text-white flex justify-center font-inter text-sm font-light'>
      <p>{timeRemaining}</p>
    </section>
  )
}

export default BFCounterBanner