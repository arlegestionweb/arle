import { defineType, defineField, defineArrayMember } from "sanity";
import { CogIcon } from "@sanity/icons";

export const siteSettings = defineType({
  name: "configuracion",
  title: "Configuración",
  type: "document",
  // @ts-ignore
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
      // @ts-ignore
      to: [{ type: "marca" }],
    }),
    defineField({
      name: "socialLinks",
      title: "Links Sociales",
      group: "general",
      type: "array",
      // @ts-ignore
      of: [
        defineArrayMember({
          name: "link",
          title: "Link",
          type: "object",
          fields: [
            defineField({
              name: "redSocial",
              title: "Red Social",
              type: "string",
              options: {
                list: ["facebook", "X", "WhatsApp", "Instagram", "linkedIn", "YouTube", "TikTok", "Otra" ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "Link",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "legal",
      title: "Legal",
      group: "legal",
      type: "object",
      // @ts-ignore
      fields: [
        defineField({
          name: "terminosCondiciones",
          title: "Términos y condiciones",
          type: "array",
          of: [{type: "block"}],
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "politicasPrivacidad",
          title: "Políticas de Privacidad",
          type: "array",
          of: [{type: "block"}],
        }),
        defineField({
          name: "garantiasCambiosDevoluciones",
          title: "Garantias, Cambios y Devoluciones",
          type: "array",
          of: [{type: "block"}],
        }),
        defineField({
          name: "politicasEnvio",
          title: "Políticas de envío",
          type: "array",
          of: [{type: "block"}],
        }),
        defineField({
          name: "politicasCookies",
          title: "Políticas de Cookies",
          type: "array",
          of: [{type: "block"}],
        }),
      ],
    }),
    defineField({
      name: "mostrarCodigoDeDescuento",
      title: "Mostrar códigos de descuento",
      type: "boolean",
      initialValue: false,
      group: "general",
    }),
    defineField({
      name: "popup",
      title: "Pop Up Banner",
      type: "object",
      group: "general",
      // @ts-ignore
      fields: [
        defineField({
          name: "usarPopup",
          title: "¿Usar Pop Up?",
          type: "boolean",
        }),
        defineField({
          name: "opciones",
          title: "Opciones",
          type: "object",
          hidden: ({ parent }) => !parent?.usarPopup,
          fields: [
            defineField({
              name: "boton",
              title: "Título del botón CTA",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "link",
              title: "Link del botón",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "imagen",
              title: "Imagen",
              type: "imagenObject",
              validation: (Rule) => Rule.required(),
            })
          ]
        }),
      ]
    }),

  ],
});
