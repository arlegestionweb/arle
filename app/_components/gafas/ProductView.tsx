import { TGafaPremium } from "@/sanity/queries/pages/types";
import ProductSlide from "../ProductSlide";
import { cn } from "@/app/_lib/utils";

type ProductViewerProps = {
  product: TGafaPremium;
  className?: string;
};

const ProductViewer = ({ product, className }: ProductViewerProps) => {
  return (
    <>
      <div className=""></div>
      <ProductSlide
        slug={product.slug}
        imagesProduct={product.variantes[0].imagenes}
        className={cn("max-h-[377px] lg:hidden", className)}
      />
      <ProductGrid product={product} className="hidden lg:block"/>
    </>
  );
};

const ProductGrid = ({ product, className }: ProductViewerProps) => {
  return (
    <section className={cn("", className)}>
      <>Hola</>
    </section>
  );
};

export default ProductViewer;
