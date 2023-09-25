import { GiNoseSide } from "react-icons/gi";
import { defineArrayMember, defineField } from "sanity";
import { videoSchema } from "../video";
import ColombianPrice from "@/sanity/components/ColombianPrice";
import { etiquetaSchema } from "./generales";
import { TbPerfume } from "react-icons/tb";

export const notasOlfativasSchema = defineField({
  name: "notasOlfativas",
  title: "Notas olfativas",
  type: "array",
  of: [
    defineArrayMember({
      name: "nota",
      icon: GiNoseSide,
      title: "Nota",
      type: "object",
      fields: [
        defineField({
          name: "titulo",
          title: "Título",
          type: "string",
        }),
        defineField({
          name: "descripcion",
          title: "Descripción",
          type: "string",
        }),
      ],
    }),
  ],
});

export const resenaPerfumesSchema = defineField({
  name: "resena",
  title: "Reseña",
  type: "object",
  fields: [
    videoSchema,
    defineField({
      name: "inspiracion",
      title: "Inspiraicón, historia u otros",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
        }),
      ],
    }),
    defineField({
      name: "ingredientes",
      title: "Ingredientes",
      type: "array",
      of: [
        defineArrayMember({
          name: "ingrediente",
          title: "Ingrediente",
          type: "object",
          fields: [
            defineField({
              name: "titulo",
              title: "Título",
              type: "string",
            }),
          ],
        }),
      ],
    }),
  ],
});

const variantePerfumeSchema = defineField({
  name: "variante",
  title: "Variante",
  type: "object",
  icon: TbPerfume,
  fields: [
    defineField({
      name: "tamano",
      title: "Tamaño",
      description: "Campo numérico en milímetros",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "precio",
      title: "Precio",
      type: "string",
      validation: (Rule) => Rule.required(),
      components: {
        input: ColombianPrice,
      },
    }),
    defineField({
      name: "codigoDeReferencia",
      title: "Código de referencia",
      type: "string",
    }),
    defineField({
      name: "registroInvima",
      title: "Registro Invima",
      type: "string",
    }),
    defineField({
      name: "unidadesDisponibles",
      title: "Unidades disponibles",
      type: "number",
      initialValue: 0,
    }),
    etiquetaSchema,
  ],
  preview: {
    select: {
      title: "tamano",
      subtitle: "precio",
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title,
        subtitle: `$ ${subtitle}`,
      };
    },
  },
});

export const variantesDePerfumesSchema = defineField({
  name: "variantes",
  title: "Variantes",
  type: "array",
  group: "general",
  // validation
  of: [variantePerfumeSchema],
});
