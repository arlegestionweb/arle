import { TRelojLujo } from "@/sanity/queries/pages/types";
import HeroProduct from "@/app/_components/lujo/HeroProduct";
import InfoSection from "../InfoSection";

type TRelojLujoProps = {
  product: TRelojLujo;
};

const RelojLujo = ({product}: TRelojLujoProps) => {
  return (
    <>
      <HeroProduct
        product={product}
        images={product.variantes[0].imagenes}
      />

      <section className="bg-slate-900 w-screen flex justify-center">
        <InfoSection
          titulo="Inspiración"
          descripcion={product.inspiracion.contenido?.resena || ""}
          alt={product.inspiracion.contenido?.imagen?.alt}
          url={product.inspiracion.contenido?.imagen?.url}
          className="lg:max-w-[calc(1280px+32px)]"
        />
      </section>

      <section className="bg-color-bg-surface-1-defaul w-screen flex justify-center">
        <InfoSection
          titulo="Detalles"
          descripcion={product.detalles?.contenido?.texto || ""}
          alt={product.detalles?.contenido?.imagen?.alt || ""}
          url={product.detalles?.contenido?.imagen?.url || ""}
          className="text-slate-900 lg:max-w-[calc(1280px+32px)] flex-row-reverse"
        />
      </section>

      <section className="bg-slate-900 w-screen flex justify-center">
        <InfoSection
          titulo="Movimiento"
          descripcion={product.movimiento.contenido?.descripcion || ""}
          subTitulo={product.movimiento.tipoDeMovimiento || ""}
          alt={product.movimiento?.contenido?.imagen?.alt || ""}
          url={product.movimiento?.contenido?.imagen?.url || ""}
          className="lg:max-w-[calc(1280px+32px)]"
        />
      </section>

    </>
  );
};

export default RelojLujo;
