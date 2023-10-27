import ColombianPrice from "@/sanity/components/ColombianPrice";
import { SlugParent, defineArrayMember, defineField } from "sanity";
import { imageObjectSchema } from "../image";
import sanityClient from "@/sanity/sanityClient";
import { removeSpanishAccents } from "@/utils/helpers";

export const generoSchema = defineField({
  name: "genero",
  title: "Género",
  type: "string",
  validation: (Rule) => Rule.required(),
  options: {
    list: ["mujer", "hombre", "unisex"],
  },
});
export const detallesLujoSchema = defineField({
  name: "detalles",
  title: "Detalles",
  type: "object",
  group: "detalles",

  fields: [
    defineField({
      name: "usarDetalles",
      title: "Usar detalles?",
      type: "boolean",
    }),
    defineField({
      name: "contenido",
      title: "Contenido",
      type: "object",
      fields: [
        defineField({
          name: "texto",
          title: "Texto",
          type: "text",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "imagen",
          title: "Imagen",
          type: "object",
          validation: (Rule) => Rule.required(),
          fields: [imageObjectSchema],
        }),
      ],
      hidden: ({ parent }) => !parent?.usarDetalles,
    }),
  ],
});
export const monturaDetallesSchema = defineField({
  name: "monturaDetalles",
  title: "Detalles",
  type: "object",
  group: "detalles",

  fields: [
    defineField({
      name: "usarDetalles",
      title: "Usar detalles?",
      type: "boolean",
    }),
    defineField({
      name: "contenido",
      title: "Contenido",
      type: "object",
      fields: [
        defineField({
          name: "texto",
          title: "Texto",
          type: "text",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "imagen",
          title: "Imagen",
          type: "object",
          validation: (Rule) => Rule.required(),
          fields: [imageObjectSchema],
        }),
      ],
      hidden: ({ parent }) => !parent?.usarDetalles,
    }),
  ],
});

export const resenaSchema = defineField({
  name: "resena",
  title: "Reseña",
  type: "object",
  group: "detalles",
  fields: [
    // videoSchema,
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

export const etiquetaSchema = defineField({
  name: "etiqueta",
  title: "Etiqueta",
  type: "string",
  options: {
    list: ["nuevo", "mas vendido", "ultimas unidades"],
  },
});

export const inspiracionSchema = defineField({
  name: "inspiracion",
  title: "Inspiración",
  type: "object",
  group: "detalles",
  fields: [
    defineField({
      name: "usarInspiracion",
      title: "Usar inspiración?",
      type: "boolean",
    }),
    defineField({
      name: "contenido",
      title: "Contenido",
      type: "object",
      fields: [
        defineField({
          name: "resena",
          title: "Reseña",
          type: "text",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "imagen",
          title: "Imagen",
          type: "object",
          validation: (Rule) => Rule.required(),
          fields: [imageObjectSchema],
        }),
      ],
      hidden: ({ parent }) => !parent?.usarInspiracion,
    }),
  ],
});

export const precioSchema = defineField({
  name: "precio",
  title: "Precio",
  type: "string",
  validation: (Rule) => Rule.required(),
  components: { input: ColombianPrice },
});

export const mostrarCreditoSchema = defineField({
  name: "mostrarCredito",
  title: "Mostrar crédito",
  type: "boolean",
  initialValue: true,
});
export const coleccionesDeMarcaRefSchema = defineField({
  name: "coleccionDeMarca",
  title: "Colección De Marca",
  type: "reference",
  to: [{ type: "coleccionesDeMarca" }],
  hidden: ({ document }) => !document?.marca,
});

export const precioConDescuentoSchema = defineField({
  name: "precioConDescuento",
  title: "Precio con descuento",
  type: "string",
  components: { input: ColombianPrice },
});

export const garantiaSchema = defineField({
  name: "garantia",
  title: "Garantía",
  type: "object",
  group: "detalles",
  validation: (Rule) => Rule.required(),
  fields: [
    defineField({
      name: "meses",
      title: "Meses",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descripcion",
      title: "Descripción de la garantía",
      type: "text",
    }),
  ],
});

// export const slugSchema = defineField({
//   name: "slug",
//   title: "Link del producto",
//   type: "slug",
//   group: "general",
//   validation: (Rule) => Rule.required(),
//   options: {
//     source: "modelo",
//     maxLength: 200,
//     slugify: (input) => {
//       return input.toLowerCase().replace(/\s+/g, "-").slice(0, 200);
//     },
//   },
// });

type CustomSlugParent = SlugParent & { 
  marca?: { _ref: string };
  modelo?: string;
  titulo?: string;
  _id?: string;
  _type?: string;
};
export const slugSchema = defineField({
  name: "slug",
  title: "Link del producto",
  type: "slug",
  group: "general",
  validation: (Rule) => Rule.required(),
  options: {
    source: async (document: CustomSlugParent, options) => {
      if (document.marca) {
        if (document.modelo) {
          return `${document.modelo}`;
        }
        if (document.titulo) {
          return `${document.titulo}`;
        }
      }
      return "sin-marca";
    },
    maxLength: 200,
    slugify: async (input, _, context) => {
      const title = input
      const client = context.getClient({ apiVersion: "2021-03-25" });
      const { parent } = context as {parent: CustomSlugParent};
      if (parent.marca && parent._id && parent._type) {
        const marca = await client.fetch(
          `*[_id == "${parent.marca?._ref}"][0]{titulo}`
        );

        const id = parent._id
        const slug = `/${parent._type}/${removeSpanishAccents(marca.titulo)}/${title}/${id}`;
        return slug.toLowerCase().replace(/\s+/g, "-").slice(0, 200).replace("drafts.", "");
      }
      return "acaba de llenar los datos para llenar este campo automaticamente"
    },
  },
});
