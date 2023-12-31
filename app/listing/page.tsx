import {
  TProduct,
  getListingInitialLoadContent,
} from "@/sanity/queries/pages/listingQueries";
import Productos from "./_components/Productos";
import Colecciones from "../_components/Colecciones";
// import Banner from "../_components/homepage/Banner";
import Filters from "./_components/Filters/index";
import { getAllColeccionesDeMarca, getAllMarcas } from "../_lib/utils";
import { TRelojVariant } from "@/sanity/queries/pages/zodSchemas/reloj";
import { TPerfumeVariant } from "@/sanity/queries/pages/zodSchemas/perfume";

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

  // GENERAL PARAMS
  const lineaSeleccionada = searchParams.linea as string;
  const coleccionSeleccionada = searchParams.coleccion as string;
  const tipoDeProductoSeleccionado = searchParams.type as string;
  const campoDeBusquedaSeleccionado = searchParams.search as string;
  const generoSeleccionado = searchParams.genero as string;
  const marcasSeleccionadas = searchParams.marca
    ? Array.isArray(searchParams.marca)
      ? searchParams.marca
      : (searchParams.marca as string)
          .split("&")
          .map((marca) => marca.trim())
          .filter((marca) => marca !== "")
    : [];
  const selectedMinPrice = searchParams.minPrice as string;
  const selectedMaxPrice = searchParams.maxPrice as string;
  const selectedColeccionesDeMarca = searchParams.coleccionesDeMarca
    ? Array.isArray(searchParams.coleccionesDeMarca)
      ? searchParams.coleccionesDeMarca
      : (searchParams.coleccionesDeMarca as string)
          .split("&")
          .map((coleccionesDeMarca) => coleccionesDeMarca.trim())
          .filter((coleccionesDeMarca) => coleccionesDeMarca !== "")
    : [];

  // RELOJES PARAMS

  const tiposDeRelojSeleccionados = searchParams.tiposDeReloj
    ? Array.isArray(searchParams.tiposDeReloj)
      ? searchParams.tiposDeReloj
      : (searchParams.tiposDeReloj as string)
          .split("&")
          .map((tipo) => tipo.trim())
          .filter((tipo) => tipo !== "")
    : [];

  const estilosDeRelojSeleccionados = searchParams.estilosDeReloj
    ? Array.isArray(searchParams.estilosDeReloj)
      ? searchParams.estilosDeReloj
      : (searchParams.estilosDeReloj as string)
          .split("&")
          .map((estilo) => estilo.trim())
          .filter((estilo) => estilo !== "")
    : [];

  const coloresDeLasCajasDeRelojSeleccionados = searchParams.coloresDeLasCajas
    ? Array.isArray(searchParams.coloresDeLasCajas)
      ? searchParams.coloresDeLasCajas
      : (searchParams.coloresDeLasCajas as string)
          .split("&")
          .map((color) => color.trim())
          .filter((color) => color !== "")
    : [];

  const coloresDelPulsoDeRelojSeleccionados = searchParams.coloresDeLosPulsos
    ? Array.isArray(searchParams.coloresDeLosPulsos)
      ? searchParams.coloresDeLosPulsos
      : (searchParams.coloresDeLosPulsos as string)
          .split("&")
          .map((color) => color.trim())
          .filter((color) => color !== "")
    : [];

  const materialesDelPulsoDeRelojSeleccionados =
    searchParams.materialDeLosPulsos
      ? Array.isArray(searchParams.materialDeLosPulsos)
        ? searchParams.materialDeLosPulsos
        : (searchParams.materialDeLosPulsos as string)
            .split("&")
            .map((material) => material.trim())
            .filter((material) => material !== "")
      : [];
  const materialesDeLasCajasDeRelojSeleccionados =
    searchParams.materialesDeLasCajas
      ? Array.isArray(searchParams.materialesDeLasCajas)
        ? searchParams.materialesDeLasCajas
        : (searchParams.materialesDeLasCajas as string)
            .split("&")
            .map((material) => material.trim())
            .filter((material) => material !== "")
      : [];
  const tiposDeMovimientoDeRelojSeleccionados = searchParams.tiposDeMovimientos
    ? Array.isArray(searchParams.tiposDeMovimientos)
      ? searchParams.tiposDeMovimientos
      : (searchParams.tiposDeMovimientos as string)
          .split("&")
          .map((tipo) => tipo.trim())
          .filter((tipo) => tipo !== "")
    : [];
  const tamanosDeLasCajasDeRelojSeleccionados = searchParams.tamanosDeLasCajas
    ? Array.isArray(searchParams.tamanosDeLasCajas)
      ? searchParams.tamanosDeLasCajas
      : (searchParams.tamanosDeLasCajas as string)
          .split("&")
          .map((tipo) => tipo.trim())
          .filter((tipo) => tipo !== "")
    : [];

  // console.log({
  //   tiposDeRelojSeleccionados,
  //   estilosDeRelojSeleccionados,
  //   coloresDeLasCajasDeRelojSeleccionados,
  //   coloresDelPulsoDeRelojSeleccionados,
  //   materialesDelPulsoDeRelojSeleccionados,
  //   materialesDeLasCajasDeRelojSeleccionados,
  //   tiposDeMovimientoDeRelojSeleccionados,
  //   tamanosDeLasCajasDeRelojSeleccionados,
  // });

  // PERFUME PARAMS
  const tamanosDePerfumeSeleccionados = searchParams.tamanosDePerfume
    ? Array.isArray(searchParams.tamanosDePerfume)
      ? searchParams.tamanosDePerfume
      : (searchParams.tamanosDePerfume as string)
          .split("&")
          .map((tamanos) => tamanos.trim())
          .filter((tamanos) => tamanos !== "")
    : [];

  const concentracionDePerfumeSeleccionados =
    searchParams.concentracionDePerfume
      ? Array.isArray(searchParams.concentracionDePerfume)
        ? searchParams.concentracionDePerfume
        : (searchParams.concentracionDePerfume as string)
            .split("&")
            .map((concentracion) => concentracion.trim())
            .filter((concentracion) => concentracion !== "")
      : [];

  const familiasOlvativasSeleccionados = searchParams.familiasOlvativas
    ? Array.isArray(searchParams.familiasOlvativas)
      ? searchParams.familiasOlvativas
      : (searchParams.familiasOlvativas as string)
          .split("&")
          .map((tamanos) => tamanos.trim())
          .filter((tamanos) => tamanos !== "")
    : [];

  const parteDeUnSetSeleccionados = searchParams.parteDeUnSet
    ? Array.isArray(searchParams.parteDeUnSet)
      ? searchParams.parteDeUnSet
      : (searchParams.parteDeUnSet as string)
          .split("&")
          .map((set) => set.trim())
          .filter((set) => set !== "")
    : [];

  // console.log({
  //   tamanosDePerfumeSeleccionados,
  //   concentracionDePerfumeSeleccionados,
  //   familiasOlvativasSeleccionados,
  //   parteDeUnSetSeleccionados,
  // });
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
    (selectedMaxPrice !== undefined && selectedMaxPrice !== "") ||
    (selectedColeccionesDeMarca !== undefined &&
      selectedColeccionesDeMarca.length > 0 &&
      !selectedColeccionesDeMarca.includes("todas"));

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
          (variant) =>
            Number(variant.precio.split(".").join("")) >=
            Number(selectedMinPrice)
        )),

    selectedMaxPrice &&
      ((producto: TProduct) =>
        producto.variantes.some((variant) => {
          const precio = Number(variant.precio.split(".").join(""));
          const selectedMaxPrecio = Number(selectedMaxPrice);
          return precio <= selectedMaxPrecio;
        })),

    selectedColeccionesDeMarca.length > 0 &&
      ((producto: TProduct) =>
        selectedColeccionesDeMarca.includes("todas")
          ? true
          : selectedColeccionesDeMarca.some(
              (coleccionDeMarca: string) =>
                producto.coleccionDeMarca?.toLowerCase() ===
                coleccionDeMarca.toLowerCase()
            )),

    tiposDeRelojSeleccionados.length > 0 &&
      ((producto: TProduct) =>
        tiposDeRelojSeleccionados.includes("todos")
          ? true
          : tiposDeRelojSeleccionados.some(
              (tipoDeReloj) =>
                (producto._type === "relojesLujo" &&
                  tipoDeReloj === producto.especificaciones.tipoDeReloj) ||
                (producto._type === "relojesPremium" &&
                  tipoDeReloj === producto.detallesReloj.tipoDeReloj)
            )),
    estilosDeRelojSeleccionados.length > 0 &&
      ((producto: TProduct) =>
        estilosDeRelojSeleccionados.includes("todos")
          ? true
          : estilosDeRelojSeleccionados.some(
              (estiloDeReloj) =>
                (producto._type === "relojesLujo" &&
                  estiloDeReloj === producto.especificaciones.estiloDeReloj) ||
                (producto._type === "relojesPremium" &&
                  estiloDeReloj === producto.detallesReloj.estiloDeReloj)
            )),
    coloresDeLasCajasDeRelojSeleccionados.length > 0 &&
      ((producto: TProduct) =>
        coloresDeLasCajasDeRelojSeleccionados.includes("todos")
          ? true
          : coloresDeLasCajasDeRelojSeleccionados.some(
              (colorDeCaja) =>
                (producto._type === "relojesLujo" &&
                  producto.variantes.some(
                    (variant) => variant.colorCaja.nombre === colorDeCaja
                  )) ||
                (producto._type === "relojesPremium" &&
                  producto.variantes.some(
                    (variant) => variant.colorCaja.nombre === colorDeCaja
                  ))
            )),
    coloresDelPulsoDeRelojSeleccionados.length > 0 &&
      ((producto: TProduct) =>
        coloresDelPulsoDeRelojSeleccionados.includes("todos")
          ? true
          : coloresDelPulsoDeRelojSeleccionados.some(
              (colorDelPulso) =>
                (producto._type === "relojesLujo" &&
                  producto.variantes.some(
                    (variant) => variant.colorPulso.nombre === colorDelPulso
                  )) ||
                (producto._type === "relojesPremium" &&
                  producto.variantes.some(
                    (variant) => variant.colorPulso.nombre === colorDelPulso
                  ))
            )),

    materialesDelPulsoDeRelojSeleccionados.length > 0 &&
      ((producto: TProduct) =>
        materialesDelPulsoDeRelojSeleccionados.includes("todos")
          ? true
          : materialesDelPulsoDeRelojSeleccionados.some(
              (materialDelPulso) =>
                (producto._type === "relojesLujo" &&
                  producto.especificaciones.material === materialDelPulso) ||
                (producto._type === "relojesPremium" &&
                  producto.detallesReloj.material === materialDelPulso)
            )),

    materialesDeLasCajasDeRelojSeleccionados.length > 0 &&
      ((producto: TProduct) =>
        materialesDeLasCajasDeRelojSeleccionados.includes("todos")
          ? true
          : materialesDeLasCajasDeRelojSeleccionados.some(
              (materialDeLaCaja) =>
                (producto._type === "relojesLujo" &&
                  producto.caja.material === materialDeLaCaja) ||
                (producto._type === "relojesPremium" &&
                  producto.detallesReloj.caja.material === materialDeLaCaja)
            )),
    tiposDeMovimientoDeRelojSeleccionados.length > 0 &&
      ((producto: TProduct) =>
        tiposDeMovimientoDeRelojSeleccionados.includes("todos")
          ? true
          : tiposDeMovimientoDeRelojSeleccionados.some(
              (tipoDeMovimiento) =>
                (producto._type === "relojesLujo" &&
                  producto.movimiento.tipoDeMovimiento === tipoDeMovimiento) ||
                (producto._type === "relojesPremium" &&
                  producto.detallesReloj.tipoDeMovimiento === tipoDeMovimiento)
            )),

    tamanosDeLasCajasDeRelojSeleccionados.length > 0 &&
      ((producto: TProduct) =>
        tamanosDeLasCajasDeRelojSeleccionados.includes("todos")
          ? true
          : tamanosDeLasCajasDeRelojSeleccionados.some(
              (tamanoDeLaCaja) =>
                (producto._type === "relojesLujo" &&
                  producto.caja.diametro.toString() === tamanoDeLaCaja) ||
                (producto._type === "relojesPremium" &&
                  producto.detallesReloj.caja.diametro.toString() ===
                    tamanoDeLaCaja)
            )),
    tamanosDePerfumeSeleccionados.length > 0 &&
      ((producto: TProduct) =>
        tamanosDePerfumeSeleccionados.includes("todos")
          ? true
          : tamanosDePerfumeSeleccionados.some(
              (tamanoDelPerfume) =>
                (producto._type === "perfumeLujo" &&
                  producto.variantes.some(
                    (variant) => variant.tamano === +tamanoDelPerfume
                  )) ||
                (producto._type === "perfumePremium" &&
                  producto.variantes.some(
                    (variant) => variant.tamano === +tamanoDelPerfume
                  ))
            )),
    concentracionDePerfumeSeleccionados.length > 0 &&
      ((producto: TProduct) =>
        concentracionDePerfumeSeleccionados.includes("todas")
          ? true
          : concentracionDePerfumeSeleccionados.some(
              (concentracion) =>
                (producto._type === "perfumePremium" &&
                  producto.detalles.concentracion === concentracion) ||
                (producto._type === "perfumeLujo" &&
                  producto.concentracion === concentracion)
            )),
    familiasOlvativasSeleccionados.length > 0 &&
      ((producto: TProduct) =>
        familiasOlvativasSeleccionados.includes("todas")
          ? true
          : familiasOlvativasSeleccionados.some(
              (familia) =>
                (producto._type === "perfumeLujo" &&
                  producto.notasOlfativas.familiaOlfativa === familia) ||
                (producto._type === "perfumePremium" &&
                  producto.detalles.notasOlfativas.familiaOlfativa === familia)
            )),
    parteDeUnSetSeleccionados.length > 0 &&
      ((producto: TProduct) =>
        parteDeUnSetSeleccionados.includes("todos")
          ? true
          : parteDeUnSetSeleccionados.some(
              (set) =>
                (producto._type === "perfumeLujo" &&
                  (set === "Sí"
                    ? producto.parteDeUnSet
                    : !producto.parteDeUnSet)) ||
                (producto._type === "perfumePremium" &&
                  (set === "Sí"
                    ? producto.parteDeUnSet
                    : !producto.parteDeUnSet))
            )),
  ].filter(Boolean);

  const filteredProducts = productos?.filter((producto) =>
    filters.every((filter) => typeof filter === "function" && filter(producto))
  );
  // console.log({ filteredProducts });
  const newFilteredProducts = filteredProducts;

  const marcas = getAllMarcas(filteredProducts);

  const relojes = newFilteredProducts.filter(
    (p) => p._type === "relojesLujo" || p._type === "relojesPremium"
  );
  const perfumes = newFilteredProducts.filter(
    (p) => p._type === "perfumeLujo" || p._type === "perfumePremium"
  );

  const detallesRelojes = newFilteredProducts.map((p) =>
    p._type === "relojesLujo"
      ? p.especificaciones
      : p._type === "relojesPremium"
      ? p.detallesReloj
      : null
  );

  const perfumeFilters = {
    tamanos: Array.from(
      new Set(
        perfumes
          .map((p) => (p.variantes as TPerfumeVariant[]).map((v) => v.tamano))
          .flat()
      )
    ).sort((a, b) => a - b),
    concentraciones: Array.from(
      new Set(
        perfumes.map((p) =>
          p._type === "perfumeLujo"
            ? p.concentracion
            : p._type === "perfumePremium"
            ? p.detalles.concentracion
            : ""
        )
      )
    ).filter(Boolean),
    sets: [true, false],
    familiasOlfativas: Array.from(
      new Set(
        perfumes.map((p) =>
          p._type === "perfumeLujo"
            ? p.notasOlfativas.familiaOlfativa
            : p._type === "perfumePremium"
            ? p.detalles.notasOlfativas.familiaOlfativa
            : ""
        )
      )
    ).filter(Boolean),
  };

  console.log({ perfumeFilters });
  const relojFilters = {
    tiposDeReloj: Array.from(
      new Set(detallesRelojes.flatMap((detalle) => detalle?.tipoDeReloj || []))
    ),
    estilosDeReloj: Array.from(
      new Set(
        detallesRelojes.flatMap((detalle) => detalle?.estiloDeReloj || [])
      )
    ),
    coloresDeLaCaja: Array.from(
      new Set(
        relojes.flatMap((reloj) =>
          reloj.variantes
            .filter(
              (variante): variante is TRelojVariant => "colorCaja" in variante
            )
            .map((variante) => JSON.stringify(variante.colorCaja))
        )
      )
    ).map((item) => JSON.parse(item)),
    coloresDelPulso: Array.from(
      new Set(
        relojes.flatMap((reloj) =>
          reloj.variantes
            .filter(
              (variante): variante is TRelojVariant => "colorPulso" in variante
            )
            .map((variante) => JSON.stringify(variante.colorPulso))
        )
      )
    ).map((item) => JSON.parse(item)),
    materialDelPulsoDeReloj: Array.from(
      new Set(detallesRelojes.flatMap((detalle) => detalle?.material || []))
    ),
    cajas: {
      diametros: Array.from(
        new Set(
          relojes
            .flatMap((reloj) =>
              reloj._type === "relojesLujo"
                ? [reloj.caja.diametro]
                : reloj._type === "relojesPremium"
                ? [reloj.detallesReloj.caja.diametro]
                : []
            )
            .filter(Boolean)
        )
      ).sort((a, b) => a - b),
      materiales: Array.from(
        new Set(
          relojes
            .flatMap((reloj) =>
              reloj._type === "relojesLujo"
                ? [reloj.caja.material]
                : reloj._type === "relojesPremium"
                ? [reloj.detallesReloj.caja.material]
                : []
            )
            .filter(Boolean)
        )
      ),
      cristales: Array.from(
        new Set(
          relojes
            .flatMap((reloj) =>
              reloj._type === "relojesLujo"
                ? [reloj.caja.cristal]
                : reloj._type === "relojesPremium"
                ? [reloj.detallesReloj.caja.cristal]
                : []
            )
            .filter(Boolean)
        )
      ),
    },
    tiposDeMovimiento: Array.from(
      new Set(
        relojes
          .map((reloj) =>
            reloj._type === "relojesLujo"
              ? reloj.movimiento.tipoDeMovimiento
              : reloj._type === "relojesPremium"
              ? reloj.detallesReloj.tipoDeMovimiento
              : null
          )
          .filter((item): item is string => item !== null)
      )
    ) as string[],
  };

  // console.log({ relojes, relojFilters });

  const coleccionesDeMarca = getAllColeccionesDeMarca(filteredProducts);
  return (
    <main className="bg-neutral-100 min-h-screen md:px-10 px-5 pt-[70px] md:pt-0">
      <Filters
        areFiltersActive={areFiltersActive}
        marcas={marcas}
        coleccionesDeMarca={coleccionesDeMarca}
        relojFilters={relojFilters}
        perfumeFilters={perfumeFilters}
      />

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
