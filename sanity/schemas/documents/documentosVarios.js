import {
  TbDeviceWatchCog,
  TbDeviceWatchQuestion,
  TbDeviceWatchStats2,
} from "react-icons/tb";
import ColorPreview from "../../components/ColorPreview"
import { defineField, defineType } from "sanity";
import { BsBookmarkStar } from "react-icons/bs";

export const funcionDelRelojSchema = defineType({
  name: "funcionDeReloj",
  title: "Función del Reloj",
  type: "document",
  icon: TbDeviceWatchCog,
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "text",
    }),
  ],
});

export const tipoDeRelojSchema = defineType({
  name: "tipoDeReloj",
  title: "Tipo de Reloj",
  type: "document",
  icon: TbDeviceWatchQuestion,
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "text",
    }),
  ],
});
export const estiloDeRelojSchema = defineType({
  name: "estiloDeReloj",
  title: "Estilo de Reloj",
  type: "document",
  icon: TbDeviceWatchStats2,
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "text",
    }),
  ],
});

export const cristalSchema = defineType({
  name: "cristal",
  title: "Cristal",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "text",
    }),
  ],
});


export const tipoDeGafaSchema = defineType({
  name: "tipoDeGafa",
  title: "Tipo de Gafa",
  type: "document",
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
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const colorSchema = defineType({
  name: "colores",
  title: "Colores",
  type: "document",
  fields: [
    defineField({
      name: "nombre",
      title: "nombre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      // The 'color' schema type was added by the plugin
      type: "color",
      name: "color",
      title: "Color",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "nombre",
      color: "color",
    },
    
    prepare(selection) {
      const { title, color } = selection;
      if (!title || !color) return { title: "Sin título" };

      return {
        title,
        media: <ColorPreview title={title} color={color.hex} />,
      };
    },
  },
});


export const familiasOlfativasSchema = defineType({
  name: "familiasOlfativas",
  title: "Familias Olfativas",
  type: "document",
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "text",
    }),
  ],
});

export const notasOlfativasSchema = defineType({
  name: "notasOlfativas",
  title: "Notas Olfativas",
  type: "document",
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "text",
    }),
  ],
}); 

export const ingredientesSchema = defineType({
  name: "ingrediente",
  title: "Ingrediente",
  type: "document",
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "text",
    }),
  ],
}); 

export const coleccionesDeMarcaSchema = defineType({
  name: "coleccionesDeMarca",
  title: "Colecciones de Marca",
  type: "document",
  icon: BsBookmarkStar,
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "marca",
      title: "Marca",
      type: "reference",
      to: [{ type: "marca" }],
    })
  ],
}); 

export const materialesDeCajaSchema = defineType({
  name: "materialDeCaja",
  title: "Material de Caja",
  type: "document",
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "text",
    }),
  ],
}); 