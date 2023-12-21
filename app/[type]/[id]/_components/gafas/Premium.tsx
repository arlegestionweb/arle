import { TGafaPremium } from "@/sanity/queries/pages/types";
import Cantidad from "../Cantidad";
import CollapsibleProductSection from "../CollapsibleSection";
import SeccionEspecificaciones from "../SeccionEspecificaciones";
import NuestrasComprasIncluyen from "../NuestrasComprasIncluyen";
import MobileAddToCart from "../MobileAddToCart";
import PremiumLayout from "@/app/_components/premium/PremiumLayout";

type TGafaPremiumProps = {
  product: TGafaPremium;
};

const GafaPremium = ({ product }: TGafaPremiumProps) => {
  
  return (
    <PremiumLayout product={product}>
      <section className="mt-2">
        <Cantidad />
      </section>
      <MobileAddToCart className="hidden static shadow-none w-full px-0 gap-6 space-y-2 lg:block" />

      {product.descripcion ? (
        <CollapsibleProductSection
          classNames="mt-2"
          title="Descripción">
          <p>{product.descripcion}</p>
        </CollapsibleProductSection>
      ) : (<></>)}
      
      <EspecificacionesGafa product={product} />

      <NuestrasComprasIncluyen garantia={product.garantia} />
      <MobileAddToCart className="lg:hidden" />
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
          title="Forma de Montura"
          paragraph={product.detalles.montura.formaDeLaMontura}
        />
        <SeccionEspecificaciones
          title="Marca"
          paragraph={product.marca}
        />
        <SeccionEspecificaciones
          title="Tipo"
          paragraph={product.detalles.tipoDeGafa}
        />
      </div>
    </CollapsibleProductSection>
  );
};
