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
  colorSchema,
  paisDeOrigenSchema,
} from "../schemas/documents/documentosVarios";
import { cristalSchema, estiloDeRelojSchema, funcionDelRelojSchema, materialesDeCajaSchema, materialesDelPulsoSchema, tipoDeMovimientoSchema, tipoDeRelojSchema } from "../schemas/products/relojes";
import { concentracionSchema, familiasOlfativasSchema, ingredientesSchema, notasOlfativasSchema } from "../schemas/products/perfumes";
import { estiloDeGafaSchema, formaDeLaMonturaSchema, materialDeLaVarillaSchema, materialDelLenteSchema, materialDelMarcoSchema, tipoDeGafaSchema, tipoDeLenteSchema } from "../schemas/products/gafas";
import { codigoDeDescuentosSchema } from "../schemas/documents/codigosDeDescuento";
import { footerSchema } from "../schemas/footer";

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

    const footer = S.listItem()
    .title(footerSchema.title || "")
    .icon(footerSchema.icon)
    .child(
      S.editor()
        .id(footerSchema.name)
        .schemaType(footerSchema.name)
        .documentId(footerSchema.name)
    );

  const hiddenDocTypes = (listItem: any) => {
    return ![
      siteSettings.name,
      footerSchema.name,
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
      codigoDeDescuentosSchema.name,
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
      footer,
      S.divider(),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ]);
};
