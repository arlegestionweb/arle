import { BookIcon } from "@sanity/icons";
import { type StructureBuilder } from "sanity/desk";
import { homeSchema } from "../schemas/pages/homeSchema";
import { listingSchema } from "../schemas/pages/listingSchema";
import { BsCollection } from "react-icons/bs";
import { sobreNosotrosSchema } from "../schemas/pages/sobreNosotros";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { preguntasFrecuentesSchema } from "../schemas/pages/preguntasFrecuentesSchema";
import { FaQuestion } from "react-icons/fa";

export default (S: StructureBuilder) => {
  const homePageListItem = S.listItem()
    .title(homeSchema.title || "")
    .icon(homeSchema.icon)
    .child(
      S.editor()
        .id(homeSchema.name)
        .schemaType(homeSchema.name)
        .documentId(homeSchema.name)
        .title(homeSchema.title || "")
    );
  const listingListItem = S.listItem()
    .title(listingSchema.title || "")
    .icon(BsCollection)
    .child(
      S.editor()
        .title("Listings")
        .id(listingSchema.name)
        .schemaType(listingSchema.name)
        .documentId(listingSchema.name)
    );
  const sobreNosotrosListItem = S.listItem()
    .title(sobreNosotrosSchema.title || "")
    .icon(BsFillPersonLinesFill)
    .child(
      S.editor()
        .id(sobreNosotrosSchema.name)
        .schemaType(sobreNosotrosSchema.name)
        .documentId(sobreNosotrosSchema.name)
    );
  const preguntasFrecuentesListItem = S.listItem()
    .title(preguntasFrecuentesSchema.title || "")
    .icon(FaQuestion)
    .child(
      S.editor()
        .id(preguntasFrecuentesSchema.name)
        .schemaType(preguntasFrecuentesSchema.name)
        .documentId(preguntasFrecuentesSchema.name)
    );
  const pages = S.listItem()
    .title("Páginas")
    .icon(BookIcon)
    .child(
      S.list()
        .title("Páginas")
        .items([
          homePageListItem,
          S.divider(),
          listingListItem,
          S.divider(),
          sobreNosotrosListItem,
          S.divider(),
          preguntasFrecuentesListItem,
          S.divider(),
        ])
    );

  return pages;
};
