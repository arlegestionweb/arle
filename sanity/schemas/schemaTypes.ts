import { coleccionesSchema } from "./documents/colecciones";
import { descuentosSchema } from "./documents/descuentos";
import { marcasSchema } from "./documents/marcas";
import { homeSchema } from "./pages/homeSchema";
import { listingSchema } from "./pages/listingSchema";
import { preguntasFrecuentesSchema } from "./pages/preguntasFrecuentesSchema";
import { sobreNosotrosSchema } from "./pages/sobreNosotros";
import { gafasLujoSchema } from "./products/gafas/lujo";
import { gafasPremiumSchema } from "./products/gafas/premium";
import { perfumeLujoSchema } from "./products/perfumes/lujo";
import { perfumePremiumSchema } from "./products/perfumes/premium";
import { relojesSchema } from "./products/relojes";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [
  siteSettings,

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
  relojesSchema,


  // documents
  marcasSchema,
  descuentosSchema,
  coleccionesSchema
]