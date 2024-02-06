import PremiumLayout from "@/app/_components/premium/PremiumLayout";
import { TPerfumePremium } from "@/sanity/queries/pages/types";
import Cantidad from "../Cantidad";
import AddToCart from "../AddToCart";
import CollapsibleProductSection from "../CollapsibleSection";
import NuestrasComprasIncluyen from "../NuestrasComprasIncluyen";
import SeccionEspecificaciones from "../SeccionEspecificaciones";
import { TPerfumeVariant } from "@/sanity/queries/pages/zodSchemas/perfume";
import { TVariant } from "@/sanity/queries/pages/zodSchemas/general";
import { TPricing } from "../Product";
import { VariantSelector } from "@/app/listing/_components/ProductCard";

type TPerfumePremiumProps = {
  product: TPerfumePremium;
  selectedVariant: TPerfumeVariant;
  setSelectedVariant: (variant: TVariant) => void;
  cantidad: number;
  setCantidad: (cantidad: number) => void;
  pricing: TPricing;
};

const PerfumePremium = ({
  product,
  selectedVariant,
  setSelectedVariant,
  cantidad,
  setCantidad,
  pricing
}: TPerfumePremiumProps) => {
  // console.log({product});
  return (
    <>
      <PremiumLayout
        product={product}
        selectedVariant={selectedVariant} pricing={pricing}>
        <section className="mt-2">
          <Cantidad
            cantidad={cantidad}
            anadirACantidad={() => setCantidad(cantidad + 1)}
            restarACantidad={() => setCantidad(cantidad - 1)}
          />
          <VariantSelector
            product={product}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
          />
        </section>
        <AddToCart
          pricing={pricing}
          product={product}
          quantity={cantidad}
          selectedVariant={selectedVariant}
          className="hidden static shadow-none w-full px-0 gap-6 space-y-2 lg:block"
        />
        {product.descripcion ? (
          <CollapsibleProductSection
            classNames="mt-2"
            title="Descripción">
            <p>{product.descripcion}</p>
          </CollapsibleProductSection>
        ) : (
          <></>
        )}
        <EspecificacionesPerfume product={product} />

        <NuestrasComprasIncluyen />
        <AddToCart
          pricing={pricing}
          className="lg:hidden"
          product={product}
          quantity={cantidad}
          selectedVariant={selectedVariant}
        />
      </PremiumLayout>

    </>
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
      titleActive>
      <div className="grid grid-cols-2 gap-2">
        <SeccionEspecificaciones
          title="Género"
          paragraph={product.genero}
        />
        <SeccionEspecificaciones
          title="Marca"
          paragraph={product.marca}
        />
      </div>
    </CollapsibleProductSection>
  );
};
