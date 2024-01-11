import { TGafaPremium } from "@/sanity/queries/pages/types";
import Cantidad from "../Cantidad";
import CollapsibleProductSection from "../CollapsibleSection";
import SeccionEspecificaciones from "../SeccionEspecificaciones";
import NuestrasComprasIncluyen from "../NuestrasComprasIncluyen";
import AddToCart from "../AddToCart";
import PremiumLayout from "@/app/_components/premium/PremiumLayout";
import { TVarianteGafa } from "@/sanity/queries/pages/zodSchemas/gafas";
import { TVariant } from "@/sanity/queries/pages/zodSchemas/general";
import { VariantSelector } from "@/app/listing/_components/ProductCard";

type TGafaPremiumProps = {
  product: TGafaPremium;
  selectedVariant: TVarianteGafa;
  setSelectedVariant: (variant: TVariant) => void;
};

const GafaPremium = ({ product, selectedVariant, setSelectedVariant }: TGafaPremiumProps) => {
  return (
    <PremiumLayout product={product} selectedVariant={selectedVariant}>
      <section className="my-2 flex flex-col gap-5">
        <VariantSelector
          product={product}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
        />
        <Cantidad />
      </section>
      <AddToCart product={product} quantity={1} selectedVariant={selectedVariant} className="hidden static shadow-none w-full px-0 gap-6 space-y-2 lg:block" />

      {product.descripcion ? (
        <CollapsibleProductSection classNames="mt-2" title="Descripción">
          <p>{product.descripcion}</p>
        </CollapsibleProductSection>
      ) : (
        <></>
      )}

      <EspecificacionesGafa product={product} />

      <NuestrasComprasIncluyen garantia={product.garantia} />
      <AddToCart className="lg:hidden" product={product} quantity={1} selectedVariant={selectedVariant} />
    </PremiumLayout>
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
