import { coleccionesSchema } from "./documents/colecciones";
import { descuentosSchema } from "./documents/descuentos";
import {
  colorSchema,
  paisDeOrigenSchema,
} from "./documents/documentosVarios";
import { marcasSchema } from "./documents/marcas";
import { estiloDeGafaSchema, formaDeLaMonturaSchema, materialDeLaVarillaSchema, materialDelLenteSchema, materialDelMarcoSchema, tipoDeGafaSchema, tipoDeLenteSchema } from "./products/gafas";
import { concentracionSchema, familiasOlfativasSchema, ingredientesSchema, notasOlfativasSchema } from "./products/perfumes";
import { cristalSchema, estiloDeRelojSchema, funcionDelRelojSchema, materialesDeCajaSchema, materialesDelPulsoSchema, tipoDeMovimientoSchema, tipoDeRelojSchema, tipoDeCierreSchema } from "./products/relojes";
import { recomendadosSchema } from "./documents/recomendados";
import { ventaSchema } from "./documents/venta";
import { homeSchema } from "./pages/homeSchema";
import { listingSchema } from "./pages/listingSchema";
import { preguntasFrecuentesSchema } from "./pages/preguntasFrecuentesSchema";
import { sobreNosotrosSchema } from "./pages/sobreNosotrosSchema";
import { gafasLujoSchema } from "./products/gafas/lujo";
import { gafasPremiumSchema } from "./products/gafas/premium";
import { perfumeLujoSchema } from "./products/perfumes/lujo";
import { perfumePremiumSchema } from "./products/perfumes/premium";
import { relojesLujoSchema } from "./products/relojes/lujo";
import { relojesPremiumSchema } from "./products/relojes/premium";
import { siteSettings } from "./siteSettings";
import { codigoDeDescuentosSchema } from "./documents/codigosDeDescuento";
import { imageObjectSchema, imageUrlObjectSchema, videoObjectSchema } from "./objects/image";
import { contentSchema } from "./objects/contentSchema";
import { citySchema, nuestrasSedesSchema, sedeSchema } from "./pages/nuestrasSedesSchema";
import { trabajaConNosotrosSchema } from "./pages/trabajaConNosotrosSchema";
import { ordersSchema } from "./orders";

export const schemaTypes = [
  siteSettings,

  // pages
  homeSchema,
  listingSchema,
  sobreNosotrosSchema,
  nuestrasSedesSchema,
  preguntasFrecuentesSchema,
  trabajaConNosotrosSchema,

  // products
  perfumePremiumSchema,
  perfumeLujoSchema,
  gafasPremiumSchema,
  gafasLujoSchema,
  relojesLujoSchema,
  relojesPremiumSchema,

  // documents
  marcasSchema,
  descuentosSchema,
  coleccionesSchema,
  recomendadosSchema,
  ventaSchema,
  funcionDelRelojSchema,
  tipoDeRelojSchema,
  estiloDeRelojSchema,
  tipoDeCierreSchema,
  cristalSchema,
  colorSchema,
  familiasOlfativasSchema,
  notasOlfativasSchema,
  ingredientesSchema,
  materialesDeCajaSchema,
  tipoDeGafaSchema,
  estiloDeGafaSchema,
  paisDeOrigenSchema,
  formaDeLaMonturaSchema,
  materialDelMarcoSchema,
  tipoDeLenteSchema,
  materialDelLenteSchema,
  tipoDeMovimientoSchema,
  materialesDelPulsoSchema,
  concentracionSchema,
  materialDeLaVarillaSchema,
  codigoDeDescuentosSchema,
  sedeSchema,
  citySchema,
  ordersSchema,


  // objects
  imageObjectSchema,
  videoObjectSchema,
  contentSchema,
  imageUrlObjectSchema

];
