import { TTimedDiscount, TVariant } from "@/sanity/queries/pages/zodSchemas/general";
import { colombianPriceStringToNumber, numberToColombianPriceString } from "@/utils/helpers";

const Precio = ({ discountedPrice, fullPrice, dontDisplayPaymentOptions = false }: {
  fullPrice: number;
  discountedPrice?: number;
  dontDisplayPaymentOptions?: boolean;
}) => {
  return (
    <>

      <section className="flex gap-4 items-center">
        {discountedPrice ? (
          <>
            <p className="text-zinc-800 text-[32px] font-normal font-kanit leading-9">
              $ {numberToColombianPriceString(
                discountedPrice
              )}
            </p>
            {discountedPrice && (
              <p className="text-neutral-600 text-base font-medium font-raleway line-through leading-tight">
                $ {numberToColombianPriceString(
                  fullPrice
                )}
              </p>
            )}
          </>
        ) : (
          <p className="text-zinc-800 text-[32px] font-normal font-kanit leading-9">
            $ {numberToColombianPriceString(
              fullPrice
            )}
          </p>
        )}
      </section>
      {!dontDisplayPaymentOptions && (
        <div className="text-justify">
          <span className="text-zinc-500 text-sm font-normal font-tajawal leading-[16.80px]">
            Págalo a 4 cuotas de $
            {numberToColombianPriceString(
              (discountedPrice ? discountedPrice : fullPrice) / 4
            )}{" "}
            sin intereses.
            <br />
            [provider]
          </span>
          <span className="text-neutral-600 text-sm font-normal font-tajawal leading-[16.80px]">
            .{" "}
          </span>
          <span className="text-zinc-800 text-sm font-normal font-tajawal leading-[16.80px]">
            Learn More
          </span>
        </div>
      )}
    </>
  );
}

export default Precio;