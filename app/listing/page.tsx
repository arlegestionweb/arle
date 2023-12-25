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
  const generoSeleccionado = searchParams.genero as string;
  const marcasSeleccionadas = searchParams.marca
    ? Array.isArray(searchParams.marca)
      ? searchParams.marca
      : (searchParams.marca as string).split("&").map((marca) => marca.trim())
    : [];
  const selectedMinPrice = searchParams.minPrice as string;
  const selectedMaxPrice = searchParams.maxPrice as string;

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
    (coleccionSeleccionada !== undefined &&
      coleccionSeleccionada !== "todos") ||
    (tipoDeProductoSeleccionado !== undefined &&
      tipoDeProductoSeleccionado !== "todos") ||
    (campoDeBusquedaSeleccionado !== undefined &&
      campoDeBusquedaSeleccionado !== "todos") ||
    (lineaSeleccionada !== undefined && lineaSeleccionada !== "todos") ||
    (generoSeleccionado !== undefined && generoSeleccionado !== "todos") ||
    (marcasSeleccionadas !== undefined &&
      marcasSeleccionadas.length > 0 &&
      !marcasSeleccionadas.includes("todas")) ||
    (selectedMinPrice !== undefined && selectedMinPrice !== "") ||
    (selectedMaxPrice !== undefined && selectedMaxPrice !== "");

  const filters = [
    tipoDeProductoSeleccionado &&
      ((producto: TProduct) =>
        tipoDeProductoSeleccionado === "todos"
          ? true
          : producto._type?.includes(tipoDeProductoSeleccionado)),
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
    generoSeleccionado &&
      ((producto: TProduct) =>
        generoSeleccionado === "todos"
          ? true
          : producto.genero.toLowerCase().includes(generoSeleccionado)),
    marcasSeleccionadas.length > 0 &&
      ((producto: TProduct) =>
        marcasSeleccionadas.includes("todas")
          ? true
          : marcasSeleccionadas.some(
              (marca: string) =>
                producto.marca.toLowerCase() === marca.toLowerCase()
            )),

            selectedMinPrice &&
            ((producto: TProduct) =>
              producto.variantes.some(
                (variant) => Number(variant.precio.split('.').join('')) >= Number(selectedMinPrice)
              )),
          
          selectedMaxPrice &&
            ((producto: TProduct) =>
              producto.variantes.some(
                (variant) => {
                  const precio = Number(variant.precio.split('.').join('')) 
                  const selectedMaxPrecio = Number(selectedMaxPrice)
                  return precio <= selectedMaxPrecio
                }
              )),
  ].filter(Boolean);

  
  const filteredProducts = productos?.filter((producto) =>
    filters.every((filter) => typeof filter === "function" && filter(producto))
  );

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
