import PremiumLayout from "@/app/_components/premium/PremiumLayout";
import { TRelojPremium } from "@/sanity/queries/pages/types";
import Cantidad from "../Cantidad";
import AddToCart from "../AddToCart";
import CollapsibleProductSection from "../CollapsibleSection";
import NuestrasComprasIncluyen from "../NuestrasComprasIncluyen";
import SeccionEspecificaciones from "../SeccionEspecificaciones";
import { TRelojVariant } from "@/sanity/queries/pages/zodSchemas/reloj";
import { VariantSelector } from "@/app/listing/_components/ProductCard";
import { TVariant } from "@/sanity/queries/pages/zodSchemas/general";
import { TPricing } from "../Product";
import { ProductCardSlide } from "../ProductCardSlide";

type TRelojPremiumProps = {
  product: TRelojPremium;
  selectedVariant: TRelojVariant;
  setSelectedVariant: (variant: TVariant) => void;
  cantidad: number;
  setCantidad: (cantidad: number) => void;
  pricing: TPricing;
};

const RelojPremium = ({
  product,
  selectedVariant,
  setSelectedVariant,
  cantidad,
  setCantidad,
  pricing,
}: TRelojPremiumProps) => {
  return (
    <>
      <PremiumLayout
        product={product}
        selectedVariant={selectedVariant}
        pricing={pricing}>
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

        <EspecificacionesReloj product={product} />

        <NuestrasComprasIncluyen garantia={product.garantia} />
        <AddToCart
          pricing={pricing}
          product={product}
          quantity={cantidad}
          selectedVariant={selectedVariant}
          className="lg:hidden"
        />
      </PremiumLayout>
      <section className="flex flex-col gap-6">
        <ProductCardSlide nameSection="Vistos recientemente" />
        <ProductCardSlide nameSection="Otras personas también vieron" />
      </section>
    </>
  );
};

export default RelojPremium;

type TEspecificacionesProps = {
  product: TRelojPremium;
};

const EspecificacionesReloj = ({ product }: TEspecificacionesProps) => {
  return (
    <CollapsibleProductSection
      classNames="mt-2"
      title="Especificaciones"
      titleActive>
      <div className="grid grid-cols-2 gap-2">
        <SeccionEspecificaciones
          title="Modelo"
          paragraph={product.modelo}
        />
        <SeccionEspecificaciones
          title="Género"
          paragraph={product.genero}
        />
        <SeccionEspecificaciones
          title="Material"
          paragraph={product.detallesReloj.material}
        />
        <SeccionEspecificaciones
          title="Marca"
          paragraph={product.marca}
        />
        <SeccionEspecificaciones
          title="Resistencia al Agua"
          paragraph={product.detallesReloj.resistenciaAlAgua}
        />
      </div>
    </CollapsibleProductSection>
  );
};
