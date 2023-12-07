import { TGafaPremium } from "@/sanity/queries/pages/types";
import Image from "next/image";
import Cantidad from "../Cantidad";
import {
  colombianPriceStringToNumber,
  numberToColombianPriceString,
} from "@/utils/helpers";
import CollapsibleProductSection from "../CollapsibleSection";
import SeccionEspecificaciones from "../SeccionEspecificaciones";
import NuestrasComprasIncluyen from "../NuestrasComprasIncluyen";
import MobileAddToCart from "../MobileAddToCart";
import ProductSlide from '../../../../_components/ProductSlide';
import Labels, { LabelTypes } from "@/app/_components/Labels";
import ProductViewer from "@/app/_components/gafas/ProductView";

type TGafaPremiumProps = {
  product: TGafaPremium;
};

const GafaPremium = ({ product }: TGafaPremiumProps) => {
  console.log(product.variantes[0].imagenes);
  
  return (
    <section className="lg:grid lg:grid-cols-12 gap-8 row-auto w-full md:px-8 lg:max-w-[calc(1280px+32px)]">
      <ProductViewer product={product} className="col-start-8 col-span-1"/>

      <section className="col-span-6 col-start-1 row-start-1 flex flex-col px-5 lg:px-0 w-full relative">  
        <Labels 
          className="relative max-w-fit mt-4 mb-2"
          labelType={product.variantes[0].etiqueta as LabelTypes}
          label={product.variantes[0].etiqueta as LabelTypes}/>
        <header>

          <h1 className="text-zinc-800 text-[32px] font-normal font-kanit leading-10 w-full">
            {product.marca} {product.modelo}
          </h1>
          <span className="text-zinc-500 text-sm font-normal font-tajawal leading-[16.80px]">CODE: {product.variantes[0].codigoDeReferencia}</span>
          <p className="text-zinc-800 text-[32px] font-normal font-kanit leading-9">
            ${product.variantes[0].precio}
          </p>
          <div className="text-justify">
            <span className="text-zinc-500 text-sm font-normal font-tajawal leading-[16.80px]">
              Págalo a 4 cuotas de $
              {numberToColombianPriceString(
                colombianPriceStringToNumber(product.variantes[0].precio) / 4
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
          </div>{" "}
        </header>
        <section className="mt-2">
          <Cantidad />
        </section>
        <MobileAddToCart className="hidden static shadow-none w-full px-0 gap-6 space-y-2 lg:block"/>
        <CollapsibleProductSection classNames="mt-2" title="Descripción">
          <p>{product.descripcion}</p>
        </CollapsibleProductSection>
        <EspecificacionesGafa product={product} />

        <NuestrasComprasIncluyen garantia={product.garantia} />
        <MobileAddToCart className="lg:hidden"/>
      </section>
    </section>
  );
};

export default GafaPremium;

type TEspecificacionesProps = {
  product: TGafaPremium;
};

const EspecificacionesGafa = ({ product }: TEspecificacionesProps) => {
  return (
    <CollapsibleProductSection
      classNames="mt-2"
      title="Especificaciones"
      titleActive
    >
      <div className="grid grid-cols-2 gap-2">
        <SeccionEspecificaciones title="Modelo" paragraph={product.modelo} />
        <SeccionEspecificaciones title="Género" paragraph={product.genero} />
        <SeccionEspecificaciones
          title="Forma de Montura"
          paragraph={product.detalles.montura.formaDeLaMontura}
        />
        <SeccionEspecificaciones title="Marca" paragraph={product.marca} />
        <SeccionEspecificaciones
          title="Tipo"
          paragraph={product.detalles.tipoDeGafa}
        />
      </div>
    </CollapsibleProductSection>
  );
};
