import { defineArrayMember } from "sanity";
import { defineField } from "sanity";
import { videoSchema } from "./video";

export const notasOlfativasSchema = defineField({
  name: "notasOlfativas",
  title: "Notas olfativas",
  type: "array",
  of: [
    defineArrayMember({
      name: "nota",
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

export const precioSchema = defineField({
  name: "precio",
  title: "Precio",
  type: "string",
});

export const generoSchema = defineField({
  name: "genero",
  title: "Género",
  type: "string",
});

export const monturaSchema = defineField({
  name: "montura",
  title: "Montura",
  type: "object",
  fields: [
    defineField({
      name: "forma",
      title: "Forma de la Montura",
      type: "string",
    }),
    defineField({
      name: "material",
      title: "Material del Marco",
      type: "string",
    }),
    defineField({
      name: "color",
      title: "Color del Marco",
      type: "string",
    }),
    defineField({
      name: "colorVarilla",
      title: "Color de la Varilla",
      type: "string",
    }),
  ],
});

export const lenteSchema = defineField({
  name: "lente",
  title: "Lente",
  type: "object",
  fields: [
    defineField({
      name: "lente",
      title: "Lente",
      type: "string",
    }),
    defineField({
      name: "color",
      title: "Color del Lente",
      type: "string",
    }),
    defineField({
      name: "material",
      title: "Material del Lente",
      type: "string",
    }),
    defineField({
      name: "tipo",
      title: "Tipo de Lente",
      type: "string",
    }),
  ],
});

export const resistenciaAlAguaSchema = defineField({
  name: "resistenciaAlAgua",
  title: "Resistencia al agua",
  type: "boolean",
});

export const cristalSchema = defineField({
  name: "cristal",
  title: "Cristal",
  type: "string",
});

export const tipoDeMovimientoSchema = defineField({
  name: "tipoDeMovimiento",
  title: "Tipo de movimiento",
  type: "string",
});



export const funcionesSchema = defineField({
  name: "funciones",
  title: "Funciones",
  type: "array",
  of: [
    defineArrayMember({
      name: "funcion",
      title: "Función",
      type: "object",
      fields: [
        defineField({
          name: "nombre",
          title: "Nombre",
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

export const resenaSchema = defineField({
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

export const garantiaSchema = defineField({
  name: "garantia",
  title: "Garantía",
  type: "string",
});

export const brazaleteSchema = defineField({
  name: "brazalete",
  title: "Brazalete",
  type: "object",
  fields: [
    defineField({
      name: "material",
      title: "Material",
      type: "string",
    }),
    defineField({
      name: "color",
      title: "Color",
      type: "string",
    }),
  ],
});

export const cajaSchema = defineField({
  name: "caja",
  title: "Caja",
  type: "object",
  fields: [
    defineField({
      name: "material",
      title: "Material",
      type: "string",
    }),
    defineField({
      name: "tamano",
      title: "Tamaño",
      type: "string",
    }),
    defineField({
      name: "color",
      title: "Color",
      type: "string",
    }),
  ],
});


export const detallesRelojSchema = defineField({
  name: "detallesReloj",
  title: "Detalles del reloj",
  type: "object",
  fields: [
    generoSchema,
    tipoDeMovimientoSchema,
    brazaleteSchema,
    cristalSchema,
    defineField({
      name: "diametro",
      title: "Diámetro",
      type: "string",
    }),
    defineField({
      name: "colorTablero",
      title: "Color del tablero",
      type: "string",
    }),
    cajaSchema,
  ],
})