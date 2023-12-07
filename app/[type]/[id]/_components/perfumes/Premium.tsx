import PremiumLayout from "@/app/_components/premium/PremiumLayout";
import { TPerfumePremium } from "@/sanity/queries/pages/types";
import Cantidad from "../Cantidad";
import MobileAddToCart from "../MobileAddToCart";
import CollapsibleProductSection from "../CollapsibleSection";
import NuestrasComprasIncluyen from "../NuestrasComprasIncluyen";
import SeccionEspecificaciones from "../SeccionEspecificaciones";

type TPerfumePremiumProps = {
  product: TPerfumePremium;
};

const PerfumePremium = ({ product }: TPerfumePremiumProps) => {
  // console.log({product});

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
      <EspecificacionesPerfume product={product} />

      <NuestrasComprasIncluyen />
      <MobileAddToCart className="lg:hidden" />
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
      titleActive>
      <div className="grid grid-cols-2 gap-2">
        <SeccionEspecificaciones
          title="Género"
          paragraph={product.detalles.genero}
        />
        <SeccionEspecificaciones
          title="Marca"
          paragraph={product.marca}
        />
      </div>
    </CollapsibleProductSection>
  );
};
