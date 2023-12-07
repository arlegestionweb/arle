import PremiumLayout from "@/app/_components/premium/PremiumLayout";
import { TRelojPremium } from "@/sanity/queries/pages/types";
import Cantidad from "../Cantidad";
import MobileAddToCart from "../MobileAddToCart";
import CollapsibleProductSection from "../CollapsibleSection";
import NuestrasComprasIncluyen from "../NuestrasComprasIncluyen";
import SeccionEspecificaciones from "../SeccionEspecificaciones";

type TRelojPremiumProps = {
  product: TRelojPremium;
};

const RelojPremium = ({ product }: TRelojPremiumProps) => {
  console.log(product.descripcion);

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
      
      <EspecificacionesReloj product={product} />

      <NuestrasComprasIncluyen garantia={product.garantia} />
      <MobileAddToCart className="lg:hidden" />
    </PremiumLayout>
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
          paragraph={product.detallesReloj.genero}
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
