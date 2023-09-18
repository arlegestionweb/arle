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

export const revalidate = 10; // revalidate at most every hour
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
  const campoDeBusquedaSeleccionado = searchParams.search as string;

  const colecciones = pageContent.colecciones.filter(
    (coleccion) => !!coleccion.productos
  );

  // const { colecciones } = pageContent;
  const coleccionContent = colecciones.find(
    (coleccion) => coleccion.titulo === coleccionSeleccionada
  );

  const productos = coleccionSeleccionada
    ? coleccionContent?.productos
    : [...pageContent.relojes, ...pageContent.perfumes, ...pageContent.gafas];

  const areFiltersActive =
    !!coleccionSeleccionada || !!tipoDeProductoSeleccionado || !!campoDeBusquedaSeleccionado;

  // console.log({ areFiltersActive, productos });

  // const filteredProducts = productos?.filter((producto) => {

  //   if (tipoDeProductoSeleccionado) {
  //     return producto.type.includes(tipoDeProductoSeleccionado);
  //   }
  //   return true;
  // });

  const filteredProducts = productos?.filter((producto) => {
    let matchesTipoDeProducto = true;
    let matchesCampoDeBusqueda = true;

    if (tipoDeProductoSeleccionado) {
      matchesTipoDeProducto = producto.type.includes(
        tipoDeProductoSeleccionado
      );
    }

    // if (campoDeBusquedaSeleccionado) {
    //   // Assuming the product has a 'name' or 'titulo' field to match against. Adjust as needed.
    //   matchesCampoDeBusqueda = producto.type.toLowerCase().includes(campoDeBusquedaSeleccionado.toLowerCase());
    // }

    if (campoDeBusquedaSeleccionado) {
      matchesCampoDeBusqueda = Object.entries(producto).some(
        ([key, value]) => {
          // If the value is an object and has a 'titulo' property, use that for comparison
          if (typeof value === 'object' && value !== null && 'titulo' in value) {
            const tituloValue = (value as { titulo: string }).titulo;
            return tituloValue.toLowerCase().includes(campoDeBusquedaSeleccionado.toLowerCase());
          }
          // Otherwise, convert non-string values to string for comparison
          const valueStr = String(value).toLowerCase();
          return valueStr.includes(campoDeBusquedaSeleccionado.toLowerCase());
        }
      );
    }

    return matchesTipoDeProducto && matchesCampoDeBusqueda;
  });

  // console.log({searchParams});

  return (
    <main className="md:px-10 px-5 pt-[70px] md:pt-0">
      <Filters
        areFiltersActive={areFiltersActive}
        searchParams={searchParams}
      />
      {!coleccionSeleccionada ? (
        <Colecciones colecciones={colecciones} />
      ) : (
        <h2 className="text-3xl font-bold capitalize">
          Coleccion {coleccionSeleccionada}
        </h2>
      )}

      {filteredProducts && filteredProducts.length > 0 ? <Productos productos={filteredProducts} /> : (

        <h2 className="text-3xl font-bold capitalize">
          No Hay Productos
        </h2>
      )}
    </main>
  );
};

export default Listing;
