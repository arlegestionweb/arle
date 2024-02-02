import { defineType, defineField, defineArrayMember } from "sanity";
import { CogIcon } from "@sanity/icons";

export const siteSettings = defineType({
  name: "configuracion",
  title: "Configuración",
  type: "document",
  icon: CogIcon,
    groups: [
    {
      name: "general",
      title: "General",
    },
    {
      name: "legal",
      title: "Legal",
    },
  ],
  fields: [
    defineField({
      name: "titulo",
      title: "Título del sitio",
      group: "general",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descripcion",
      title: "Descripción del sitio",
      type: "text",
      validation: (Rule) => Rule.required(),
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
    defineField({
      name: "terminosCondiciones",
      title: "Términos y condiciones",
      type: "url",
      group: "legal",
    }),
    defineField({
      name: "politicasPrivacidad",
      title: "Políticas y Privacidad",
      type: "url",
      group: "legal",
    }),
    defineField({
      name: "garantiasCambiosDevoluciones",
      title: "Garantias, Cambios y Devoluciones",
      type: "url",
      group: "legal",
    }),
    defineField({
      name: "politicasEnvio",
      title: "Políticas de envío",
      type: "url",
      group: "legal",
    }),
    defineField({
      name: "politicasCookies",
      title: "Políticas Cookies",
      type: "url",
      group: "legal",
    }),
    defineField({
      name: "mostrarCodigoDeDescuento",
      title: "Mostrar código de descuento",
      type: "boolean",
      initialValue: false,
      group: "general",
    })
  ],
});
