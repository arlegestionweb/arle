import { TGafaPremium } from "@/sanity/queries/pages/types";
import Cantidad from "../Cantidad";
import CollapsibleProductSection from "../CollapsibleSection";
import SeccionEspecificaciones from "../SeccionEspecificaciones";
import NuestrasComprasIncluyen from "../NuestrasComprasIncluyen";
import AddToCart from "../AddToCart";
import PremiumLayout from "@/app/_components/premium/PremiumLayout";
import { TVarianteGafa } from "@/sanity/queries/pages/zodSchemas/gafas";
import { TVariant } from "@/sanity/queries/pages/zodSchemas/general";
import { TPricing } from "../Product";
import { VariantSelector } from "@/app/listing/_components/ProductCard";

type TGafaPremiumProps = {
  product: TGafaPremium;
  selectedVariant: TVarianteGafa;
  setSelectedVariant: (variant: TVariant) => void;
  cantidad: number;
  setCantidad: (cantidad: number) => void;
  pricing: TPricing;
};

const GafaPremium = ({
  product,
  selectedVariant,
  setSelectedVariant,
  cantidad,
  setCantidad,
  pricing,
}: TGafaPremiumProps) => {
  return (
    <>
      <PremiumLayout
        product={product}
        selectedVariant={selectedVariant}
        pricing={pricing}
      >
        <section className="w-full justify-start pt-4 pb-2 flex gap-5 font-tajawal">
          {product.variantes.length > 1 && (
            <VariantSelector
              product={product}
              selectedVariant={selectedVariant}
              setSelectedVariant={setSelectedVariant}
            />
          )}
          <Cantidad
            cantidad={cantidad}
            anadirACantidad={() => setCantidad(cantidad + 1)}
            restarACantidad={() => setCantidad(cantidad - 1)}
            max={selectedVariant.unidadesDisponibles}
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
          <CollapsibleProductSection title="Descripción" collapsed={false}>
            <p className="content-text">{product.descripcion}</p>
          </CollapsibleProductSection>
        ) : (
          <></>
        )}
        <EspecificacionesGafa product={product} selectedVariant={selectedVariant} />
        
        {product.garantia.descripcion ? (
          <CollapsibleProductSection title="Descripción de Garantía">
            <p className="content-text">{product.garantia.descripcion}</p>
          </CollapsibleProductSection>
        ) : (
          <></>
        )}

        <NuestrasComprasIncluyen garantia={product.garantia} />

        <AddToCart
          pricing={pricing}
          className="lg:hidden mt-6"
          product={product}
          quantity={cantidad}
          selectedVariant={selectedVariant}
        />
      </PremiumLayout>
    </>
  );
};

export default GafaPremium;

type TEspecificacionesProps = {
  product: TGafaPremium;
  selectedVariant: TVarianteGafa;
};

const EspecificacionesGafa = ({ product, selectedVariant }: TEspecificacionesProps) => {
  return (
    <CollapsibleProductSection title="Especificaciones">
      <div className="w-full grid grid-cols-2 gap-2">
        <SeccionEspecificaciones title="Modelo" paragraph={product.modelo} />
        <SeccionEspecificaciones title="Género" paragraph={product.genero} />
        <SeccionEspecificaciones
          title="Forma de Montura"
          paragraph={product.detalles.montura.formaDeLaMontura}
        />
        <SeccionEspecificaciones
          title="Material de la Montura"
          paragraph={product.detalles.montura.materialMontura}
        />
        <SeccionEspecificaciones
          title="Material de la Varilla"
          paragraph={product.detalles.montura.materialVarilla}
        />
        <SeccionEspecificaciones
          title="Material del Lente"
          paragraph={product.detalles.lente.material}
        />
        <SeccionEspecificaciones
          title="Tipo de Lente"
          paragraph={product.detalles.lente.tipo}
        />
        <SeccionEspecificaciones title="Color del Lente" paragraph={selectedVariant.colorDelLente.nombre} />
        <SeccionEspecificaciones title="Color de la Montura" paragraph={selectedVariant.colorDeLaMontura.nombre} />
        <SeccionEspecificaciones title="Color de la Varilla" paragraph={selectedVariant.colorDeLaVarilla.nombre} />
        <SeccionEspecificaciones
          title="Tipo de gafas"
          paragraph={product.detalles.tipoDeGafa}
        />
        <SeccionEspecificaciones
          title="Estilo"
          paragraph={product.detalles.estiloDeGafa}
        />
      </div>
    </CollapsibleProductSection>
  );
};
