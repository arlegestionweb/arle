import { numberToColombianPriceString } from "@/utils/helpers";



const fontSizings = {
  lg: "text-[2rem]",
  md: "text-[1.5rem]",
  sm: "text-[1rem]",
}

type TPrecioProps = {
  fullPrice: number;
  discountedPrice?: number;
  dontDisplayPaymentOptions?: boolean;
  fontSizes?: {
    payingPrice: "lg" | "md" | "sm";
    lineThroughPrice: "lg" | "md" | "sm";
  };
};
const Precio = ({
  discountedPrice,
  fullPrice,
  dontDisplayPaymentOptions = false,
  fontSizes = {
    lineThroughPrice: "md",
    payingPrice: "lg"
  }
}: TPrecioProps) => {
  return (
    <>

      <section className="flex gap-4 items-center flex-wrap">
        {discountedPrice ? (
          <>
            <p className={`text-zinc-800 ${fontSizings[fontSizes.payingPrice]} whitespace-nowrap font-normal font-kanit leading-9`}>
              $ {numberToColombianPriceString(
                discountedPrice
              )}
            </p>
            {discountedPrice && (
              <p className={`text-neutral-600 ${fontSizings[fontSizes.lineThroughPrice]} whitespace-nowrap font-medium font-raleway line-through leading-tight`}>
                $ {numberToColombianPriceString(
                  fullPrice
                )}
              </p>
            )}
          </>
        ) : (
          <p className={`text-zinc-800 ${fontSizings[fontSizes.payingPrice]} whitespace-nowrap font-normal font-kanit leading-9`}>
            $ {numberToColombianPriceString(
              fullPrice
            )}
          </p>
        )}
      </section>
      {!dontDisplayPaymentOptions && (
        <section className="text-justify">
          <p className="text-zinc-500 text-sm font-normal font-tajawal leading-[16.80px]">
            Págalo a 4 cuotas de $
            {numberToColombianPriceString(
              (discountedPrice ? discountedPrice : fullPrice) / 4
            )}{" "}
            sin intereses.
            <br />
            [provider]
          </p>
          <p className="text-neutral-600 text-sm font-normal font-tajawal leading-[16.80px]">
            .{" "}
          </p>
          <p className="text-zinc-800 text-sm font-normal font-tajawal leading-[16.80px]">
            Learn More
          </p>
        </section>
      )}
    </>
  );
}

export default Precio;