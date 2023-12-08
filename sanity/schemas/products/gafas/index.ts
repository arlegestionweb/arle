import { defineField, defineType } from "sanity";
import { IoMdGlasses } from "react-icons/io";
import { GiProtectionGlasses, GiSpectacleLenses } from "react-icons/gi";
import { PiEyeglasses, PiSunglassesThin } from "react-icons/pi";
import { LiaGlassesSolid } from "react-icons/lia";
import { MdOutlineLens } from "react-icons/md";

export const tipoDeGafaSchema = defineType({
  name: "tipoDeGafa",
  title: "Tipo de Gafa",
  type: "document",
  icon: IoMdGlasses,
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const formaDeLaMonturaSchema = defineType({
  name: "formaDeLaMontura",
  title: "Forma de la Montura",
  type: "document",
  icon: PiEyeglasses,
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const materialDelMarcoSchema = defineType({
  name: "materialDelMarco",
  title: "Material del Marco",
  type: "document",
  icon: LiaGlassesSolid,
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
export const materialDeLaVarillaSchema = defineType({
  name: "materialDeLaVarilla",
  title: "Material de la Varilla",
  type: "document",
  icon: PiSunglassesThin,
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
export const materialDelLenteSchema = defineType({
  name: "materialDelLente",
  title: "Material del Lente",
  type: "document",
  icon: GiSpectacleLenses,
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
export const tipoDeLenteSchema = defineType({
  name: "tipoDeLente",
  title: "Tipo de Lente",
  type: "document",
  icon: MdOutlineLens,
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const estiloDeGafaSchema = defineType({
  name: "estiloDeGafa",
  title: "Estilo de Gafa",
  type: "document",
  icon: GiProtectionGlasses,
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});