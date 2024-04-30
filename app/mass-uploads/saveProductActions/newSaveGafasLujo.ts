"use server";
import { z } from "zod";
import { TGafasLujoExcel } from "../_components/UploadedData";
import { nanoid } from "nanoid";
import sanityClient, { sanityWriteClient } from "@/sanity/sanityClient";
import { numberToColombianPriceString } from "@/utils/helpers";

const zodSanityImageSchema = z.object({
  _type: z.literal("image"),
  alt: z.string(),
  _key: z.string(),
  asset: z.object({
    _ref: z.string(),
  }),
});

const zodExternalImageSchema = z.object({
  _type: z.literal("imageUrl"),
  _key: z.string(),
  alt: z.string(),
  url: z.string(),
});

const zodInitialImageSchema = z
  .object({
    _id: z.string(),
    url: z.string(),
  })
  .or(z.string())
  .or(
    z.object({
      alt: z.string(),
      url: z.string(),
    })
  );

const zodImageUploadSchema = zodExternalImageSchema.or(zodSanityImageSchema);

const zodGafasLujoExcelWithImages = z.object({
  marca: z.string(),
  modelo: z.string(),
  variantes: z.array(
    z.object({
      codigoDeReferencia: z.string().or(z.number()),
      precio: z.string().or(z.number()),
      precioConDescuento: z.string().or(z.number()).optional().nullable(),
      unidadesDisponibles: z.number(),
      mostrarUnidadesDisponibles: z.boolean(),
      tag: z.string().optional().nullable(),
      _key: z.string().optional().nullable(),
      colorDeLaMontura: z.string(),
      colorDeLaVarilla: z.string(),
      colorDelLente: z.string(),
      imagenes: z.array(zodInitialImageSchema),
    })
  ),
  descripcion: z.string(),
  detalles: z
    .object({
      usarDetalles: z.boolean(),
      contenido: z.object({
        imagen: zodInitialImageSchema.optional().nullable(),
        resena: z.string().optional().nullable(),
      }),
    })
    .optional()
    .nullable(),
  especificaciones: z.object({
    estiloDeGafa: z.string(),
    lente: z.object({
      material: z.string(),
      tipo: z.string(),
    }),
    montura: z.object({
      formaDeLaMontura: z.string(),
      materialMontura: z.string(),
      materialVarilla: z.string(),
    }),
    paisDeOrigen: z.string(),
    queIncluye: z.string(),
    tipoDeGafa: z.string(),
  }),
  garantia: z.object({
    descripcion: z.string(),
    meses: z.string().or(z.number()),
  }),
  inspiracion: z.object({
    usarInspiracion: z.boolean(),
    contenido: z
      .object({
        imagen: zodInitialImageSchema.optional().nullable(),
        resena: z.string().optional().nullable(),
      })
      .optional()
      .nullable(),
  }),
  monturaDetalles: z.object({
    usarDetalles: z.boolean(),
    contenido: z
      .object({
        imagen: zodInitialImageSchema.optional().nullable(),
        texto: z.string().optional().nullable(),
      })
      .optional()
      .nullable(),
  }),
  genero: z.string(),
  mostrarCredito: z.boolean(),
  parteDeUnSet: z.boolean(),
});

