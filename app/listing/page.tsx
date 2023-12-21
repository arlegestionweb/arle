import {
  TProduct,
  getListingInitialLoadContent,
} from "@/sanity/queries/pages/listingQueries";
import Productos from "./_components/Productos";
import Colecciones from "../_components/Colecciones";
// import Banner from "../_components/homepage/Banner";
import Filters from "./_components/Filters/index";
import { getAllMarcas } from "../_lib/utils";

// export const revalidate = 10; // revalidate at most every hour

export const dynamic = "force-dynamic";

const Listing = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const pageContent = await getListingInitialLoadContent();
  const lineaSeleccionada = searchParams.linea as string;
  const coleccionSeleccionada = searchParams.coleccion as string;
  const tipoDeProductoSeleccionado = searchParams.type as string;
  const campoDeBusquedaSeleccionado = searchParams.search as string;

  const colecciones = pageContent?.colecciones.filter(
    (coleccion) => !!coleccion.productos
  );

  const coleccionContent = colecciones?.find(
    (coleccion) => coleccion.titulo === coleccionSeleccionada
  );

  if (!pageContent?.relojes && !pageContent?.perfumes && !pageContent?.gafas) {
    return null;
  }

  const productos =
    coleccionSeleccionada && coleccionContent?.productos
      ? coleccionContent.productos
      : pageContent?.relojes && pageContent.perfumes && pageContent.gafas
      ? [...pageContent.relojes, ...pageContent.perfumes, ...pageContent.gafas]
      : [];
  const areFiltersActive =
    !!coleccionSeleccionada ||
    !!tipoDeProductoSeleccionado ||
    !!campoDeBusquedaSeleccionado ||
    !!lineaSeleccionada;

  const filters = [
    tipoDeProductoSeleccionado &&
      ((producto: TProduct) =>
        producto._type?.includes(tipoDeProductoSeleccionado)),
    campoDeBusquedaSeleccionado &&
      ((producto: TProduct) =>
        Object.entries(producto).some(([key, value]) => {
          if (
            typeof value === "object" &&
            value !== null &&
            "titulo" in value
          ) {
            const tituloValue = (value as { titulo: string }).titulo;
            return tituloValue
              .toLowerCase()
              .includes(campoDeBusquedaSeleccionado.toLowerCase());
          }
          const valueStr = String(value).toLowerCase();
          return valueStr.includes(campoDeBusquedaSeleccionado.toLowerCase());
        })),
    lineaSeleccionada &&
      ((producto: TProduct) =>
        lineaSeleccionada === "todos"
          ? true
          : producto._type.toLowerCase().includes(lineaSeleccionada)),
  ].filter(Boolean); // Remove any undefined filters

  const filteredProducts = productos?.filter((producto) =>
    filters.every((filter) => typeof filter === "function" && filter(producto))
  );
  // console.log({ searchParams });

  // console.log({productos})
  const newFilteredProducts = filteredProducts;

  // console.log({filteredProducts})
  const marcas = getAllMarcas(filteredProducts);

  return (
    <main className="bg-neutral-100 min-h-screen md:px-10 px-5 pt-[70px] md:pt-0">
      <Filters areFiltersActive={areFiltersActive} marcas={marcas} />

      {!coleccionSeleccionada ? (
        <Colecciones colecciones={colecciones ?? []} className="py-6 pl-4" />
      ) : (
        <h2 className="text-3xl font-bold capitalize">
          Coleccion {coleccionSeleccionada}
        </h2>
      )}
      <section className="bg-color-bg-surface-1-default flex flex-col items-center">
        <section className="max-w-[1280px] w-full py-6 px-4 md:px-9 flex">
          {/* <Filters marcas={marcas} areFiltersActive={areFiltersActive} /> */}
        </section>

        <section className="max-w-[1280px] w-full py-6 px-4 md:px-9">
          {newFilteredProducts && newFilteredProducts.length > 0 ? (
            <Productos productos={newFilteredProducts} />
          ) : (
            <h2 className="text-3xl font-bold capitalize">No Hay Productos</h2>
          )}
        </section>
      </section>
    </main>
  );
};

export default Listing;
