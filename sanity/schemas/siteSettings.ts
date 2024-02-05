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
      default: true,
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
      group: "general",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "marcaPromocionada",
      title: "Marca Promocionada",
      group: "general",
      type: "reference",
      to: [{ type: "marca" }],
    }),
    defineField({
      name: "linksSociales",
      title: "Links Sociales",
      group: "general",
      type: "array",
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
      type: "array",
      of: [{type: "block"}],
      group: "legal",
    }),
    defineField({
      name: "politicasPrivacidad",
      title: "Políticas y Privacidad",
      type: "array",
      of: [{type: "block"}],
      group: "legal",
    }),
    defineField({
      name: "garantiasCambiosDevoluciones",
      title: "Garantias, Cambios y Devoluciones",
      type: "array",
      of: [{type: "block"}],
      group: "legal",
    }),
    defineField({
      name: "politicasEnvio",
      title: "Políticas de envío",
      type: "array",
      of: [{type: "block"}],
      group: "legal",
    }),
    defineField({
      name: "politicasCookies",
      title: "Políticas Cookies",
      type: "array",
      of: [{type: "block"}],
      group: "legal",
    }),
    defineField({
      name: "mostrarCodigoDeDescuento",
      title: "Mostrar códigos de descuento",
      type: "boolean",
      initialValue: false,
      group: "general",
    })
  ],
});