export type TError = {
  message: string;
  path?: string;
  product?: {
    marca: string;
    modelo: string;
  };
};
export const saveGafasLujoInSanity = async (
  formState: {
    success: boolean;
    errors: TError[] | null;
  },
  data: {
    products: TGafasLujoExcel[];
    productType: string;
  }
) => {
  const { products, productType } = data;

  if (productType !== "gafasLujo") {
    return {
      success: false,
      errors: [
        {
          message: `Invalid product type: ${productType}`,
        },
      ],
    };
  }

  const ASRProd = products.find((prod) => prod.modelo.includes("ASR"));

  console.log({
    ASRProd,
    detallesContenido: ASRProd?.detalles.contenido,
  });

  const errors: TError[] = [];

  //parse products that are coming in

  const parsedProductsFromFront = z
    .array(zodGafasLujoExcelWithImages)
    .safeParse(products);

  if (!parsedProductsFromFront.success) {
    console.log({ error: parsedProductsFromFront.error });
    const parsingErrors = extractErrorsFromIssues(
      parsedProductsFromFront.error.issues,
      products
    );

    for (const error of parsingErrors) {
      errors.push(error);
    }
    return {
      success: false,
      errors: errors,
    };
  }
  // transform products into the right shape
  const productsToSavePromises = parsedProductsFromFront.data.map(
    async (product) => {
      // get all the doc references in the right shape

      const sanityRefResults = await sanityClient.fetch(`
      {
        "marca": *[_type == "marca" && titulo == "${product.marca}"][0]{
          "_ref":_id,
          "_type": "reference"
        },
        "paisDeOrigen": *[_type == "paisDeOrigen" && nombre == "${product.especificaciones.paisDeOrigen}"][0]{
          "_ref":_id,
          "_type": "reference"
        },
        "tipoDeGafa": *[_type == "tipoDeGafa" && titulo == "${product.especificaciones.tipoDeGafa}"][0]{
          "_ref":_id,
          "_type": "reference"
        },
        "estiloDeGafa": *[_type == "estiloDeGafa" && titulo == "${product.especificaciones.estiloDeGafa}"][0]{
          "_ref":_id,
          "_type": "reference"
        },
        "formaDeLaMontura": *[_type == "formaDeLaMontura" && titulo == "${product.especificaciones.montura.formaDeLaMontura}"][0]{
          "_ref":_id,
          "_type": "reference"
        },
        "materialMontura": *[_type == "materialDelMarco" && titulo == "${product.especificaciones.montura.materialMontura}"][0]{
          "_ref":_id,
          "_type": "reference"
        },
        "materialVarilla": *[_type == "materialDeLaVarilla" && titulo == "${product.especificaciones.montura.materialVarilla}"][0]{
          "_ref":_id,
          "_type": "reference"
        },
        "materialLente": *[_type == "materialDelLente" && titulo == "${product.especificaciones.lente.material}"][0]{
          "_ref":_id,
          "_type": "reference"
        },
        "tipoDeLente": *[_type == "tipoDeLente" && titulo == "${product.especificaciones.lente.tipo}"][0]{
          "_ref":_id,
          "_type": "reference"
        }
      }
  `);

      const sanityRefResultsParsed =
        zodSanityRefResults.safeParse(sanityRefResults);

      if (!sanityRefResultsParsed.success) {
        console.log({ error: sanityRefResultsParsed.error });
        const parsingErrors = extractErrorsFromIssues(
          sanityRefResultsParsed.error.issues,
          products
        );

        for (const error of parsingErrors) {
          errors.push(error);
        }
        return {
          success: false,
          errors: errors,
        };
      }

      const variantesPromises = product.variantes.map(async (variante) => {
        const colorsQueryRefs = await sanityClient.fetch(`
          {
            "colorDeLaMontura": *[_type == "colores" && nombre == "${variante.colorDeLaMontura}"][0] {
              "_type": "reference",
              "_ref": _id
            },
            "colorDeLaVarilla": *[_type == "colores" && nombre == "${variante.colorDeLaVarilla}"][0] {
              "_type": "reference",
              "_ref": _id
            },
            "colorDelLente": *[_type == "colores" && nombre == "${variante.colorDelLente}"][0] {
              "_type": "reference",
              "_ref": _id
            }
          }
        `);

        const parsedColorsQuery = zodColorQueryRefs.safeParse(colorsQueryRefs);

        if (!parsedColorsQuery.success) {
          console.log({ error: parsedColorsQuery.error });
          const parsingErrors = extractErrorsFromIssues(
            parsedColorsQuery.error.issues,
            products
          );

          for (const error of parsingErrors) {
            errors.push(error);
          }
          return;
        }

        const newVariante = {
          ...variante,
          _key: variante._key || `variant-${nanoid()}`,
          precio:
            typeof variante.precio === "number"
              ? numberToColombianPriceString(variante.precio)
              : variante.precio,
          precioConDescuento:
            variante.precioConDescuento &&
            typeof variante.precioConDescuento === "number"
              ? numberToColombianPriceString(variante.precioConDescuento)
              : `${variante.precioConDescuento}`,

          imagenes: variante.imagenes?.map((imagen, i) => {
            return transformImageForSanity(imagen, product, i);
          }),
          colorDeLaMontura: parsedColorsQuery.data.colorDeLaMontura,
          colorDeLaVarilla: parsedColorsQuery.data.colorDeLaVarilla,
          colorDelLente: parsedColorsQuery.data.colorDelLente,
        };

        const returnVariante = newVariante || {
          ...variante,
          _key: "defaultKey",
          precio: "defaultPrecio",
          // ... rest of the properties with default values
        };

        // console.log({imagenes: returnVariante.imagenes})

        return returnVariante;
      });

      const variantes = (await Promise.all(variantesPromises)).filter(Boolean);

      if (!variantes) {
        return errors.push({
          message: "error getting all the variant information",
        });
      }

      const transformedProduct = {
        ...product,
        _type: productType,
        marca: sanityRefResultsParsed.data.marca,
        variantes: variantes,
        especificaciones: {
          ...product.especificaciones,
          estiloDeGafa: sanityRefResultsParsed.data.estiloDeGafa,
          paisDeOrigen: sanityRefResultsParsed.data.paisDeOrigen,
          tipoDeGafa: sanityRefResultsParsed.data.tipoDeGafa,
          lente: {
            tipo: sanityRefResultsParsed.data.tipoDeLente,
            material: sanityRefResultsParsed.data.materialLente,
          },
          montura: {
            formaDeLaMontura: sanityRefResultsParsed.data.formaDeLaMontura,
            materialMontura: sanityRefResultsParsed.data.materialMontura,
            materialVarilla: sanityRefResultsParsed.data.materialVarilla,
          },
        },
        // detalles: {
        //   ...product.detalles,
        //   contenido: {
        //     texto: product.detalles?.contenido.resena,
        //     imagen:
        //       product.detalles?.contenido.imagen &&
        //       transformImageForSanity(
        //         product.detalles?.contenido.imagen,
        //         product,
        //         0
        //       ),
        //     imagenUrl: product.detalles?.contenido.imagen && typeof product.detalles?.contenido.imagen !== "string" && product.detalles?.contenido.imagen.url.includes("sanity.io") ?
        //       transformImageForSanity(
        //         product.detalles?.contenido.imagen,
        //         product,
        //         0
        //       ) : null,
        //     usarImagenExterna: typeof product.detalles?.contenido.imagen === "string" || !product.detalles?.contenido.imagen?.url.includes("sanity.io") ,
        //   },
        // },
        detalles: {
          ...product.detalles,
          contenido: {
            texto: product.detalles?.contenido.resena,
            imagen:
              product.detalles?.contenido.imagen &&
              typeof product.detalles?.contenido.imagen !== "string"
                ? transformImageForSanity(
                    product.detalles?.contenido.imagen,
                    product,
                    0
                  )
                : null,
            imagenUrl:
              product.detalles?.contenido.imagen &&
              typeof product.detalles?.contenido.imagen === "string"
                ? product.detalles?.contenido.imagen
                : null,
            usarImagenExterna:
              typeof product.detalles?.contenido.imagen === "string",
          },
        },
      };

      return transformedProduct;
    }
  );
  const productsToSave = await Promise.all(productsToSavePromises);
  const parsedProductsToSave = z
    .array(gafasLujoSchemaWithRefs)
    .safeParse(productsToSave);

  // console.log({
  //   prodsToSaveDetalles: productsToSave[1].detalles,
  //   imagenUrl: productsToSave[1].detalles.contenido.imagenUrl,
  //   imagen: productsToSave[1].detalles.contenido.imagen,
  // });
  if (!parsedProductsToSave.success) {
    const parsingErrors = extractErrorsFromIssues(
      parsedProductsToSave.error.issues,
      products
    );

    for (const error of parsingErrors) {
      errors.push(error);
    }
    return {
      success: false,
      errors,
    };
  }
  if (errors && errors.length > 0) {
    console.log({ errors });
    return {
      success: false,
      errors: errors,
    };
  }

  // const mergedProducts: TGafasLujoSchemaWithRefs[] = []
  for (const productToSave of parsedProductsToSave.data) {
    // find the product in sanity
    for (const variante of productToSave.variantes) {
      const sanityProd =
        await findSanityProductByCodigoDeReferenciaAndProductType(
          variante.codigoDeReferencia,
          productType
        );

      if (!sanityProd) {
        console.log(`creating new prod ${productToSave.modelo}`);
        const _id = productToSave._id || `gafa-lujo-${nanoid()}`;
        const sanityObjToSave = {
          ...productToSave,
          _id,
          slug: {
            _type: "slug",
            current: `/${productType}/${_id}`,
          },
        };

        // return console.log({ sanityObjToSave });
        const sanityResp = await sanityWriteClient.createOrReplace(
          sanityObjToSave
        );

        if (!sanityResp) {
          return {
            success: false,
            errors: [
              {
                message: `ups algo anda mal producto no fue actualizado`,
              },
            ],
          };
        }

        return {
          success: true,
          errors: null,
        };
      }

      console.log("updating prod");
      // console.log({sanityProd})
      if (productToSave.modelo.includes("ASR")) {
        console.log({ productToSave, detallesCont: productToSave.detalles });
      }

      const parsedSanityProd = gafasLujoSchemaWithRefsAndSlug.safeParse({
        ...sanityProd,
        productToSave,
        detalles: {
          ...productToSave.detalles,
          contenido:
            productToSave.detalles?.usarDetalles &&
            productToSave.detalles?.contenido
              ? {
                  ...productToSave.detalles?.contenido,
                  texto: productToSave.detalles?.contenido.texto,
                }
              : null,
        },
        slug: sanityProd.slug || {
          _type: "slug",
          current: `/${productType}/${sanityProd._id}`,
        },
      });

      if (!parsedSanityProd.success) {
        const parsingErrors = extractErrorsFromIssues(
          parsedSanityProd.error.issues,
          products
        );

        for (const error of parsingErrors) {
          errors.push(error);
        }
        return {
          success: false,
          errors,
        };
      }

      const sanityObjToSave = {
        ...parsedSanityProd.data,
        _id: parsedSanityProd.data._id || nanoid(),
        variantes: productToSave.variantes,
      };

      if (sanityObjToSave.modelo.includes("ASR")) {
        console.log({
          sanityObjToSave,
          detallesCont: sanityObjToSave.detalles.contenido,
        });
      }

      const sanityResp = await sanityWriteClient.createOrReplace(
        sanityObjToSave
      );

      if (!sanityResp) {
        return {
          success: false,
          errors: [
            {
              message: `ups algo anda mal producto no fue actualizado`,
            },
          ],
        };
      }

      // return {
      //   success: false,
      //   errors: null
      // }
    }
  }
  // console.log({mergedProducts})

  return {
    success: false,
    errors: [
      {
        message: `ups algo anda mal rick o bien?`,
      },
    ],
  };
};

