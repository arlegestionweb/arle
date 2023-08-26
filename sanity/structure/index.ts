import { siteSettings } from "../schemas/siteSettings";
import { type StructureBuilder } from "sanity/desk";
import { BookIcon } from "@sanity/icons";
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

  const homePageListItem = S.listItem()
    .title(homeSchema.title || "")
    .icon(homeSchema.icon)
    .child(
      S.editor()
        .id(homeSchema.name)
        .schemaType(homeSchema.name)
        .documentId(homeSchema.name)
    );

  const pages = S.listItem()
    .title("Pages")
    .icon(BookIcon)
    .child(S.list().title("Pages").items([homePageListItem]));

  const adminVentas = S.listItem()
    .title("Admin Ventas")
    .icon(MdPointOfSale)
    .child(S.list().title("Admin Ventas").items([homePageListItem]));

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
    ].includes(listItem.getId());
  };

  return S.list()
    .title("Content")
    .items([
      pages,
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
