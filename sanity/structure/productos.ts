import { perfumeLujoSchema } from "./../schemas/products/perfumes/lujo";
import { TbPerfume } from "react-icons/tb";
import { type StructureBuilder } from "sanity/desk";
import { perfumePremiumSchema } from "../schemas/products/perfumes/premium";
import { GiDelicatePerfume, GiPocketWatch } from "react-icons/gi";
import { relojesSchema } from "../schemas/products/relojes";
import { PiSunglassesFill, PiSunglassesBold } from "react-icons/pi";
import { marcasSchema } from "../schemas/documents/marcas";
import {
  MdOutlineBrandingWatermark,
  MdOutlineLocalOffer,
} from "react-icons/md";
import { descuentosSchema } from "../schemas/documents/descuentos";
import { coleccionesSchema } from "../schemas/documents/colecciones";
import { BsCollection, BsSunglasses } from "react-icons/bs";
import { gafasPremiumSchema } from "../schemas/products/gafas/premium";
import { gafasLujoSchema } from "../schemas/products/gafas/lujo";

export default ({ listItem, divider, list, editor }: StructureBuilder) => {
  const premiumListItem = listItem()
    .title(perfumePremiumSchema.title || "")
    .icon(TbPerfume)
    .child(
      editor()
        .id(perfumePremiumSchema.name)
        .schemaType(perfumePremiumSchema.name)
        .documentId(perfumePremiumSchema.name)
    );
  const lujoListItem = listItem()
    .title(perfumeLujoSchema.title || "")
    .icon(GiDelicatePerfume)
    .child(
      editor()
        .id(perfumeLujoSchema.name)
        .schemaType(perfumeLujoSchema.name)
        .documentId(perfumeLujoSchema.name)
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

  const gafaPremiumListItem = listItem()
    .title(gafasPremiumSchema.title || "")
    .icon(BsSunglasses)
    .child(
      editor()
        .id(gafasPremiumSchema.name)
        .schemaType(gafasPremiumSchema.name)
        .documentId(gafasPremiumSchema.name)
    );
  const gafaLujoListItem = listItem()
    .title(gafasLujoSchema.title || "")
    .icon(PiSunglassesBold)
    .child(
      editor()
        .id(gafasLujoSchema.name)
        .schemaType(gafasLujoSchema.name)
        .documentId(gafasLujoSchema.name)
    );
  const gafasListItem = listItem()
    .title("Gafas")
    .icon(PiSunglassesFill)
    .child(
      list().title("Gafas").items([gafaPremiumListItem, gafaLujoListItem])
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