const zodSanityRef = z.object({
  _type: z.literal("reference"),
  _ref: z.string(),
});

const gafasLujoSchemaWithRefs = zodGafasLujoExcelWithImages.merge(
  z.object({
    _type: z.literal("gafasLujo"),
    _id: z.string().optional().nullable(),
    marca: zodSanityRef,
    detalles: z
      .object({
        usarDetalles: z.literal(true),
        contenido: z
          .object({
            texto: z.string(),
            usarImagenExterna: z.literal(true),
            imagenExterna: zodExternalImageSchema,
          })
          .or(
            z.object({
              texto: z.string(),
              usarImagenExterna: z.literal(false),
              imagen: zodSanityImageSchema,
            })
          ),
      })
      .or(
        z.object({
          usarDetalles: z.literal(false),
        })
      ),
    especificaciones: z.object({
      paisDeOrigen: zodSanityRef,
      queIncluye: z.string(),
      tipoDeGafa: zodSanityRef,
      estiloDeGafa: zodSanityRef,
      montura: z.object({
        formaDeLaMontura: zodSanityRef,
        materialMontura: zodSanityRef,
        materialVarilla: zodSanityRef,
      }),
      lente: z.object({
        material: zodSanityRef,
        tipo: zodSanityRef,
      }),
    }),
    variantes: z.array(
      z.object({
        codigoDeReferencia: z.string().or(z.number()),
        precio: z.string(),
        precioConDescuento: z.string().optional().nullable(),
        unidadesDisponibles: z.number(),
        mostrarUnidadesDisponibles: z.boolean(),
        tag: z.string().optional().nullable(),
        _key: z.string(),
        colorDeLaMontura: zodSanityRef,
        colorDeLaVarilla: zodSanityRef,
        colorDelLente: zodSanityRef,
        imagenes: z.array(zodImageUploadSchema),
      })
    ),
  })
);

