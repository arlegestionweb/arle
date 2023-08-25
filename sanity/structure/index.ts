import { siteSettings } from "../schemas/siteSettings";
import { type StructureBuilder } from "sanity/desk";
import { BookIcon } from "@sanity/icons";
import { homeSchema } from "../schemas/pages/homeSchema";

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
    .child(S.list().title("Pages").items([
      homePageListItem
    ]));

  const hiddenDocTypes = (listItem: any) => {
    return ![siteSettings.name, homeSchema.name].includes(listItem.getId());
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
