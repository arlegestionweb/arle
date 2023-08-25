import { siteSettings } from "../schemas/siteSettings";
import { type StructureBuilder } from "sanity/desk";
import { BookIcon } from "@sanity/icons";

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


  const pages = S.listItem()
    .title("Pages")
    .icon(BookIcon)
    .child(S.list().title("Pages").items([
      
    ]));

  const hiddenDocTypes = (listItem: any) => {
    return ![siteSettings.name,].includes(listItem.getId());
  };

  return S.list()
    .title("Content")
    .items([
      siteSettingsListItem,
      S.divider(),
      pages,
      S.divider(),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ]);
};
