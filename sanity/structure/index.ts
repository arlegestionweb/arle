import { siteSettings } from "../schemas/siteSettings";
import { type StructureBuilder } from "sanity/desk";
import { homeSchema } from "../schemas/pages/homeSchema";
import { MdPointOfSale } from "react-icons/md";
import productos from "./productos";
import { premiumSchema } from "../schemas/products/perfumes/premium";
import { lujoSchema } from "../schemas/products/perfumes/lujo";
import { relojesSchema } from "../schemas/products/relojes";
import { gafasSchema } from "../schemas/products/gafas";
import { marcasSchema } from "../schemas/documents/marcas";
import { coleccionesSchema } from "../schemas/documents/colecciones";
import { descuentosSchema } from "../schemas/documents/descuentos";
import pages from "./pages";
import { listingSchema } from "../schemas/pages/listingSchema";
import { sobreNosotrosSchema } from "../schemas/pages/sobreNosotros";
import { preguntasFrecuentesSchema } from "../schemas/pages/preguntasFrecuentesSchema";

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
      premiumSchema.name,
      lujoSchema.name,
      relojesSchema.name,
      gafasSchema.name,
      marcasSchema.name,
      coleccionesSchema.name,
      descuentosSchema.name,
      listingSchema.name,
      sobreNosotrosSchema.name,
      preguntasFrecuentesSchema.name,
    ].includes(listItem.getId());
  };

  return S.list()
    .title("Content")
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
