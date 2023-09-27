import ColombianPrice from "@/sanity/components/ColombianPrice";
import { defineArrayMember, defineField } from "sanity";
import { etiquetaSchema, generoSchema, precioConDescuentoSchema, precioSchema } from "./generales";
import { imageArrayForProducts } from "../image";
import { videoSchema } from "../video";


export const resistenciaAlAguaSchema = defineField({
  name: "resistenciaAlAgua",
  title: "Resistencia al agua",
  description: "Incluir valor y unidades (bar o m)",
  type: "string",
});

export const tipoDeMovimientoSchema = defineField({
  name: "tipoDeMovimiento",
  title: "Tipo de movimiento",
  type: "string",
});

export const varianteDeRelojes = defineField({
  name: "variante",
  title: "Variante",
  type: "object",
  // icon: CgAppleWatch,
  fields: [
    defineField({
      name: "colorCaja",
      title: "Color de la Caja",
      type: "reference",
      to: [{ type: "colores" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "colorTablero",
      title: "Color del Tablero",
      type: "reference",
      to: [{ type: "colores" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "colorPulso",
      title: "Color del Pulso",
      type: "reference",
      to: [{ type: "colores" }],
      validation: (Rule) => Rule.required(),
    }),
    precioSchema,
    precioConDescuentoSchema,
    etiquetaSchema,
    defineField({
      name: "codigo",
      title: "Código",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "unidadesDisponibles",
      title: "Unidades disponibles",
      type: "number",
      initialValue: 0,
    }),
    imageArrayForProducts,
  ],
  preview: {
    select: {
      title: "colorPulso.nombre",
      subtitle: "precio",
      media: "imagenes",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      if (!title || !subtitle || !media) {
        return {
          title: "Sin título",
          subtitle: "Sin precio",
        };
      }
      return {
        title,
        subtitle: `$ ${subtitle}`,
        media: media[0],
      };
    },
  },
});

export const variantesDeRelojesSchema = defineField({
  name: "variantes",
  title: "Variantes",
  type: "array",
  group: "general",
  // validation
  of: [varianteDeRelojes],
});

type RefType = {
  _key: string;
  _ref: string;
  _type: string;
};
export const funcionesSchema = defineField({
  name: "funciones",
  title: "Funciones",
  type: "array",
  of: [
    defineArrayMember({
      name: "funcionDeReloj",
      title: "Función",
      type: "reference",
      to: [{ type: "funcionDeReloj" }],
    }),
  ],
  validation: (Rule) =>
    Rule.custom((references: RefType[] | undefined) => {
      if (!references) return true; // Allow undefined, null, or empty array

      // Get the IDs of the references
      const ids = references.map((ref) => ref._ref);
      // Check for duplicate IDs
      const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);

      // If there are duplicates, return an error message
      return duplicates.length === 0 ? true : "Cada función debe ser única";
    }),
});

export const resenaRelojesSchema = defineField({
  name: "resena",
  title: "Reseña",
  type: "object",
  group: "detalles",
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
  ],
});

export const pulsoSchema = defineField({
  // name: "pulso",
  // title: "Pulso",
  // type: "object",
  // fields: [
  //   defineField({
      name: "material",
      title: "Material del Pulso",
      type: "string",
    // }),
  // ],
});

export const cajaSchema = defineField({
  name: "caja",
  title: "Caja",
  type: "object",
  fields: [
    defineField({
      name: "cristal",
      title: "Cristal",
      type: "reference",
      to: [{ type: "cristal" }],
    }),
    defineField({
      name: "diametro",
      title: "Diámetro (mm)",
      description: "Campo numérico en milímetros",
      type: "number",
    }),
    defineField({
      name: "material",
      title: "Material",
      type: "reference",
      to: [{ type: "materialDeCaja" }],
    }),
  ],
});

export const detallesRelojSchema = defineField({
  name: "detallesReloj",
  title: "Detalles del reloj",
  type: "object",
  group: "detalles",
  fields: [
    resistenciaAlAguaSchema,
    generoSchema,
    defineField({
      name: "tipoDeReloj",
      title: "Tipo de Reloj",
      type: "reference",
      to: [{ type: "tipoDeReloj" }],
    }),
    defineField({
      name: "estiloDeReloj",
      title: "Estilo de Reloj",
      type: "reference",
      to: [{ type: "estiloDeReloj" }],
    }),
    tipoDeMovimientoSchema,
    pulsoSchema,
    cajaSchema,
    funcionesSchema,
  ],
});


