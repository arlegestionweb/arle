import { coleccionesSchema } from "./documents/colecciones";
import { descuentosSchema } from "./documents/descuentos";
import {
  colorSchema,
  paisDeOrigenSchema,
} from "./documents/documentosVarios";
import { marcasSchema } from "./documents/marcas";
import { estiloDeGafaSchema, formaDeLaMonturaSchema, materialDeLaVarillaSchema, materialDelLenteSchema, materialDelMarcoSchema, tipoDeGafaSchema, tipoDeLenteSchema } from "./products/gafas";
import { concentracionSchema, familiasOlfativasSchema, ingredientesSchema, notasOlfativasSchema } from "./products/perfumes";
import { cristalSchema, estiloDeRelojSchema, funcionDelRelojSchema, materialesDeCajaSchema, materialesDelPulsoSchema, tipoDeMovimientoSchema, tipoDeRelojSchema } from "./products/relojes";
import { recomendadosSchema } from "./documents/recomendados";
import { ventaSchema } from "./documents/venta";
import { homeSchema } from "./pages/homeSchema";
import { listingSchema } from "./pages/listingSchema";
import { preguntasFrecuentesSchema } from "./pages/preguntasFrecuentesSchema";
import { sobreNosotrosSchema } from "./pages/sobreNosotros";
import { gafasLujoSchema } from "./products/gafas/lujo";
import { gafasPremiumSchema } from "./products/gafas/premium";
import { perfumeLujoSchema } from "./products/perfumes/lujo";
import { perfumePremiumSchema } from "./products/perfumes/premium";
import { relojesLujoSchema } from "./products/relojes/lujo";
import { relojesPremiumSchema } from "./products/relojes/premium";
import { siteSettings } from "./siteSettings";
import { imageObjectSchema } from "./objects/image";
import { codigoDeDescuentosSchema } from "./documents/codigosDeDescuento";
import { footerSchema } from "./footer";

export const schemaTypes = [
  siteSettings,
  footerSchema,

  // pages
  homeSchema,
  listingSchema,
  sobreNosotrosSchema,
  preguntasFrecuentesSchema,

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


  // objects
  imageObjectSchema,
];
