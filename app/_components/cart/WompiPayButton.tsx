import { numberToColombianPriceString } from "@/utils/helpers";
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlinePayments } from "react-icons/md";

const WompiPayButton = ({amount, disabled, redirectUrl, reference, currency = "COP"}: {
  disabled: boolean;
  amount: number;
  reference: string;
  redirectUrl: string;
  currency?: string;
}) => {
  const publicKey = process.env.NEXT_PUBLIC_WOMPI;

  return (
    <form className="w-full max-w-sm" action={"https://checkout.wompi.co/p/"} method="Get">
      <input type="hidden" name="public-key" value={publicKey} />
      <input type="hidden" name="currency" value={currency} />
      <input type="hidden" name="amount-in-cents" value={amount * 100} />
      <input type="hidden" name="reference" value={reference} />
      <input type="hidden" name="redirect-url" value={redirectUrl} />
      <input type="hidden" name="signature:integrity" value={process.env.NEXT_PUBLIC_WOMPI_INTEGRITY} />

      <button type="submit" disabled={disabled} className="dark-button flex gap-2 justify-center items-center">
      <MdOutlinePayments className="text-base" /> Paga con Wompi <FaArrowRight className="text-base" />
      </button>
    </form>
  );
}

export default WompiPayButton;