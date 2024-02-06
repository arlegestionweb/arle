import { codigoDeDescuentosSchema } from "../schemas/documents/codigosDeDescuento";
import { coleccionesSchema } from "../schemas/documents/colecciones";
import { descuentosSchema } from "../schemas/documents/descuentos";
import { colorSchema, paisDeOrigenSchema } from "../schemas/documents/documentosVarios";
import { marcasSchema } from "../schemas/documents/marcas";
import { recomendadosSchema } from "../schemas/documents/recomendados";
import { ventaSchema } from "../schemas/documents/venta";
import { coleccionesDeMarcaSchema } from "../schemas/objects/products/generales";
import { homeSchema } from "../schemas/pages/homeSchema";
import { listingSchema } from "../schemas/pages/listingSchema";
import { citySchema, nuestrasSedesSchema, sedeSchema } from "../schemas/pages/nuestrasSedesSchema";
import { preguntasFrecuentesSchema } from "../schemas/pages/preguntasFrecuentesSchema";
import { sobreNosotrosSchema } from "../schemas/pages/sobreNosotrosSchema";
import { trabajaConNosotrosSchema } from "../schemas/pages/trabajaConNosotrosSchema";
import { estiloDeGafaSchema, formaDeLaMonturaSchema, materialDeLaVarillaSchema, materialDelLenteSchema, materialDelMarcoSchema, tipoDeGafaSchema, tipoDeLenteSchema } from "../schemas/products/gafas";
import { gafasLujoSchema } from "../schemas/products/gafas/lujo";
import { gafasPremiumSchema } from "../schemas/products/gafas/premium";
import { concentracionSchema, familiasOlfativasSchema, ingredientesSchema, notasOlfativasSchema } from "../schemas/products/perfumes";
import { perfumeLujoSchema } from "../schemas/products/perfumes/lujo";
import { perfumePremiumSchema } from "../schemas/products/perfumes/premium";
import { cristalSchema, estiloDeRelojSchema, funcionDelRelojSchema, materialesDeCajaSchema, materialesDelPulsoSchema, tipoDeMovimientoSchema, tipoDeRelojSchema } from "../schemas/products/relojes";
import { relojesLujoSchema } from "../schemas/products/relojes/lujo";
import { relojesPremiumSchema } from "../schemas/products/relojes/premium";
import { siteSettings } from "../schemas/siteSettings";

export const hiddenDocTypes = (listItem: any) => {
  return ![
    citySchema.name,
    ventaSchema.name,
    siteSettings.name,
    homeSchema.name,
    perfumePremiumSchema.name,
    perfumeLujoSchema.name,
    marcasSchema.name,
    gafasLujoSchema.name,
    gafasPremiumSchema.name,
    coleccionesSchema.name,
    descuentosSchema.name,
    listingSchema.name,
    sobreNosotrosSchema.name,
    preguntasFrecuentesSchema.name,
    relojesLujoSchema.name,
    relojesPremiumSchema.name,
    recomendadosSchema.name,
    funcionDelRelojSchema.name,
    tipoDeRelojSchema.name,
    estiloDeRelojSchema.name,
    cristalSchema.name,
    colorSchema.name,
    familiasOlfativasSchema.name,
    notasOlfativasSchema.name,
    ingredientesSchema.name,
    materialesDeCajaSchema.name,
    coleccionesDeMarcaSchema.name,
    tipoDeGafaSchema.name,
    estiloDeGafaSchema.name,
    paisDeOrigenSchema.name,
    formaDeLaMonturaSchema.name,
    materialDelMarcoSchema.name,
    tipoDeLenteSchema.name,
    materialDelLenteSchema.name,
    tipoDeMovimientoSchema.name,
    materialesDelPulsoSchema.name,
    concentracionSchema.name,
    materialDeLaVarillaSchema.name,
    nuestrasSedesSchema.name,
    trabajaConNosotrosSchema.name,
    sedeSchema.name,
    codigoDeDescuentosSchema.name
  ].includes(listItem.getId());
};