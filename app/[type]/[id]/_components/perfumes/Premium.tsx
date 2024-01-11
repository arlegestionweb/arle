import PremiumLayout from "@/app/_components/premium/PremiumLayout";
import { TPerfumePremium } from "@/sanity/queries/pages/types";
import Cantidad from "../Cantidad";
import AddToCart from "../AddToCart";
import CollapsibleProductSection from "../CollapsibleSection";
import NuestrasComprasIncluyen from "../NuestrasComprasIncluyen";
import SeccionEspecificaciones from "../SeccionEspecificaciones";
import { TPerfumeVariant } from "@/sanity/queries/pages/zodSchemas/perfume";
import { TVariant } from "@/sanity/queries/pages/zodSchemas/general";
import { VariantSelector } from "@/app/listing/_components/ProductCard";

type TPerfumePremiumProps = {
  product: TPerfumePremium;
  selectedVariant: TPerfumeVariant;
  setSelectedVariant: (variant: TVariant) => void;
};

const PerfumePremium = ({
  product,
  selectedVariant,
  setSelectedVariant,
}: TPerfumePremiumProps) => {
  // console.log({product});
  return (
    <PremiumLayout product={product} selectedVariant={selectedVariant}>
      <section className="mt-2">
        <Cantidad />
        <VariantSelector
          product={product}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
        />
      </section>
      <AddToCart className="hidden static shadow-none w-full px-0 gap-6 space-y-2 lg:block" />
      {product.descripcion ? (
        <CollapsibleProductSection classNames="mt-2" title="Descripción">
          <p>{product.descripcion}</p>
        </CollapsibleProductSection>
      ) : (
        <></>
      )}
      <EspecificacionesPerfume product={product} />

      <NuestrasComprasIncluyen />
      <AddToCart className="lg:hidden" />
    </PremiumLayout>
  );
};

export default PerfumePremium;

type TEspecificacionesProps = {
  product: TPerfumePremium;
};

const EspecificacionesPerfume = ({ product }: TEspecificacionesProps) => {
  return (
    <CollapsibleProductSection
      classNames="mt-2"
      title="Especificaciones"
      titleActive
    >
      <div className="grid grid-cols-2 gap-2">
        <SeccionEspecificaciones title="Género" paragraph={product.genero} />
        <SeccionEspecificaciones title="Marca" paragraph={product.marca} />
      </div>
    </CollapsibleProductSection>
  );
};
