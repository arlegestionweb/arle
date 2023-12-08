import ColorPreview from "../../components/ColorPreview"
import { defineField, defineType } from "sanity";
import { BsBookmarkStar } from "react-icons/bs";
import { FaFlag } from "react-icons/fa6";

export const paisDeOrigenSchema = defineType({
  name: "paisDeOrigen",
  title: "País de Origen",
  type: "document",
  icon: FaFlag,
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre",
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

