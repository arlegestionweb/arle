import { defineArrayMember, defineField } from "sanity";
import {
  etiquetaSchema,
  generoSchema,
  precioConDescuentoSchema,
  precioSchema,
} from "./generales";
import { imageArrayForProducts } from "../image";

export const resistenciaAlAguaSchema = defineField({
  name: "resistenciaAlAgua",
  title: "Resistencia al agua",
  description: "Incluir valor y unidades (bar o m)",
  type: "string",
  validation: (Rule) => Rule.required(),
});

export const tipoDeMovimientoRefSchema = defineField({
  name: "tipoDeMovimiento",
  title: "Tipo de movimiento",
  type: "reference",
  to: [{ type: "tipoDeMovimiento" }],
  validation: (Rule) => Rule.required(),
});

const varianteDeRelojes = defineField({
  name: "variante",
  title: "Variante",
  type: "object",
  // icon: CgAppleWatch,
  fields: [
    defineField({
      name: "colorCaja",
      title: "Color de la Caja",
      type: "reference",
      // @ts-ignore
      to: [{ type: "colores" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "colorTablero",
      title: "Color del Tablero",
      type: "reference",
      // @ts-ignore
      to: [{ type: "colores" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "colorPulso",
      title: "Color del Pulso",
      type: "reference",
      // @ts-ignore
      to: [{ type: "colores" }],
      validation: (Rule) => Rule.required(),
    }),
    precioSchema,
    precioConDescuentoSchema,
    etiquetaSchema,
    defineField({
      name: "codigoDeReferencia",
      title: "Código de referencia",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mostrarUnidadesDisponibles",
      title: "Mostrar unidades disponibles",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "unidadesDisponibles",
      title: "Unidades disponibles",
      type: "number",
      validation: (Rule) =>
        Rule.required()
          .min(0)
          .error("Unidades disponibles no pueden ser menos de 0"),
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
        title: `Pulso ${title}`,
        subtitle: `$ ${subtitle}`,
        media: media[0],
      };
    },
  },
});

export const movimientoObjSchema = defineField({
  name: "movimiento",
  title: "Movimiento",
  type: "object",
  group: "detalles",
  validation: (Rule) => Rule.required(),
  fields: [
    defineField({
      name: "usarMovimiento",
      title: "Usar movimiento?",
      type: "boolean",
    }),
    tipoDeMovimientoRefSchema,
    defineField({
      name: "contenido",
      title: "Contenido",
      type: "object",
      // @ts-ignore
      fields: [
        defineField({
          name: "descripcion",
          title: "Descripción",
          type: "text",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "imagen",
          title: "Imagen",
          type: "imagenObject",
          validation: (Rule) => Rule.required(),
        }),
      ],
      hidden: ({ parent }) => !parent?.usarMovimiento,
    }),
  ],
});

export const variantesDeRelojesSchema = defineField({
  name: "variantes",
  title: "Variantes",
  type: "array",
  group: "variantes",
  validation: (Rule) =>
    Rule.custom((variantes) => {
      if (!variantes) return "Debe haber al menos una variante";
      if (variantes.length === 0) {
        return "Debe haber al menos una variante";
      }
      return true;
    }),
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
      // @ts-ignore
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

export const pulsoSchemaRef = defineField({
  name: "material",
  title: "Material del Pulso",
  type: "reference",
  to: [{ type: "materialDelPulso" }],
  validation: (Rule) => Rule.required(),
});


export const especificacionesRelojesLujoSchema = defineField({
  name: "especificaciones",
  title: "Especificaciones",
  type: "object",
  group: "detalles",
  fields: [
    defineField({
      name: "resistenciaAlAgua",
      title: "Resistencia al agua",
      type: "string",
    }),
    funcionesSchema,
    pulsoSchemaRef,
    defineField({
      name: "tipoDeCierre",
      title: "Tipo de cierre",
      type: "reference",
      // @ts-ignore
      to: [{ type: "tipoDeCierre"}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tipoDeReloj",
      title: "Tipo de Reloj",
      type: "reference",
      // @ts-ignore
      to: [{ type: "tipoDeReloj" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "estiloDeReloj",
      title: "Estilo de Reloj",
      type: "reference",
      // @ts-ignore
      to: [{ type: "estiloDeReloj" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const cajaSchema = defineField({
  name: "caja",
  title: "Caja",
  type: "object",
  validation: (Rule) => Rule.required(),
  fields: [
    defineField({
      name: "cristal",
      title: "Cristal",
      type: "reference",
      // @ts-ignore
      to: [{ type: "cristal" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "diametro",
      title: "Diámetro de la Caja (mm)",
      description: "Campo numérico en milímetros",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "material",
      title: "Material de la Caja",
      type: "reference",
      // @ts-ignore
      to: [{ type: "materialDeCaja" }],
      validation: (Rule) => Rule.required(),
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
      // @ts-ignore
      to: [{ type: "tipoDeReloj" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "estiloDeReloj",
      title: "Estilo de Reloj",
      type: "reference",
      // @ts-ignore
      to: [{ type: "estiloDeReloj" }],
      validation: (Rule) => Rule.required(),
    }),
    tipoDeMovimientoRefSchema,
    pulsoSchemaRef,
    defineField({
      name: "tipoDeCierre",
      title: "Tipo de cierre",
      type: "reference",
      // @ts-ignore
      to: [{ type: "tipoDeCierre"}],
      validation: (Rule) => Rule.required(),
    }),
    cajaSchema,
    funcionesSchema,
  ],
});
