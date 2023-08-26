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

export default ({listItem, divider, list, editor}: StructureBuilder) => {
  const premiumListItem = listItem()
    .title(premiumSchema.title || "")
    .icon(TbPerfume)
    .child(
      editor()
        .id(premiumSchema.name)
        .schemaType(premiumSchema.name)
        .documentId(premiumSchema.name)
    );
  const lujoListItem = listItem()
    .title(lujoSchema.title || "")
    .icon(GiDelicatePerfume)
    .child(
      editor()
        .id(lujoSchema.name)
        .schemaType(lujoSchema.name)
        .documentId(lujoSchema.name)
    );
  const perfumes = listItem()
    .title("Perfumes")
    .icon(TbPerfume)
    .child(list().title("Perfumes").items([premiumListItem, lujoListItem]));

  const relojesListItem = listItem()
    .title(relojesSchema.title || "")
    .icon(GiPocketWatch)
    .child(
      editor()
        .id(relojesSchema.name)
        .schemaType(relojesSchema.name)
        .documentId(relojesSchema.name)
    );
  const gafasListItem = listItem()
    .title(gafasSchema.title || "")
    .icon(PiSunglassesFill)
    .child(
      editor()
        .id(gafasSchema.name)
        .schemaType(gafasSchema.name)
        .documentId(gafasSchema.name)
    );
  const marcasListItem = listItem()
    .title(marcasSchema.title || "")
    .icon(MdOutlineBrandingWatermark)
    .child(
      editor()
        .id(marcasSchema.name)
        .schemaType(marcasSchema.name)
        .documentId(marcasSchema.name)
    );
  const descuentosListItem = listItem()
    .title(descuentosSchema.title || "")
    .icon(MdOutlineLocalOffer)
    .child(
      editor()
        .id(descuentosSchema.name)
        .schemaType(descuentosSchema.name)
        .documentId(descuentosSchema.name)
    );
  const coleccionesListItem = listItem()
    .title(coleccionesSchema.title || "")
    .icon(BsCollection)
    .child(
      editor()
        .id(coleccionesSchema.name)
        .schemaType(coleccionesSchema.name)
        .documentId(coleccionesSchema.name)
    );

  return listItem()
    .title("Productos")
    .icon(TbPerfume)
    .child(
      list()
        .title("Productos")
        .items([
          perfumes,
          divider(),
          relojesListItem,
          divider(),
          gafasListItem,
          divider(),
          marcasListItem,
          divider(),
          descuentosListItem,
          divider(),
          coleccionesListItem,
          divider(),
        ])
    );
};
