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
  console.log(product.descripcion);
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

        <EspecificacionesReloj product={product} />

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
          product={product}
          quantity={cantidad}
          selectedVariant={selectedVariant}
          className="lg:hidden"
        />
      </PremiumLayout>
    </>
  );
};

export default RelojPremium;

type TEspecificacionesProps = {
  product: TRelojPremium;
};

const EspecificacionesReloj = ({ product }: TEspecificacionesProps) => {
  return (
    <CollapsibleProductSection title="Especificaciones">
      <div className="w-full grid grid-cols-2 gap-2">
        <SeccionEspecificaciones title="Modelo" paragraph={product.modelo} />
        <SeccionEspecificaciones title="Género" paragraph={product.genero} />
        <SeccionEspecificaciones
          title="Material"
          paragraph={product.detallesReloj.material}
        />
        <SeccionEspecificaciones title="Marca" paragraph={product.marca} />
        <SeccionEspecificaciones
          title="Resistencia al Agua"
          paragraph={product.detallesReloj.resistenciaAlAgua}
        />
        <SeccionEspecificaciones
          title="Tipo de Reloj"
          paragraph={product.detallesReloj.tipoDeReloj}
        />
        <SeccionEspecificaciones
          title="Estilo de Reloj"
          paragraph={product.detallesReloj.estiloDeReloj}
        />
        <SeccionEspecificaciones
          title="Tipo de Movimiento"
          paragraph={product.detallesReloj.tipoDeMovimiento}
        />
        <SeccionEspecificaciones
          title="Material del Pulso"
          paragraph={product.detallesReloj.material}
        />
        <SeccionEspecificaciones
          title="Material del Cristal"
          paragraph={product.detallesReloj.caja.cristal}
        />
        <SeccionEspecificaciones
          title="Material de la Caja"
          paragraph={product.detallesReloj.caja.material}
        />
        <SeccionEspecificaciones
          title="Diámetro de la Caja"
          paragraph={product.detallesReloj.caja.diametro.toString() + "mm"}
        />
        {product.detallesReloj.funciones && (
          <SeccionEspecificaciones
            title="Funciones"
            paragraph={product.detallesReloj.funciones
              .map((funcion) => funcion.titulo)
              .join(", ")}
          />
        )}
      </div>
    </CollapsibleProductSection>
  );
};
