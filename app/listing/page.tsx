import {
  TProduct,
  getBannersByBrands,
  getListingInitialLoadContent,
  zodCollectionsWithoutProducts,
} from "@/sanity/queries/pages/listingQueries";
import Productos from "./_components/Productos";
import Colecciones from "../_components/Colecciones";
import Filters, { TSortingOption } from "./_components/Filters/index";
import { getAllColeccionesDeMarca, getAllMarcas } from "../_lib/utils";
import { TRelojVariant } from "@/sanity/queries/pages/zodSchemas/reloj";
import { TPerfumeVariant } from "@/sanity/queries/pages/zodSchemas/perfume";
import { TVarianteGafa } from "@/sanity/queries/pages/zodSchemas/gafas";
import Banner from "../_components/homepage/Banner";
import { colombianPriceStringToNumber } from "@/utils/helpers";
import Main from "../_components/Main";
import { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import BFCounterBanner from "../_components/BFCounterBanner";

const sortingFunctions = {
  recientes: (a: TProduct, b: TProduct) => {
    const aFirstVariantOutOfStock = a.variantes[0]?.unidadesDisponibles === 0;
    const bFirstVariantOutOfStock = b.variantes[0]?.unidadesDisponibles === 0;

    // Enviar Tproducts con variantes[0] agotada al final
    if (aFirstVariantOutOfStock && !bFirstVariantOutOfStock) return 1;
    if (!aFirstVariantOutOfStock && bFirstVariantOutOfStock) return -1;

    // Ordenar por fecha
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  },

  precio_mayor_menor: (a: TProduct, b: TProduct) => {
    const aFirstVariantOutOfStock = a.variantes[0]?.unidadesDisponibles === 0;
    const bFirstVariantOutOfStock = b.variantes[0]?.unidadesDisponibles === 0;

    // Enviar Tproducts con variantes[0] agotada al final
    if (aFirstVariantOutOfStock && !bFirstVariantOutOfStock) return 1;
    if (!aFirstVariantOutOfStock && bFirstVariantOutOfStock) return -1;

    // Ordenar por precio mayor a menor
    const highestPriceA = Math.max(
      ...a.variantes.map(variant => {
        const precioConDescuento = colombianPriceStringToNumber(variant.precioConDescuento || "0");
        const precio = colombianPriceStringToNumber(variant.precio);
        return precioConDescuento > 0 ? precioConDescuento : precio;
      })
    );
    const highestPriceB = Math.max(
      ...b.variantes.map(variant => {
        const precioConDescuento = colombianPriceStringToNumber(variant.precioConDescuento || "0");
        const precio = colombianPriceStringToNumber(variant.precio);
        return precioConDescuento > 0 ? precioConDescuento : precio;
      })
    );

    return highestPriceB - highestPriceA;
  },

  price_menor_mayor: (a: TProduct, b: TProduct) => {
    const aFirstVariantOutOfStock = a.variantes[0]?.unidadesDisponibles === 0;
    const bFirstVariantOutOfStock = b.variantes[0]?.unidadesDisponibles === 0;

    // Enviar Tproducts con variantes[0] agotada al final
    if (aFirstVariantOutOfStock && !bFirstVariantOutOfStock) return 1;
    if (!aFirstVariantOutOfStock && bFirstVariantOutOfStock) return -1;

    // Ordenar por precio menor a mayor
    const lowestPriceA = Math.min(
      ...a.variantes.map(variant => {
        const precioConDescuento = colombianPriceStringToNumber(variant.precioConDescuento || "0");
        const precio = colombianPriceStringToNumber(variant.precio);
        return precioConDescuento > 0 ? precioConDescuento : precio;
      })
    );
    const lowestPriceB = Math.min(
      ...b.variantes.map(variant => {
        const precioConDescuento = colombianPriceStringToNumber(variant.precioConDescuento || "0");
        const precio = colombianPriceStringToNumber(variant.precio);
        return precioConDescuento > 0 ? precioConDescuento : precio;
      })
    );

    return lowestPriceA - lowestPriceB;
  },

  aleatorio: (a: TProduct, b: TProduct) => {
    const aFirstVariantOutOfStock = a.variantes[0]?.unidadesDisponibles === 0;
    const bFirstVariantOutOfStock = b.variantes[0]?.unidadesDisponibles === 0;

    // Enviar productos con variantes[0] agotada al final
    if (aFirstVariantOutOfStock && !bFirstVariantOutOfStock) return 1;
    if (!aFirstVariantOutOfStock && bFirstVariantOutOfStock) return -1;

    // Ordenar de forma aleatoria (manteniendo consistencia con `_id`)
    if (a._id < b._id) return -1;
    if (a._id > b._id) return 1;
    return 0; // Si los _id son iguales
  },
};

export const metadata: Metadata = {
  title: "ARLÉ | Productos",
};

const Listing = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  noStore()

  const pageContent = await getListingInitialLoadContent();


  // GENERAL PARAMS

  const sortSeleccionado = (searchParams.sort as string) || "recientes";

  if (!(sortSeleccionado in sortingFunctions)) {
    throw new Error(`Invalid sort option: ${sortSeleccionado}`);
  }

  const lineaSeleccionada = searchParams.linea as string;
  const coleccionSeleccionada = searchParams.coleccion as string;
  const tipoDeProductoSeleccionado = searchParams.type as string;
  const campoDeBusquedaSeleccionado = searchParams.search as string;
  const generoSeleccionado = searchParams.genero as string;

  const marcasSeleccionadas = searchParams.marcas
    ? Array.isArray(searchParams.marcas)
      ? searchParams.marcas
      : (searchParams.marcas as string)
          .split("&")
          .map((marca) => marca.trim().replace(" AND "," & "))
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

  // GAFAS PARAMS

  const tiposDeGafasSeleccionadas = searchParams.tiposDeGafas
    ? Array.isArray(searchParams.tiposDeGafas)
      ? searchParams.tiposDeGafas
      : (searchParams.tiposDeGafas as string)
          .split("&")
          .map((tipo) => tipo.trim())
          .filter((tipo) => tipo !== "")
    : [];

  const estilosDeGafasSeleccionadas = searchParams.estilosDeGafas
    ? Array.isArray(searchParams.estilosDeGafas)
      ? searchParams.estilosDeGafas
      : (searchParams.estilosDeGafas as string)
          .split("&")
          .map((estilo) => estilo.trim())
          .filter((estilo) => estilo !== "")
    : [];
  const materialesDeLasMonturasSeleccionadas =
    searchParams.materialesDeLasMonturas
      ? Array.isArray(searchParams.materialesDeLasMonturas)
        ? searchParams.materialesDeLasMonturas
        : (searchParams.materialesDeLasMonturas as string)
            .split("&")
            .map((material) => material.trim())
            .filter((material) => material !== "")
      : [];
  const formasDeLasMonturasSeleccionadas = searchParams.formasDeLasMonturas
    ? Array.isArray(searchParams.formasDeLasMonturas)
      ? searchParams.formasDeLasMonturas
      : (searchParams.formasDeLasMonturas as string)
          .split("&")
          .map((forma) => forma.trim())
          .filter((forma) => forma !== "")
    : [];
  const coloresDeLasMonturasSeleccionados = searchParams.coloresDeLasMonturas
    ? Array.isArray(searchParams.coloresDeLasMonturas)
      ? searchParams.coloresDeLasMonturas
      : (searchParams.coloresDeLasMonturas as string)
          .split("&")
          .map((color) => color.trim())
          .filter((color) => color !== "")
    : [];
  const coloresDeLosLentesSeleccionados = searchParams.coloresDeLosLentes
    ? Array.isArray(searchParams.coloresDeLosLentes)
      ? searchParams.coloresDeLosLentes
      : (searchParams.coloresDeLosLentes as string)
          .split("&")
          .map((color) => color.trim())
          .filter((color) => color !== "")
    : [];

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

  const colecciones = pageContent?.colecciones?.filter(
    (coleccion) => !!coleccion.productos
  );

  const coleccionContent = colecciones?.find(
    (coleccion) => coleccion.titulo === coleccionSeleccionada
  );

  const coleccionPrincipal = colecciones?.find(
    (coleccion) => coleccion.titulo === 'Especiales Navidad'
  )

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
          : producto.genero.toLowerCase().includes(generoSeleccionado) ||
            producto.genero.toLowerCase() === "unisex"),
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
        producto.variantes.some((variant) => {
            const precio = colombianPriceStringToNumber(variant.precio);
            const precioConDescuento = colombianPriceStringToNumber(variant.precioConDescuento || "0");
            const precioFinal = precioConDescuento > 0 ? precioConDescuento : precio;
            const selectedMinPrecio = Number(selectedMinPrice);
            return precioFinal >= selectedMinPrecio;
        })),

    selectedMaxPrice &&
      ((producto: TProduct) =>
        producto.variantes.some((variant) => {
          const precio = colombianPriceStringToNumber(variant.precio);
          const precioConDescuento = colombianPriceStringToNumber(variant.precioConDescuento || "0");
          const precioFinal = precioConDescuento > 0 ? precioConDescuento : precio;
          const selectedMaxPrecio = Number(selectedMaxPrice);
          return precioFinal <= selectedMaxPrecio;
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
                  producto.movimiento?.tipoDeMovimiento === tipoDeMovimiento) ||
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

    // PERFUME FILTERS
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

    // GAFA FILTERS

    tiposDeGafasSeleccionadas.length > 0 &&
      ((producto: TProduct) =>
        tiposDeGafasSeleccionadas.includes("todos")
          ? true
          : tiposDeGafasSeleccionadas.some(
              (tipoDeGafa) =>
                (producto._type === "gafasLujo" &&
                  tipoDeGafa === producto.especificaciones.tipoDeGafa) ||
                (producto._type === "gafasPremium" &&
                  tipoDeGafa === producto.detalles.tipoDeGafa)
            )),
    estilosDeGafasSeleccionadas.length > 0 &&
      ((producto: TProduct) =>
        estilosDeGafasSeleccionadas.includes("todos")
          ? true
          : estilosDeGafasSeleccionadas.some(
              (estiloDeGafa) =>
                (producto._type === "gafasLujo" &&
                  estiloDeGafa === producto.especificaciones.estiloDeGafa) ||
                (producto._type === "gafasPremium" &&
                  estiloDeGafa === producto.detalles.estiloDeGafa)
            )),
    materialesDeLasMonturasSeleccionadas.length > 0 &&
      ((producto: TProduct) =>
        materialesDeLasMonturasSeleccionadas.includes("todos")
          ? true
          : materialesDeLasMonturasSeleccionadas.some(
              (material) =>
                (producto._type === "gafasLujo" &&
                  material ===
                    producto.especificaciones.montura.materialMontura) ||
                (producto._type === "gafasPremium" &&
                  material === producto.detalles.montura.materialMontura)
            )),
    formasDeLasMonturasSeleccionadas.length > 0 &&
      ((producto: TProduct) =>
        formasDeLasMonturasSeleccionadas.includes("todos")
          ? true
          : formasDeLasMonturasSeleccionadas.some(
              (forma) =>
                (producto._type === "gafasLujo" &&
                  forma ===
                    producto.especificaciones.montura.formaDeLaMontura) ||
                (producto._type === "gafasPremium" &&
                  forma === producto.detalles.montura.formaDeLaMontura)
            )),
    coloresDeLosLentesSeleccionados.length > 0 &&
      ((producto: TProduct) =>
        coloresDeLosLentesSeleccionados.includes("todos")
          ? true
          : coloresDeLosLentesSeleccionados.some(
              (color) =>
                (producto._type === "gafasLujo" &&
                  producto.variantes.some(
                    (variant) => variant.colorDelLente.nombre === color
                  )) ||
                (producto._type === "gafasPremium" &&
                  producto.variantes.some(
                    (variant) => variant.colorDelLente.nombre === color
                  ))
            )),
    coloresDeLasMonturasSeleccionados.length > 0 &&
      ((producto: TProduct) =>
        coloresDeLasMonturasSeleccionados.includes("todos")
          ? true
          : coloresDeLasMonturasSeleccionados.some(
              (color) =>
                (producto._type === "gafasLujo" &&
                  producto.variantes.some(
                    (variant) => variant.colorDeLaMontura.nombre === color
                  )) ||
                (producto._type === "gafasPremium" &&
                  producto.variantes.some(
                    (variant) => variant.colorDeLaMontura.nombre === color
                  ))
            )),
  ].filter(Boolean);

  const filteredProducts = productos?.filter((producto) =>
    filters.every((filter) => typeof filter === "function" && filter(producto)) &&
    // Excluir productos con todas las variantes agotadas
    !producto.variantes.every((variant) => variant.unidadesDisponibles === 0)
  );
  const newFilteredProducts = filteredProducts;

  const marcas = await getAllMarcas(filteredProducts);

  const relojes = newFilteredProducts.filter(
    (p) => p._type === "relojesLujo" || p._type === "relojesPremium"
  );
  const perfumes = newFilteredProducts.filter(
    (p) => p._type === "perfumeLujo" || p._type === "perfumePremium"
  );
  const gafas = newFilteredProducts.filter(
    (p) => p._type === "gafasLujo" || p._type === "gafasPremium"
  );

  const detallesRelojes = newFilteredProducts.map((p) =>
    p._type === "relojesLujo"
      ? p.especificaciones
      : p._type === "relojesPremium"
      ? p.detallesReloj
      : null
  );

  const gafasFilters = {
    tiposDeGafas: Array.from(
      new Set(
        gafas.map((gafa) =>
          gafa._type === "gafasLujo"
            ? gafa.especificaciones.tipoDeGafa
            : gafa._type === "gafasPremium"
            ? gafa.detalles.tipoDeGafa
            : ""
        )
      )
    ).filter(Boolean),
    estilosDeGafas: Array.from(
      new Set(
        gafas.map((gafa) =>
          gafa._type === "gafasLujo"
            ? gafa.especificaciones.estiloDeGafa
            : gafa._type === "gafasPremium"
            ? gafa.detalles.estiloDeGafa
            : ""
        )
      )
    ).filter(Boolean),
    coloresDeLasMonturas: Array.from(
      new Set(
        gafas.flatMap((gafa) =>
          gafa.variantes
            .filter(
              (variante): variante is TVarianteGafa =>
                "colorDeLaMontura" in variante
            )
            .map((variante) => JSON.stringify(variante.colorDeLaMontura))
        )
      )
    )
      .map((color) => JSON.parse(color))
      .filter(Boolean),
    coloresDeLosLentes: Array.from(
      new Set(
        gafas.flatMap((gafa) =>
          gafa.variantes
            .filter(
              (variante): variante is TVarianteGafa =>
                "colorDelLente" in variante
            )
            .map((variante) => JSON.stringify(variante.colorDelLente))
        )
      )
    )
      .map((color) => JSON.parse(color))
      .filter(Boolean),
    formasDeLasMonturas: Array.from(
      new Set(
        gafas.map((gafa) =>
          gafa._type === "gafasLujo"
            ? gafa.especificaciones.montura.formaDeLaMontura
            : gafa._type === "gafasPremium"
            ? gafa.detalles.montura.formaDeLaMontura
            : ""
        )
      )
    ).filter(Boolean),
    materialesDeLasMonturas: Array.from(
      new Set(
        gafas.map((gafa) =>
          gafa._type === "gafasLujo"
            ? gafa.especificaciones.montura.materialMontura
            : gafa._type === "gafasPremium"
            ? gafa.detalles.montura.materialMontura
            : ""
        )
      )
    ).filter(Boolean),
  };

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
              ? reloj.movimiento?.tipoDeMovimiento
              : reloj._type === "relojesPremium"
              ? reloj.detallesReloj.tipoDeMovimiento
              : null
          )
          .filter((item): item is string => item !== null)
      )
    ) as string[],
  };

  const coleccionesDeMarca = getAllColeccionesDeMarca(filteredProducts);

  const sortedProducts = [...filteredProducts]?.sort(
    sortingFunctions[sortSeleccionado as TSortingOption["value"]]
  );

  const filteredCollectionProducts = coleccionPrincipal?.productos?.filter((producto) =>
    filters.every((filter) => typeof filter === "function" && filter(producto)) &&
    // Excluir productos con todas las variantes agotadas
    !producto.variantes.every((variant) => variant.unidadesDisponibles === 0)
  );

  const specialOrderedProducts = filteredCollectionProducts ? [ ...filteredCollectionProducts, ...sortedProducts] : sortedProducts;

  // const sortedProducts = coleccionPrincipal?.productos ? [ ...coleccionPrincipal?.productos , ...filteredProducts] : filteredProducts;

  const parsedCollections =
    zodCollectionsWithoutProducts.safeParse(colecciones);

  //Banners por marcas

  const bannersByBrand = await getBannersByBrands(marcasSeleccionadas);
  const filteredBanners = bannersByBrand?.filter(brand => brand.banners)

  return (
    <Main extraClasses=" lg:mb-[100vh] bg-white min-h-screen">
      {marcasSeleccionadas?.length > 0 && filteredBanners?.length == 0
        ? <></>
        : pageContent.listingContent && (
            <>
              <Banner
                bannersByBrand={filteredBanners}
                banners={pageContent.listingContent}
                className="h-full max-w-[1600px] w-full"
                />
            </>
          )}
      {!coleccionSeleccionada && colecciones && colecciones.length > 0 ? (
        <Colecciones
          colecciones={parsedCollections.success ? parsedCollections.data.sort((a, b): number => {
            const dateA: number = new Date(a.date).getTime();
            const dateB: number = new Date(b.date).getTime();
            return dateB - dateA;
          }) : []}
        />
      ) : parsedCollections.success && parsedCollections.data.length > 0 ? (
        <h2 className="text-2xl md:text-3xl w-full pt-3 font-jomolhari font-normal text-center capitalize">
          Colección {coleccionSeleccionada}
        </h2>
      ) : null}
      <section className="bg-white flex flex-col items-center">
        <section className="max-w-screen-xl w-full py-2 px-4 md:px-8 flex">
          <Filters
            areFiltersActive={areFiltersActive}
            marcas={marcas}
            coleccionesDeMarca={coleccionesDeMarca}
            relojFilters={relojFilters}
            perfumeFilters={perfumeFilters}
            gafaFilters={gafasFilters}
          />
        </section>
        <section className="max-w-screen-xl w-full pb-6 px-4 md:px-9">
          {filteredProducts && filteredProducts.length > 0 ? (
            <Productos productos={specialOrderedProducts} />
          ) : (
            <h2 className="text-3xl font-bold capitalize">No Hay Productos</h2>
          )}
        </section>
      </section>
    </Main>
  );
};

export default Listing;