type TGafasLujoSchemaWithRefs = z.infer<typeof gafasLujoSchemaWithRefs>;

const gafasLujoSchemaWithRefsAndSlug = gafasLujoSchemaWithRefs.merge(
  z.object({
    detalles: 
      z.object({
        usarDetalles: z.boolean(),
        contenido: 
          z.object({
            texto: z.string(),
            usarImagenExterna: z.boolean(),
            imagenExterna: zodExternalImageSchema.optional().nullable(),
            imagen: zodSanityImageSchema.optional().nullable(),
          }),
          
      }),
    slug: z.object({
      _type: z.literal("slug"),
      current: z.string(),
    }),
  })
);

function transformImageForSanity(
  imagen:
    | {
        alt: string;
        url: string;
      }
    | {
        _id: string;
      }
    | string,
  product: any,
  i: number
) {
  if (imagen && typeof imagen === "string") {
    // console.log({ imagen });
    return {
      _type: "imageUrl" as "imageUrl",
      _key: `image-${nanoid()}`,
      alt: `${product.marca} ${product.modelo} - ${i + 1}`,
      url: imagen,
    };
  }

  if (imagen && typeof imagen !== "string" && "_id" in imagen) {
    return {
      _type: "image" as "image",
      _key: `image-${nanoid()}`,
      asset: {
        _ref: imagen._id,
      },
      alt: `${product.marca} ${product.modelo} - ${i + 1}`,
    };
  }
  if (imagen && typeof imagen !== "string" && "alt" in imagen) {
    return {
      _type: "imageUrl" as "imageUrl",
      _key: `image-${nanoid()}`,
      alt: imagen.alt,
      url: imagen.url,
    };
  }

  return {
    _type: "imageUrl" as "imageUrl",
    _key: `image-${nanoid()}`,
    alt: "error al guardar esta imagen",
    url: "error al guardar esta imagen",
  };
}

