import { getListingInitialLoadContent } from "@/sanity/queries/pages/listingQueries";
import {
  BannerType,
  ColeccionType,
  PerfumeLujoType,
  PerfumePremiumType,
  RelojType,
} from "../_components/types";
import Colecciones from "../_components/Colecciones";
import Productos from "../_components/listingsPage/Productos";
import Filters from "../_components/listingsPage/Filters";

type PageContentType = {
  listingContent: {
    banners: BannerType[];
  };
  perfumes: (PerfumeLujoType | PerfumePremiumType)[];
  relojes: RelojType[];
  colecciones: ColeccionType[];
  gafas: any;
};

export const revalidate = 10 // revalidate at most every hour
const Listing = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const pageContent = (await getListingInitialLoadContent()) as PageContentType;
  const coleccionSeleccionada = searchParams.coleccion;
  const tipoDeProductoSeleccionado = searchParams.producto;
  const colecciones = pageContent.colecciones.filter(coleccion => !!coleccion.productos)


  // const { colecciones } = pageContent;
  const coleccionContent = colecciones.find(
    (coleccion) => coleccion.titulo === coleccionSeleccionada
  );


  const productos = coleccionSeleccionada
    ? coleccionContent?.productos
    : [...pageContent.relojes, ...pageContent.perfumes, ...pageContent.gafas];

    
    
    const areFiltersActive = !!coleccionSeleccionada || !!tipoDeProductoSeleccionado;
    
    console.log({ areFiltersActive, productos });

    const filteredProducts = productos?.filter(producto => {
      if (tipoDeProductoSeleccionado) {
        return producto.type.includes(tipoDeProductoSeleccionado)
      }
      return true
    })

  return (
    <main className="md:px-10 px-5 pt-[70px] md:pt-0">
      <Filters areFiltersActive={areFiltersActive} />
      <Colecciones colecciones={colecciones} />
      {/* <div>{coleccionSeleccionada && <h3>{coleccionSeleccionada}</h3>}</div> */}
      {productos && <Productos productos={filteredProducts} />}
    </main>
  );
};

export default Listing;
