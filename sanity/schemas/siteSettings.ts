import { defineType, defineField, defineArrayMember } from "sanity";
import { CogIcon } from "@sanity/icons";

export const siteSettings = defineType({
  name: "configuracion",
  title: "Configuración",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "titulo",
      title: "Título del sitio",
      type: "string",
    }),
    defineField({
      name: "descripcion",
      title: "Descripción del sitio",
      type: "text",
    }),
    defineField({
      name: "marcaPromocionada",
      title: "Marca Promocionada",
      type: "reference",
      to: [{ type: "marca" }],
    }),
    defineField({
      name: "navbarBanner",
      title: "Banner Navbar",
      type: "object",
      fields: [
        defineField({
          name: "imagen",
          title: "Imagen",
          type: "imagenObject",
        }),
      ]
    }),
    defineField({
      type: "array",
      name: "linksSociales",
      title: "Links Sociales",
      of: [
        defineArrayMember({
          name: "link",
          title: "Link",
          type: "object",
          fields: [
            defineField({
              name: "titulo",
              title: "Título",
              type: "string",
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
            }),
          ],
        }),
      ],
    }),
  ],
});
