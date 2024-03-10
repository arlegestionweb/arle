import { perfumeLujoSchema } from "../schemas/products/perfumes/lujo";
import { TbPerfume } from "react-icons/tb";
import { type StructureBuilder } from "sanity/structure";
import { perfumePremiumSchema } from "../schemas/products/perfumes/premium";
import { GiDelicatePerfume, GiPocketWatch } from "react-icons/gi";
import { PiSunglassesFill, PiSunglassesBold } from "react-icons/pi";
import { marcasSchema } from "../schemas/documents/marcas";
import {
  MdOutlineBrandingWatermark,
  MdOutlineLocalOffer,
  MdOutlineRecommend,
} from "react-icons/md";
import { descuentosSchema } from "../schemas/documents/descuentos";
import { coleccionesSchema } from "../schemas/documents/colecciones";
import { BsCollection, BsSunglasses } from "react-icons/bs";
import { gafasPremiumSchema } from "../schemas/products/gafas/premium";
import { gafasLujoSchema } from "../schemas/products/gafas/lujo";
import { relojesPremiumSchema } from "../schemas/products/relojes/premium";
import { relojesLujoSchema } from "../schemas/products/relojes/lujo";
import { PiWatchBold } from "react-icons/pi";
import { recomendadosSchema } from "../schemas/documents/recomendados";
import { codigoDeDescuentosSchema } from "../schemas/documents/codigosDeDescuento";
import { BiSolidDiscount } from "react-icons/bi";

export default ({
  listItem,
  divider,
  list,
  editor,
  documentTypeList,
}: StructureBuilder) => {
  const premiumListItem = listItem()
    .title(perfumePremiumSchema.title || "")
    .icon(TbPerfume)
    .child(
      documentTypeList(perfumePremiumSchema.name).title("Perfumes Premium")
    );
  const lujoListItem = listItem()
    .title(perfumeLujoSchema.title || "")
    .icon(GiDelicatePerfume)
    .child(documentTypeList(perfumeLujoSchema.name).title("Perfumes de Lujo"));
  const perfumes = listItem()
    .title("Perfumes")
    .icon(TbPerfume)
    .child(list().title("Perfumes").items([premiumListItem, lujoListItem]));

  const relojesPremiumListItem = listItem()
    .title(relojesPremiumSchema.title || "")
    .icon(PiWatchBold)
    .child(
      documentTypeList(relojesPremiumSchema.name).title("Relojes Premium")
    );
  const relojesLujoListItem = listItem()
    .title(relojesLujoSchema.title || "")
    .icon(GiPocketWatch)
    .child(documentTypeList(relojesLujoSchema.name).title("Relojes de Lujo"));

  const relojesListItem = listItem()
    .title("Relojes")
    .icon(GiPocketWatch)
    .child(
      list()
        .title("Relojes")
        .items([relojesPremiumListItem, relojesLujoListItem])
    );

  const gafaPremiumListItem = listItem()
    .title(gafasPremiumSchema.title || "")
    .icon(BsSunglasses)
    .child(documentTypeList(gafasPremiumSchema.name).title("Gafas Premium"));
  const gafaLujoListItem = listItem()
    .title(gafasLujoSchema.title || "")
    .icon(PiSunglassesBold)
    .child(documentTypeList(gafasLujoSchema.name).title("Gafas de Lujo"));
    
  const gafasListItem = listItem()
    .title("Gafas")
    .icon(PiSunglassesFill)
    .child(
      list().title("Gafas").items([gafaPremiumListItem, gafaLujoListItem])
    );

  const marcasListItem = listItem()
    .title(marcasSchema.title || "")
    .icon(MdOutlineBrandingWatermark)
    .child(documentTypeList(marcasSchema.name).title("Marcas"));


  const descuentosListItem = listItem()
    .title(descuentosSchema.title || "")
    .icon(MdOutlineLocalOffer)
    .child(documentTypeList(descuentosSchema.name).title("Descuentos"));
  
    const codigoDeDescuentosListItem = listItem()
    .title(codigoDeDescuentosSchema.title || "")
    .id(codigoDeDescuentosSchema.name)
    .icon(BiSolidDiscount)
    .title("Códigos de Descuentos")
    .child(documentTypeList(codigoDeDescuentosSchema.name));


    
  const coleccionesListItem = listItem()
    .title(coleccionesSchema.title || "")
    .icon(BsCollection)
    .child(documentTypeList(coleccionesSchema.name).title("Colecciones"));
  const recomendadosListItem = listItem()
    .title(recomendadosSchema.title || "")
    .icon(MdOutlineRecommend)
    .child(
      editor()
        .id(recomendadosSchema.name)
        .schemaType(recomendadosSchema.name)
        .documentId(recomendadosSchema.name)
        .title("Recomendados")
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
          codigoDeDescuentosListItem,
          divider(),
          coleccionesListItem,
          divider(),
          recomendadosListItem,
          divider(),
        ])
    );
};
