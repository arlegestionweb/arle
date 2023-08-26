import { coleccionesSchema } from "./documents/colecciones";
import { descuentosSchema } from "./documents/descuentos";
import { marcasSchema } from "./documents/marcas";
import { homeSchema } from "./pages/homeSchema";
import { gafasSchema } from "./products/gafas";
import { lujoSchema } from "./products/perfumes/lujo";
import { premiumSchema } from "./products/perfumes/premium";
import { relojesSchema } from "./products/relojes";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [
  siteSettings,

  // pages
  homeSchema,


  // products
  premiumSchema,
  lujoSchema,
  relojesSchema,
  gafasSchema,


  // documents
  marcasSchema,
  descuentosSchema,
  coleccionesSchema
]