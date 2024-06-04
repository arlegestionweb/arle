// import { numberToColombianPriceString } from "@/utils/helpers";
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlinePayments } from "react-icons/md";
import { useState, useEffect } from 'react';


const WompiPayButton = ({ amount, disabled, redirectUrl, reference, currency = "COP" }: {
  disabled: boolean;
  amount: number;
  reference: string;
  redirectUrl: string;
  currency?: string;
}) => {
  const amountInCents = amount * 100
  const publicKey = process.env.NEXT_PUBLIC_WOMPI;

  const concatenatedIntegrity = `${reference}${amountInCents}${currency}${process.env.NEXT_PUBLIC_WOMPI_INTEGRITY}`


  const [hashIntegrity, setHashIntegrity] = useState<string | undefined>();

  useEffect(() => {
    const calculateHashIntegrity = async () => {
      const encondedText = new TextEncoder().encode(concatenatedIntegrity);
      const hashBuffer = await crypto.subtle.digest("SHA-256", encondedText);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      setHashIntegrity(hashHex);
    }

    calculateHashIntegrity();
  }, [concatenatedIntegrity]);


  return (
    <form className="w-full max-w-sm" action={"https://checkout.wompi.co/p/"} method="Get">
      <input type="hidden" name="public-key" value={publicKey} />
      <input type="hidden" name="currency" value={currency} />
      <input type="hidden" name="amount-in-cents" value={amountInCents} />
      <input type="hidden" name="reference" value={reference} />
      <input type="hidden" name="redirect-url" value={redirectUrl} />
      <input type="hidden" name="signature:integrity" value={hashIntegrity} />

      <button type="submit" disabled={disabled} className="dark-button flex gap-2 justify-center items-center">
        <MdOutlinePayments className="text-base" /> Paga con Wompi <FaArrowRight className="text-base" />
      </button>
    </form>
  );
}

export default WompiPayButton;