function extractErrorsFromIssues<T extends { marca: string; modelo: string }>(
  issues: z.ZodError["issues"],
  products: T[]
) {
  const errors = [];
  for (const issue of issues) {
    const path = issue.path.join(".");
    const pathIndices = path.split(".").map(Number);
    const errorProduct = products[pathIndices[0]];
    // console.log({ errorProduct, issue, path, unionErr: issue.unionErrors, detallesInError: errorProduct.detalles.contenido });
    errors.push({
      message: issue.message,
      path,
      product: {
        marca: errorProduct?.marca || "no marca",
        modelo: errorProduct?.modelo || "",
      },
    });
  }
  return errors;
}

const zodRefObject = z.object({
  _type: z.literal("reference"),
  _ref: z.string(),
});

const zodSanityRefResults = z.object({
  marca: zodRefObject,
  paisDeOrigen: zodRefObject,
  tipoDeGafa: zodRefObject,
  estiloDeGafa: zodRefObject,
  formaDeLaMontura: zodRefObject,
  materialMontura: zodRefObject,
  materialVarilla: zodRefObject,
  materialLente: zodRefObject,
  tipoDeLente: zodRefObject,
});

const zodColorQueryRefs = z.object({
  colorDeLaMontura: zodRefObject,
  colorDeLaVarilla: zodRefObject,
  colorDelLente: zodRefObject,
});

const findSanityProductByCodigoDeReferenciaAndProductType = async (
  codigoDeReferencia: string | number,
  productType: "perfumeLujo" | "perfumePremium" | "gafasLujo"
) => {
  const query = `*[_type == "${productType}"]{...}`;

  const products = await sanityClient.fetch(query);

  const product = products.find(
    (prod: { variantes: { codigoDeReferencia: string }[] }) => {
      return prod.variantes.some((variante) => {
        return variante.codigoDeReferencia === codigoDeReferencia;
      });
    }
  );

  return product;
};
