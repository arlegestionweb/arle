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

      <section className="flex pt-1 gap-1 sm:gap-1.5 items-center justify-start">
        {discountedPrice ? (
          <>
            <p className={` ${fontSizings[fontSizes.payingPrice]} text-gray-600 text-base xs:text-xl font-medium whitespace-nowrap font-tajawal leading-none xs:leading-none`}>
              ${numberToColombianPriceString(
                discountedPrice
              )}
            </p>
            {discountedPrice && (
              <p className={` ${fontSizings[fontSizes.lineThroughPrice]} text-gray-500 whitespace-nowrap text-xs xs:text-sm sm:text-lg -mt-1 sm:-mt-2 font-medium font-raleway line-through leading-none xs:leading-none sm:leading-none`}>
                ${numberToColombianPriceString(
                  fullPrice
                )}
              </p>
            )}
          </>
        ) : (
          <p className={` ${fontSizings[fontSizes.payingPrice]} text-gray-600 text-xl font-medium whitespace-nowrap font-tajawal leading-none`}>
            ${numberToColombianPriceString(
              fullPrice
            )}
          </p>
        )}
      </section>
      {/* {!dontDisplayPaymentOptions && (
        <section className=" -mt-1">
          <p className="text-zinc-500 text-sm md:text-base md:leading-none font-normal font-tajawal leading-none">
            Págalo a 4 cuotas de $
            {numberToColombianPriceString(
              (discountedPrice ? discountedPrice : fullPrice) / 4
            )}{" "}con{" "}[Wompi].
          </p>
        </section>
      )} */}
    </>
  );
}

export default Precio;