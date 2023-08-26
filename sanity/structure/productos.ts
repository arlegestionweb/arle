import { lujoSchema } from "./../schemas/products/perfumes/lujo";
import { TbPerfume } from "react-icons/tb";
import { type StructureBuilder } from "sanity/desk";
import { premiumSchema } from "../schemas/products/perfumes/premium";
import { GiDelicatePerfume, GiPocketWatch } from "react-icons/gi";
import { relojesSchema } from "../schemas/products/relojes";
import { gafasSchema } from "../schemas/products/gafas";
import { PiSunglassesFill } from "react-icons/pi";
import { marcasSchema } from "../schemas/documents/marcas";
import {
  MdOutlineBrandingWatermark,
  MdOutlineLocalOffer,
} from "react-icons/md";
import { descuentosSchema } from "../schemas/documents/descuentos";
import { coleccionesSchema } from "../schemas/documents/colecciones";
import { BsCollection } from "react-icons/bs";

export default (S: StructureBuilder) => {
  const premiumListItem = S.listItem()
    .title(premiumSchema.title || "")
    .icon(TbPerfume)
    .child(
      S.editor()
        .id(premiumSchema.name)
        .schemaType(premiumSchema.name)
        .documentId(premiumSchema.name)
    );
  const lujoListItem = S.listItem()
    .title(lujoSchema.title || "")
    .icon(GiDelicatePerfume)
    .child(
      S.editor()
        .id(lujoSchema.name)
        .schemaType(lujoSchema.name)
        .documentId(lujoSchema.name)
    );
  const perfumes = S.listItem()
    .title("Perfumes")
    .icon(TbPerfume)
    .child(S.list().title("Perfumes").items([premiumListItem, lujoListItem]));

  const relojesListItem = S.listItem()
    .title(relojesSchema.title || "")
    .icon(GiPocketWatch)
    .child(
      S.editor()
        .id(relojesSchema.name)
        .schemaType(relojesSchema.name)
        .documentId(relojesSchema.name)
    );
  const gafasListItem = S.listItem()
    .title(gafasSchema.title || "")
    .icon(PiSunglassesFill)
    .child(
      S.editor()
        .id(gafasSchema.name)
        .schemaType(gafasSchema.name)
        .documentId(gafasSchema.name)
    );
  const marcasListItem = S.listItem()
    .title(marcasSchema.title || "")
    .icon(MdOutlineBrandingWatermark)
    .child(
      S.editor()
        .id(marcasSchema.name)
        .schemaType(marcasSchema.name)
        .documentId(marcasSchema.name)
    );
  const descuentosListItem = S.listItem()
    .title(descuentosSchema.title || "")
    .icon(MdOutlineLocalOffer)
    .child(
      S.editor()
        .id(descuentosSchema.name)
        .schemaType(descuentosSchema.name)
        .documentId(descuentosSchema.name)
    );
  const coleccionesListItem = S.listItem()
    .title(coleccionesSchema.title || "")
    .icon(BsCollection)
    .child(
      S.editor()
        .id(coleccionesSchema.name)
        .schemaType(coleccionesSchema.name)
        .documentId(coleccionesSchema.name)
    );

  return S.listItem()
    .title("Productos")
    .icon(TbPerfume)
    .child(
      S.list()
        .title("Productos")
        .items([
          perfumes,
          relojesListItem,
          gafasListItem,
          marcasListItem,
          descuentosListItem,
          coleccionesListItem,
        ])
    );
};
