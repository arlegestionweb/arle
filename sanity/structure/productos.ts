import { perfumeLujoSchema } from "./../schemas/products/perfumes/lujo";
import { TbPerfume } from "react-icons/tb";
import { type StructureBuilder } from "sanity/desk";
import { perfumePremiumSchema } from "../schemas/products/perfumes/premium";
import { GiDelicatePerfume, GiPocketWatch } from "react-icons/gi";
import { PiSunglassesFill, PiSunglassesBold } from "react-icons/pi";
import { marcasSchema } from "../schemas/documents/marcas";
import {
  MdOutlineBrandingWatermark,
  MdOutlineLocalOffer,
  MdOutlineRecommend
} from "react-icons/md";
import { descuentosSchema } from "../schemas/documents/descuentos";
import { coleccionesSchema } from "../schemas/documents/colecciones";
import { BsCollection, BsSunglasses } from "react-icons/bs";
import { gafasPremiumSchema } from "../schemas/products/gafas/premium";
import { gafasLujoSchema } from "../schemas/products/gafas/lujo";
import { relojesPremiumSchema } from "../schemas/products/relojes/premium";
import { relojesLujoSchema } from "../schemas/products/relojes/lujo";
import {PiWatchBold} from 'react-icons/pi';
import { recomendadosSchema } from "../schemas/documents/recomendados";


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

  const relojesPremiumListItem = listItem()
    .title(relojesPremiumSchema.title || "")
    .icon(PiWatchBold)
    .child(
      editor()
        .id(relojesPremiumSchema.name)
        .schemaType(relojesPremiumSchema.name)
        .documentId(relojesPremiumSchema.name)
    );
  const relojesLujoListItem = listItem()
    .title(relojesLujoSchema.title || "")
    .icon(GiPocketWatch)
    .child(
      editor()
        .id(relojesLujoSchema.name)
        .schemaType(relojesLujoSchema.name)
        .documentId(relojesLujoSchema.name)
    ); 

  const relojesListItem = listItem()
    .title("Relojes")
    .icon(GiPocketWatch)
    .child(list().title("Relojes").items([relojesPremiumListItem, relojesLujoListItem]));

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
  const recomendadosListItem = listItem()
    .title(recomendadosSchema.title || "")
    .icon(MdOutlineRecommend)
    .child(
      editor()
        .id(recomendadosSchema.name)
        .schemaType(recomendadosSchema.name)
        .documentId(recomendadosSchema.name)
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
          recomendadosListItem,
          divider(),
        ])
    );
};
