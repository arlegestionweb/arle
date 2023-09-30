import { siteSettings } from "../schemas/siteSettings";
import { type StructureBuilder } from "sanity/desk";
import { homeSchema } from "../schemas/pages/homeSchema";
import { MdPointOfSale } from "react-icons/md";
import productos from "./productos";
import { perfumePremiumSchema } from "../schemas/products/perfumes/premium";
import { perfumeLujoSchema } from "../schemas/products/perfumes/lujo";
import { marcasSchema } from "../schemas/documents/marcas";
import { coleccionesSchema } from "../schemas/documents/colecciones";
import { descuentosSchema } from "../schemas/documents/descuentos";
import pages from "./pages";
import { listingSchema } from "../schemas/pages/listingSchema";
import { sobreNosotrosSchema } from "../schemas/pages/sobreNosotros";
import { preguntasFrecuentesSchema } from "../schemas/pages/preguntasFrecuentesSchema";
import { gafasLujoSchema } from "../schemas/products/gafas/lujo";
import { gafasPremiumSchema } from "../schemas/products/gafas/premium";
import { relojesLujoSchema } from "../schemas/products/relojes/lujo";
import { relojesPremiumSchema } from "../schemas/products/relojes/premium";
import { recomendadosSchema } from "../schemas/documents/recomendados";
import {
  coleccionesDeMarcaSchema,
  colorSchema,
  paisDeFabricacionSchema,
} from "../schemas/documents/documentosVarios";
import { cristalSchema, estiloDeRelojSchema, funcionDelRelojSchema, materialesDeCajaSchema, materialesDelPulsoSchema, tipoDeMovimientoSchema, tipoDeRelojSchema } from "../schemas/documents/productos/relojes";
import { familiasOlfativasSchema, ingredientesSchema, notasOlfativasSchema } from "../schemas/documents/productos/perfumes";
import { estiloDeGafaSchema, formaDeLaMonturaSchema, materialDelLenteSchema, materialDelMarcoSchema, tipoDeGafaSchema, tipoDeLenteSchema } from "../schemas/documents/productos/gafas";

export default (S: StructureBuilder) => {
  const siteSettingsListItem = S.listItem()
    .title(siteSettings.title || "")
    .icon(siteSettings.icon)
    .child(
      S.editor()
        .id(siteSettings.name)
        .schemaType(siteSettings.name)
        .documentId(siteSettings.name)
    );

  const adminVentas = S.listItem()
    .title("Admin Ventas")
    .icon(MdPointOfSale)
    .child(S.list().title("Admin Ventas").items([]));

  const hiddenDocTypes = (listItem: any) => {
    return ![
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
      paisDeFabricacionSchema.name,
      formaDeLaMonturaSchema.name,
      materialDelMarcoSchema.name,
      tipoDeLenteSchema.name,
      materialDelLenteSchema.name,
      tipoDeMovimientoSchema.name,
      materialesDelPulsoSchema.name,
    ].includes(listItem.getId());
  };

  return S.list()
    .title("Contenido")
    .items([
      pages(S),
      S.divider(),
      productos(S),
      S.divider(),
      siteSettingsListItem,
      S.divider(),
      adminVentas,
      S.divider(),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ]);
};
