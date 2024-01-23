import { defineField, defineType } from "sanity";
import { ArrowDownIcon } from "@sanity/icons";

export const footerSchema = defineType({
    name: "footer",
    title: "Footer",
    type: "document",
    icon: ArrowDownIcon,
    fields: [
        defineField({
            name: "titulo2",
            title: "Título del sitio",
            type: "string",
        }),
    ]
})