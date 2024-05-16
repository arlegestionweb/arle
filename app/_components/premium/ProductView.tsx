import {
  TGafaPremium,
  TPerfumePremium,
  TRelojPremium,
} from "@/sanity/queries/pages/types";
import ProductSlide from "../ProductSlide";
import { cn } from "@/app/_lib/utils";
import { TVariant } from "@/sanity/queries/pages/zodSchemas/general";
import { TRelojVariant } from "@/sanity/queries/pages/zodSchemas/reloj";
import { TVarianteGafa } from "@/sanity/queries/pages/zodSchemas/gafas";
import { TPerfumeVariant } from "@/sanity/queries/pages/zodSchemas/perfume";
import GalleryProduct from "../lujo/GalleryProduct";

type ProductViewerProps = {
  product: TGafaPremium | TRelojPremium | TPerfumePremium;
  className?: string;
  selectedVariant: TVariant;
};

const ProductViewer = ({ product, className, selectedVariant }: ProductViewerProps) => {
  const imagenes = (selectedVariant as TRelojVariant | TVarianteGafa | TPerfumeVariant ).imagenes;

  return (
    <section className="flex lg:h-full relative">
      <ProductSlide
        slug={product.slug}
        imagesProduct={imagenes}
        className={cn("max-h-[377px] lg:hidden w-full", className)}
        isLink={false}
      />
      {/* <ProductGrid
        imagenes={imagenes}
        className="hidden lg:flex basis-full max-h-[650px] sticky top-20 z-[200]"
      /> */}
      <GalleryProduct
        className="hidden lg:flex basis-full max-h-[650px] sticky top-20 z-[200] lg:mt-0"
        imagesProduct={imagenes}
        orientation={"horizontal"}
      />
    </section>
  );
};

// const ProductGrid = ({
//   imagenes,
//   className,
// }: {
//   imagenes: TImages;
//   className?: string;
// }) => {
  
//   const [isImageOpen, setImageOpen] = useState(false);
//   const [index, setIndex] = useState(0);
  
//   const splitArrayIntoEvenOdd = (array: typeof imagenes): [typeof imagenes, typeof imagenes] => {
//     const evenItems: typeof imagenes = [];
//     const oddItems: typeof imagenes = [];
    
//     array.forEach((item, index) => {
//       if (index % 2 === 0) {
//         evenItems.push(item);
//       } else {
//         oddItems.push(item);
//       }
//     });
    
//     return [evenItems, oddItems];
//   };
  
//   const [evenImages, oddImages] = splitArrayIntoEvenOdd(imagenes);

//   return (
//     <section className={cn("relative ", className)}>
//       <div className={"flex overflow-y-scroll no-scrollbar overflow-hidden w-full gap-2"}>
//         <section className="basis-full flex flex-col gap-2">
//           <ImageModal closeImage={()=>setImageOpen(false)} images={imagenes}  index={index} isImageOpen={isImageOpen} />
//         {evenImages.map((image, i) => (
//           <div
//           onClick={()=>{
//             setIndex(i*2)
//             setImageOpen(true);
//           }}
//           key={`${image.url}-${i}`}
//           className="relative">
//             <ImageWrapper
//               src={image.url}
//               alt={image.alt || ""}
//               height={900}
//               width={900}
//               className={`object-contain w-full object-center cursor-zoom-in`}
//               />
//           </div>
//         ))}
//         </section>
//         <section className="basis-full flex flex-col gap-2">
//         {oddImages.map((image, i) => (
//           <div
//           onClick={()=>{
//             setIndex(i*2+1)
//             setImageOpen(true);
//           }}
//           key={`${image.url}-${i}`}
//           className="relative">
//             <ImageWrapper
//               src={image.url}
//               alt={image.alt || ""}
//               height={900}
//               width={900}
//               className={`object-contain w-full object-center cursor-zoom-in`}
//               />
//           </div>
//         ))}
//         </section>
//         {imagenes.length > 4 && (
//           <div className="absolute bottom-0 h-20 w-full z-10"></div>
//         )}
//       </div>
//     </section>
//   );
// };

export default ProductViewer;
