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
  pricing,
}: TPerfumePremiumProps) => {
  // console.log({product});
  return (
    <>
      <PremiumLayout
        product={product}
        selectedVariant={selectedVariant}
        pricing={pricing}
      >
        <section className="w-full pt-4 pb-2 flex gap-5 justify-start font-tajawal">
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

        {product.detalles.resenaCorta ? (
          <CollapsibleProductSection title="Reseña" >
            <p className="content-text">{product.detalles.resenaCorta}</p>
          </CollapsibleProductSection>
        ) : (
          <></>
        )}

        <CollapsibleProductSection title="Especificaciones">
          <div className="w-full grid grid-cols-2 gap-2">
            <SeccionEspecificaciones
              title="Género"
              paragraph={product.genero}
            />
            <SeccionEspecificaciones title="Marca" paragraph={product.marca} />
            <SeccionEspecificaciones
              title="Concentracion"
              paragraph={product.detalles.concentracion}
            />
            <SeccionEspecificaciones
              title="Tamaño"
              paragraph={selectedVariant.tamano.toString()+"ml"}
            />
            <SeccionEspecificaciones
              title="Registro Invima"
              paragraph={selectedVariant.registroInvima}
            />
          </div>
        </CollapsibleProductSection>

        <CollapsibleProductSection title="Notas Olfativas">
          <div className="w-full grid grid-cols-2 gap-2">
            <SeccionEspecificaciones
              title="Familia Olfativa"
              paragraph={product.detalles.notasOlfativas.familiaOlfativa}
            />
            {product.detalles.notasOlfativas.notasDeBase && (
              <SeccionEspecificaciones
                title="Notas de Base"
                paragraph={product.detalles.notasOlfativas.notasDeBase.join(
                  ", "
                )}
              />
            )}
            {product.detalles.notasOlfativas.notasDeCorazon && (
              <SeccionEspecificaciones
                title="Notas de Corazon"
                paragraph={product.detalles.notasOlfativas.notasDeCorazon.join(
                  ", "
                )}
              />
            )}
            {product.detalles.notasOlfativas.notasDeSalida && (
              <SeccionEspecificaciones
                title="Notas de Salida"
                paragraph={product.detalles.notasOlfativas.notasDeSalida.join(
                  ", "
                )}
              />
            )}
          </div>
        </CollapsibleProductSection>
        
        <NuestrasComprasIncluyen />

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

export default PerfumePremium;
