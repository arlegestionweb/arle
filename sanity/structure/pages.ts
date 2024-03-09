import { BookIcon } from "@sanity/icons";
import { type StructureBuilder } from "sanity/structure";
import { homeSchema } from "../schemas/pages/homeSchema";
import { listingSchema } from "../schemas/pages/listingSchema";
import { BsCollection } from "react-icons/bs";
import { sobreNosotrosSchema } from "../schemas/pages/sobreNosotrosSchema";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { preguntasFrecuentesSchema } from "../schemas/pages/preguntasFrecuentesSchema";
import { FaNetworkWired, FaQuestion } from "react-icons/fa";
import { nuestrasSedesSchema } from "../schemas/pages/nuestrasSedesSchema";
import { MdLocationPin } from "react-icons/md";
import { trabajaConNosotrosSchema } from "../schemas/pages/trabajaConNosotrosSchema";

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
  const nuenstrasSedesListItem = S.listItem()
    .title(nuestrasSedesSchema.title || "")
    .icon(MdLocationPin)
    .child(
      S.editor()
        .id(nuestrasSedesSchema.name)
        .schemaType(nuestrasSedesSchema.name)
        .documentId(nuestrasSedesSchema.name)
    );
  const trabajaConNosotrosListItem = S.listItem()
    .title(trabajaConNosotrosSchema.title || "")
    .icon(FaNetworkWired)
    .child(
      S.editor()
        .id(trabajaConNosotrosSchema.name)
        .schemaType(trabajaConNosotrosSchema.name)
        .documentId(trabajaConNosotrosSchema.name)
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
          nuenstrasSedesListItem,
          S.divider(),
          trabajaConNosotrosListItem,
          S.divider(),
          preguntasFrecuentesListItem,
          S.divider(),
        ])
    );

  return pages;
};
