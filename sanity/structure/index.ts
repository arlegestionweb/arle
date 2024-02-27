import { siteSettings } from "../schemas/siteSettings";
import { type StructureBuilder } from "sanity/desk";
import { MdPointOfSale } from "react-icons/md";
import productos from "./productos";
import pages from "./pages";
import { hiddenDocTypes } from "./hiddenDocTypes";

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

  return S.list()
    .title("Contenido")
    .items([
      pages(S),
      S.divider(),
      productos(S),
      S.divider(),
      siteSettingsListItem,
      // S.divider(),
      // adminVentas,
      S.divider(),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ]);
};
