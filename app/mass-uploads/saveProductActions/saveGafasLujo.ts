"use server";
import { z } from "zod";
import sanityClient, { sanityWriteClient } from "@/sanity/sanityClient";
import { nanoid } from "nanoid";
import { numberToColombianPriceString } from "@/utils/helpers";
import {
  TGafasLujoExcel,
  TPerfumePremiumExcel,
} from "../_components/UploadedData";

const zodImageUploadSchema = z
  .object({
    _type: z.literal("imageUrl"),
    _key: z.string().optional().nullable(),
    alt: z.string().optional().nullable(),
    url: z.string(),
  })
  .or(
    z.object({
      _type: z.literal("image"),
      alt: z.string().optional().nullable(),
      _key: z.string().optional().nullable(),
      asset: z.object({
        _ref: z.string(),
      }),
    })
  );

const zodGafasLujoSanityReady = z.object({
  _type: z.literal("gafasLujo"),
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
      imagenes: z.array(zodImageUploadSchema).optional().nullable(),
    })
  ),
  descripcion: z.string(),
  detalles: z.object({
    usarDetalles: z.boolean(),
    contenido: z
      .object({
        imagen: z
          .object({
            _type: z.literal("imageUrl"),
            _key: z.string().optional().nullable(),
            alt: z.string().optional().nullable(),
            url: z.string().optional().nullable(),
          })
          .or(
            z.object({
              _type: z.literal("image"),
              alt: z.string().optional().nullable(),
              _key: z.string().optional().nullable(),
              asset: z.object({
                _ref: z.string().optional().nullable(),
              }),
            })
          )
          .optional()
          .nullable(),
        texto: z.string(),
      })
      .optional()
      .nullable(),
  }),
  especificaciones: z.object({
    estiloDeGafa: z.string(),
    lente: z.object({
      material: z.string(),
      tipo: z.string(),
    }),
    montura: z.object({
      formaDeLaMontura: z.string(),
      materialDeLaMontura: z.string(),
      materialDeLaVarilla: z.string(),
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
        imagen: z
          .object({
            _type: z.literal("imageUrl"),
            _key: z.string().optional().nullable(),
            alt: z.string().optional().nullable(),
            url: z.string().optional().nullable(),
          })
          .or(
            z.object({
              _type: z.literal("image"),
              alt: z.string().optional().nullable(),
              _key: z.string().optional().nullable(),
              asset: z.object({
                _ref: z.string().optional().nullable(),
              }),
            })
          )
          .optional()
          .nullable(),
        resena: z.string(),
      })
      .optional()
      .nullable(),
  }),
  monturaDetalles: z.object({
    usarDetalles: z.boolean(),
    contenido: z
      .object({
        imagen: z
          .object({
            _type: z.literal("imageUrl"),
            _key: z.string().optional().nullable(),
            alt: z.string().optional().nullable(),
            url: z.string().optional().nullable(),
          })
          .or(
            z.object({
              _type: z.literal("image"),
              alt: z.string().optional().nullable(),
              _key: z.string().optional().nullable(),
              asset: z.object({
                _ref: z.string().optional().nullable(),
              }),
            })
          )
          .optional()
          .nullable(),
        texto: z.string(),
      })
      .optional()
      .nullable(),
  }),
  genero: z.string(),
  mostrarCredito: z.boolean(),
  parteDeUnSet: z.boolean(),
});

const zodProducts = {
  // perfumeLujo: zodPerfumeLujoSchemaSanityReady,
  // perfumePremium: zodPerfumePremiumSanityReady,
  gafasLujo: zodGafasLujoSanityReady,
  // gafasPremium: zodPerfumeLujoSchemaSanityReady,
  // relojesLujo: zodPerfumeLujoSchemaSanityReady,
  // relojesPremium: zodPerfumeLujoSchemaSanityReady,
};

type TSanityProduct = z.infer<typeof zodGafasLujoSanityReady>;
// type TSanityProduct = z.infer<typeof zodPerfumeLujoSchemaSanityReady>;

function isProductType(key: string): key is keyof typeof zodProducts {
  return key in zodProducts;
}
type TProductWithImageUrl = Omit<
  TGafasLujoWithSanityRefs,
  | "marca"
  | "especificaciones"
  | "variantes"
  | "detalles"
  | "inspiracion"
  | "monturaDetalles"
> & {
  marca: string | { _type: "reference"; _ref: string };
  especificaciones: {
    paisDeOrigen: string | { _type: "reference"; _ref: string };
    queIncluye: string;
    tipoDeGafa: string | { _type: "reference"; _ref: string };
    estiloDeGafa: string | { _type: "reference"; _ref: string };
    montura: {
      formaDeLaMontura: string | { _type: "reference"; _ref: string };
      materialMontura: string | { _type: "reference"; _ref: string };
      materialVarilla: string | { _type: "reference"; _ref: string };
    };
    lente: {
      material: string | { _type: "reference"; _ref: string };
      tipo: string | { _type: "reference"; _ref: string };
    };
  };
  variantes: {
    codigoDeReferencia: string | number;
    precio: string | number;
    precioConDescuento: string | number | null | undefined;
    unidadesDisponibles: number;
    mostrarUnidadesDisponibles: boolean;
    tag: string | null;
    _key: string | null;
    colorDeLaMontura: string | { _type: "reference"; _ref: string };
    colorDeLaVarilla: string | { _type: "reference"; _ref: string };
    colorDelLente: string | { _type: "reference"; _ref: string };
    imagenes: (
      | { _type: "imageUrl"; _key: string; alt: string; url: string }
      | { _type: "image"; _key: string; alt: string; asset: { _ref: string } }
    )[];
  }[];
  detalles: {
    usarDetalles: boolean;
    contenido:
      | {
          imagen:
            | (
                | { _type: "imageUrl"; _key: string; alt: string; url: string }
                | {
                    _type: "image";
                    _key: string;
                    alt: string;
                    asset: { _ref: string };
                  }
              )
            | null;
          texto: string;
        }
      | {};
  };
  inspiracion: {
    usarInspiracion: boolean;
    contenido:
      | {
          imagen:
            | (
                | { _type: "imageUrl"; _key: string; alt: string; url: string }
                | {
                    _type: "image";
                    _key: string;
                    alt: string;
                    asset: { _ref: string };
                  }
              )
            | null;
          resena: string;
        }
      | {};
  };
  monturaDetalles: {
    usarDetalles: boolean;
    contenido:
      | {
          imagen:
            | (
                | { _type: "imageUrl"; _key: string; alt: string; url: string }
                | {
                    _type: "image";
                    _key: string;
                    alt: string;
                    asset: { _ref: string };
                  }
              )
            | null;
          texto: string;
        }
      | {};
  };
};

export const saveGafasLujoInSanityUsingForm = async (
  formState: {
    success: boolean;
    error: string | null;
  },
  data: {
    products: TGafasLujoExcel[];
    productType: string;
  }
) => {
  const { products, productType } = data;

  if (!isProductType(productType)) {
    return {
      success: false,
      error: `Invalid product type: ${productType}`,
    };
  }

  const productsToSave: TGafasLujoWithSanityRefs[] = [];
  const returnError: { success: boolean; error: null | string } = {
    success: false,
    error: null,
  };
  const newProducts: TSanityProduct[] = products.map((product) => {
    for (const variante of product.variantes) {
      if (!variante.imagenes || variante.imagenes?.length < 0) {
        returnError.error = `Al producto ${product.marca} ${product.modelo} le faltan las imagenes`;
      }
    }
    return {
      _type: productType,
      marca: product.marca,
      modelo: product.modelo,
      variantes: product.variantes.map((variante) => ({
        ...variante,
        imagenes: variante.imagenes?.map((img, i) => {
          if (img && typeof img !== "string" && img._id) {
            return {
              _type: "image",
              _key: `image-${nanoid()}`,
              asset: {
                _ref: img._id,
              },
              alt: `${product.marca} ${product.modelo} - ${i + 1}`,
            };
          } else if (typeof img === "string") {
            return {
              _type: "imageUrl",
              _key: `image-${nanoid()}`,
              alt: `${product.marca} ${product.modelo} - ${i + 1}`,
              url: img,
            };
          } else {
            // handle the case where img is undefined or an object without an _id property
            console.log("deleting url", { img });
            return {
              _type: "imageUrl",
              _key: `image-${nanoid()}`,
              alt: `${product.marca} ${product.modelo} - ${i + 1}`,
              url: "", // provide a default value
            };
          }
        }),
      })),
      descripcion: product.descripcion,
      detalles: {
        usarDetalles: product.detalles.usarDetalles,
        contenido: product.detalles.contenido
          ? {
              imagen: {
                _type: "imageUrl",
                _key: `image-${nanoid()}`,
                alt: product.detalles.contenido.imagen?.alt,
                url: product.detalles.contenido.imagen?.url,
              },
              texto: product.detalles.contenido.resena,
            }
          : null,
      },
      especificaciones: {
        estiloDeGafa: product.especificaciones.estiloDeGafa,
        lente: {
          material: product.especificaciones.lente.material,
          tipo: product.especificaciones.lente.tipo,
        },
        montura: {
          formaDeLaMontura: product.especificaciones.montura.formaDeLaMontura,
          materialDeLaMontura: product.especificaciones.montura.materialMontura,
          materialDeLaVarilla: product.especificaciones.montura.materialVarilla,
        },
        paisDeOrigen: product.especificaciones.paisDeOrigen,
        queIncluye: product.especificaciones.queIncluye,
        tipoDeGafa: product.especificaciones.tipoDeGafa,
      },
      garantia: {
        descripcion: product.garantia.descripcion,
        meses: product.garantia.meses,
      },
      inspiracion: {
        usarInspiracion: product.inspiracion.usarInspiracion,
        contenido: product.inspiracion.contenido
          ? {
              imagen: {
                _type: "imageUrl",
                _key: `image-${nanoid()}`,
                alt: product.inspiracion.contenido.imagen?.alt,
                url: product.inspiracion.contenido.imagen?.url,
              },
              resena: product.inspiracion.contenido.resena,
            }
          : null,
      },
      monturaDetalles: {
        usarDetalles: product.monturaDetalles.usarDetalles,
        contenido: product.monturaDetalles.contenido
          ? {
              imagen: {
                _type: "imageUrl",
                _key: `image-${nanoid()}`,
                alt: product.monturaDetalles.contenido.imagen.alt,
                url: product.monturaDetalles.contenido.imagen.url,
              },
              texto: product.monturaDetalles.contenido.resena,
            }
          : null,
      },
      genero: product.genero,
      mostrarCredito: product.mostrarCredito,
      parteDeUnSet: product.parteDeUnSet,
    };
  });
  const productsParser = z.array(
    zodProducts[productType as keyof typeof zodProducts]
  );

  const parsedProducts = productsParser.safeParse(newProducts);

  if (!parsedProducts.success) {
    console.log({
      errors: parsedProducts.error.errors,
      path: parsedProducts.error.errors[0].path,
    });
    return {
      success: false,
      error: "Invalid products",
    };
  }

  const savingProducts = new Map();

  const prepareProductsToSave = async () => {
    let mergedProducts: TGafasLujoWithSanityRefs[] = [];
    await Promise.all(
      parsedProducts.data.map(async (product) => {
        let newProd: TProductWithImageUrl = {
          ...product,
          // imagenes: product.imagenes,
          marca: product.marca,
          descripcion: product.descripcion,
          especificaciones: {
            ...product.especificaciones,
            montura: {
              ...product.especificaciones.montura,
              materialMontura:
                product.especificaciones.montura.materialDeLaMontura,
              materialVarilla:
                product.especificaciones.montura.materialDeLaVarilla,
            },
          },
          variantes: product.variantes.map((variante) => ({
            ...variante,
            precioConDescuento: variante.precioConDescuento || null,
            tag: variante.tag || null,
            _key: variante._key || `variant-${nanoid()}`,
            imagenes: variante.imagenes
              ? variante.imagenes.map((img, i) => {
                  if (img && typeof img !== "string" && img._type === "image") {
                    return {
                      _type: "image",
                      _key: `image-${nanoid()}`,
                      asset: {
                        _ref: img.asset._ref,
                      },
                      alt: `${product.marca} ${product.modelo} - ${i + 1}`,
                    };
                  } else if (typeof img === "string") {
                    return {
                      _type: "imageUrl",
                      _key: `image-${nanoid()}`,
                      alt: `${product.marca} ${product.modelo} - ${i + 1}`,
                      url: img,
                    };
                  } else {
                    // handle the case where img is undefined or an object without an _id property
                    return {
                      ...img,
                      _key: img._key || `image-${nanoid()}`,
                      alt:
                        img.alt ||
                        `${product.marca} ${product.modelo} - ${i + 1}`,
                    };
                  }
                })
              : [],
          })),
          detalles: {
            usarDetalles: product.detalles.usarDetalles,
            contenido: product.detalles.contenido
              ? {
                  imagen:
                    product.detalles.contenido.imagen &&
                    typeof product.detalles.contenido.imagen !== "string" &&
                    product.detalles.contenido.imagen._type === "image" &&
                    product.detalles.contenido.imagen.asset._ref
                      ? {
                          _type: "image",
                          _key: `image-${nanoid()}`,
                          asset: {
                            _ref: product.detalles.contenido.imagen.asset._ref,
                          },
                          alt: `${product.marca} ${product.modelo} detalles`,
                        }
                      : typeof product.detalles.contenido.imagen === "string"
                      ? {
                          _type: "imageUrl",
                          _key: `image-${nanoid()}`,
                          alt: `${product.marca} ${product.modelo} detalles`,
                          url: product.detalles.contenido.imagen,
                        }
                      : // handle the case where img is undefined or an object without an _id property
                        {
                          _type: "imageUrl",
                          _key: `image-${nanoid()}`,
                          alt: `${product.marca} ${product.modelo} detalles`,
                          url: "", // provide a default value
                        },
                  texto: product.detalles.contenido.texto,
                }
              : {},
          },
          inspiracion: {
            usarInspiracion: product.inspiracion.usarInspiracion,
            contenido: product.inspiracion.contenido
              ? {
                  imagen:
                    product.inspiracion.contenido.imagen &&
                    typeof product.inspiracion.contenido.imagen !== "string" &&
                    product.inspiracion.contenido.imagen._type === "image" &&
                    product.inspiracion.contenido.imagen.asset._ref
                      ? {
                          _type: "image",
                          _key: `image-${nanoid()}`,
                          asset: {
                            _ref: product.inspiracion.contenido.imagen.asset
                              ._ref,
                          },
                          alt: `${product.marca} ${product.modelo} detalles`,
                        }
                      : typeof product.inspiracion.contenido.imagen === "string"
                      ? {
                          _type: "imageUrl",
                          _key: `image-${nanoid()}`,
                          alt: `${product.marca} ${product.modelo} detalles`,
                          url: product.inspiracion.contenido.imagen,
                        }
                      : // handle the case where img is undefined or an object without an _id property
                        {
                          _type: "imageUrl",
                          _key: `image-${nanoid()}`,
                          alt: `${product.marca} ${product.modelo} detalles`,
                          url: "", // provide a default value
                        },
                  resena: product.inspiracion.contenido.resena,
                }
              : {},
          },
          monturaDetalles: {
            usarDetalles: product.monturaDetalles.usarDetalles,
            contenido: product.monturaDetalles.contenido
              ? {
                  imagen:
                    product.monturaDetalles.contenido.imagen &&
                    typeof product.monturaDetalles.contenido.imagen !==
                      "string" &&
                    product.monturaDetalles.contenido.imagen._type ===
                      "image" &&
                    product.monturaDetalles.contenido.imagen.asset._ref
                      ? {
                          _type: "image",
                          _key: `image-${nanoid()}`,
                          asset: {
                            _ref: product.monturaDetalles.contenido.imagen.asset
                              ._ref,
                          },
                          alt: `${product.marca} ${product.modelo} detalles de la montura`,
                        }
                      : typeof product.monturaDetalles.contenido.imagen ===
                        "string"
                      ? {
                          _type: "imageUrl",
                          _key: `image-${nanoid()}`,
                          alt: `${product.marca} ${product.modelo} detalles de la montura`,
                          url: product.monturaDetalles.contenido.imagen,
                        }
                      : // handle the case where img is undefined or an object without an _id property
                        {
                          _type: "imageUrl",
                          _key: `image-${nanoid()}`,
                          alt: `${product.marca} ${product.modelo} detalles de la montura`,
                          url: "", // provide a default value
                        },
                  texto: product.monturaDetalles.contenido.texto,
                }
              : {},
          },
        };

        const marcaDelExcel = product.marca;

        const marcaSanity = await sanityClient.fetch(
          `*[_type == "marca" && titulo == "${marcaDelExcel}"][0]`
        );

        if (!marcaSanity) {
          const newMarca = await sanityWriteClient.create({
            _type: "marca",
            titulo: marcaDelExcel,
          });

          if (!newMarca) {
            throw new Error("Failed to create new marca");
          }

          newProd.marca = {
            _type: "reference",
            _ref: newMarca._id,
          };
        } else {
          newProd.marca = {
            _type: "reference",
            _ref: marcaSanity._id,
          };
        }
        const sanityResults = await sanityClient.fetch(`
          {
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
            "materialMontura": *[_type == "materialDelMarco" && titulo == "${product.especificaciones.montura.materialDeLaMontura}"][0]{
              "_ref":_id,
              "_type": "reference"
            },
            "materialVarilla": *[_type == "materialDeLaVarilla" && titulo == "${product.especificaciones.montura.materialDeLaVarilla}"][0]{
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

        const zodRefObject = z.object({
          _type: z.literal("reference"),
          _ref: z.string(),
        });

        const zodSanityResults = z.object({
          paisDeOrigen: zodRefObject,
          tipoDeGafa: zodRefObject,
          estiloDeGafa: zodRefObject,
          formaDeLaMontura: zodRefObject,
          materialMontura: zodRefObject,
          materialVarilla: zodRefObject,
          materialLente: zodRefObject,
          tipoDeLente: zodRefObject,
        });

        const sanityResultsParsed = zodSanityResults.safeParse(sanityResults);

        if (!sanityResultsParsed.success) {
          throw new Error(
            `Failed to find all the references ${sanityResultsParsed.error}`
          );
        }

        newProd = {
          ...newProd,
          especificaciones: {
            ...newProd.especificaciones,
            paisDeOrigen: sanityResultsParsed.data.paisDeOrigen,
            tipoDeGafa: sanityResultsParsed.data.tipoDeGafa,
            estiloDeGafa: sanityResultsParsed.data.estiloDeGafa,
            montura: {
              formaDeLaMontura: sanityResultsParsed.data.formaDeLaMontura,
              materialMontura: sanityResultsParsed.data.materialMontura,
              materialVarilla: sanityResultsParsed.data.materialVarilla,
            },
            lente: {
              material: sanityResultsParsed.data.materialLente,
              tipo: sanityResultsParsed.data.tipoDeLente,
            },
          },
        };
        let varIndex = 0;
        for (const variante of product.variantes) {
          try {
            const sanityProd =
              await findSanityProductBycodigoDeReferenciaAndProductType(
                variante.codigoDeReferencia,
                // "11411re",
                product._type
              );

            const colorDeLaMonturaSanity = await sanityClient.fetch(
              `*[_type == "colores" && nombre == "${variante.colorDeLaMontura}"][0]`
            );

            const colorDeLaVarillaSanity = await sanityClient.fetch(
              `*[_type == "colores" && nombre == "${variante.colorDeLaVarilla}"][0]`
            );

            const colorDelLenteSanity = await sanityClient.fetch(
              `*[_type == "colores" && nombre == "${variante.colorDelLente}"][0]`
            );

            if (
              !colorDeLaMonturaSanity ||
              !colorDeLaVarillaSanity ||
              !colorDelLenteSanity
            ) {
              throw new Error("Failed to find a color");
            }
            const newVariante = {
              ...variante,
              colorDeLaMontura: {
                _type: "reference" as "reference",
                _ref: colorDeLaMonturaSanity._id as string,
              },
              colorDeLaVarilla: {
                _type: "reference" as "reference",
                _ref: colorDeLaVarillaSanity._id as string,
              },
              colorDelLente: {
                _type: "reference" as "reference",
                _ref: colorDelLenteSanity._id as string,
              },
              precioConDescuento:
                variante.precioConDescuento &&
                typeof variante.precioConDescuento === "number"
                  ? numberToColombianPriceString(variante.precioConDescuento)
                  : variante.precioConDescuento,
              tag: variante.tag || null,
              _key: `variant-${varIndex}-${nanoid()}`,
              imagenes:
                variante.imagenes?.map((img, i) => {
                  if (img && typeof img !== "string" && img._type === "image") {
                    return {
                      _type: "image" as "image",
                      _key: `image-${nanoid()}`,
                      asset: {
                        _ref: img.asset._ref,
                      },
                      alt: `${product.marca} ${product.modelo} - ${i + 1}`,
                    };
                  } else if (typeof img === "string") {
                    return {
                      _type: "imageUrl" as "imageUrl",
                      _key: `image-${nanoid()}`,
                      alt: `${product.marca} ${product.modelo} - ${i + 1}`,
                      url: img,
                    };
                  } else {
                    // handle the case where img is undefined or an object without an _id property
                    return {
                      _type: "imageUrl" as "imageUrl",
                      _key: `image-${nanoid()}`,
                      alt: `${product.marca} ${product.modelo} - ${i + 1}`,
                      url: "", // provide a default value
                    };
                  }
                }) || [],
              precio:
                typeof variante.precio === "number"
                  ? numberToColombianPriceString(variante.precio)
                  : variante.precio,
            };
            console.log({ newVariante });
            // Create a new array for the updated variants
            let updatedVariantes = [...newProd.variantes];

            // Update the variant at varIndex
            updatedVariantes[varIndex] = newVariante;

            // Assign the updated array back to newProd
            newProd.variantes = updatedVariantes;

            // console.log({newVariants: newProd.variantes})
            if (sanityProd) {
              const updatedProduct = {
                ...sanityProd,
                ...newProd,
                _id: sanityProd._id,
              };

              if (
                updatedProduct._id === undefined ||
                updatedProduct._id === null
              ) {
                throw new Error("Failed to find the product id");
              }

              productsToSave.push({
                ...updatedProduct,
                _id: updatedProduct._id,
              });
            } else {
              if (
                colorDeLaMonturaSanity ||
                colorDeLaVarillaSanity ||
                colorDelLenteSanity
              ) {
                const parsedProduct =
                  zodGafasLujoSchemaWithSanityRefs.safeParse(newProd);

                // if (!parsedProduct.success) {
                //   throw new Error(
                //     `failed to parse the product ${
                //       parsedProduct.error
                //     } ${JSON.stringify(newProd)} ${newProd.modelo} `
                //   );
                // }
                // parsedProduct.data.marca
                productsToSave.push({
                  ...newProd,
                  _id: newProd._id,
                });
              }
            }
          } catch (error) {
            return console.log(error);
          }

          mergedProducts = productsToSave.reduce(
            (acc: TGafasLujoWithSanityRefs[], product) => {
              // Check if the product already exists in the accumulator
              const existingProduct: TGafasLujoWithSanityRefs | undefined =
                acc.find(
                  (p: TGafasLujoWithSanityRefs) =>
                    p.modelo === product.modelo && p._type === product._type
                );

              if (existingProduct) {
                // If the product already exists, merge the variants
                const variantes = [
                  ...existingProduct.variantes,
                  ...product.variantes,
                ];
                const uniqueVariantes = [];

                // Create a Set to store the codigoDeReferencia values
                const variantCodes = new Set();

                // Loop over the variantes array
                for (const variante of variantes) {
                  // If the variant's codigoDeReferencia is not in the Set, add it to the uniqueVariantes array and the Set
                  if (!variantCodes.has(variante.codigoDeReferencia)) {
                    uniqueVariantes.push(variante);
                    variantCodes.add(variante.codigoDeReferencia);
                  }
                }

                existingProduct.variantes = uniqueVariantes;
              } else {
                // If the product doesn't exist, add it to the accumulator
                acc.push(product);
              }

              return acc;
            },
            []
          );

          varIndex++
        }
      })
    );
    return mergedProducts;
  };
  try {
    const prodsToSave = await prepareProductsToSave();

    if (!prodsToSave || prodsToSave.length < 0) {
      return {
        success: false,
        error: "Hubo un problema preparando el archivo revisa tus datos",
      };
    }
    for (const product of prodsToSave) {
      const parsedProd = zodGafasLujoSchemaWithSanityRefs.safeParse(product);
      if (!parsedProd.success) {
        console.log({
          product,
          errors: parsedProd.error.errors,
          path: parsedProd.error.errors[0].path,
        });
        return {
          success: false,
          error: `Invalid product ${product._id} ${product.modelo} ${product.marca}`,
        };
      }

      if (parsedProd.data._id && typeof parsedProd.data._id === "string") {
        if (!savingProducts.has(parsedProd.data._id)) {
          savingProducts.set(parsedProd.data._id, true);
          console.log("updating product");
          // const saveResp = await sanityWriteClient.createOrReplace({
          //   ...parsedProd.data,
          //   _id: parsedProd.data._id,
          //   slug: {
          //     _type: "slug",
          //     current: `/${productType}/${parsedProd.data._id}`,
          //   },
          //   variantes: parsedProd.data.variantes.map((variante) => {
          //     return {
          //       ...variante,
          //       _key: variante._key || `variant-${nanoid()}`,
          //       codigoDeReferencia: `${variante.codigoDeReferencia}`,
          //       precio:
          //         typeof variante.precio === "number"
          //           ? numberToColombianPriceString(variante.precio)
          //           : variante.precio,
          //       precioConDescuento:
          //         variante.precioConDescuento &&
          //         typeof variante.precioConDescuento === "number"
          //           ? numberToColombianPriceString(variante.precioConDescuento)
          //           : variante.precioConDescuento,
          //     };
          //   }),
          // });

          const product = {
            ...parsedProd.data,
            _id: parsedProd.data._id,
            slug: {
              _type: "slug",
              current: `/${productType}/${parsedProd.data._id}`,
            },
            variantes: parsedProd.data.variantes.map((variante) => {
              return {
                ...variante,
                _key: variante._key || `variant-${nanoid()}`,
                codigoDeReferencia: `${variante.codigoDeReferencia}`,
                precio:
                  typeof variante.precio === "number"
                    ? numberToColombianPriceString(variante.precio)
                    : variante.precio,
                precioConDescuento:
                  variante.precioConDescuento &&
                  typeof variante.precioConDescuento === "number"
                    ? numberToColombianPriceString(variante.precioConDescuento)
                    : variante.precioConDescuento,
              };
            }),
          };
          console.log("updating: ", {
            // product,
            // imagenes: product.variantes[0].imagenes,
          });
          savingProducts.delete(parsedProd.data._id);
        }
      } else {
        const _id = `${productType}-${nanoid()}`;
        if (!savingProducts.has(_id)) {
          savingProducts.set(_id, true);
          console.log("creating product");
          // const saveResp = await sanityWriteClient.create({
          //   ...parsedProd.data,
          //   _id,
          //   slug: {
          //     _type: "slug",
          //     current: `/${productType}/${_id}`,
          //   },
          //   variantes: parsedProd.data.variantes.map((variante) => {
          //     // const precio = numberToColombianPriceString(variante.precio);

          //     return {
          //       ...variante,
          //       codigoDeReferencia: `${variante.codigoDeReferencia}`,
          //       _key: variante._key || `variant-${nanoid()}`,
          //       precio:
          //         typeof variante.precio === "number"
          //           ? numberToColombianPriceString(variante.precio)
          //           : variante.precio,
          //       precioConDescuento:
          //         variante.precioConDescuento &&
          //         typeof variante.precioConDescuento === "number"
          //           ? numberToColombianPriceString(variante.precioConDescuento)
          //           : variante.precioConDescuento,
          //     };
          //   }),
          // });

          const product = {
            ...parsedProd.data,
            _id,
            slug: {
              _type: "slug",
              current: `/${productType}/${_id}`,
            },
            variantes: parsedProd.data.variantes.map((variante) => {
              // const precio = numberToColombianPriceString(variante.precio);

              return {
                ...variante,
                codigoDeReferencia: `${variante.codigoDeReferencia}`,
                _key: variante._key || `variant-${nanoid()}`,
                precio:
                  typeof variante.precio === "number"
                    ? numberToColombianPriceString(variante.precio)
                    : variante.precio,
                precioConDescuento:
                  variante.precioConDescuento &&
                  typeof variante.precioConDescuento === "number"
                    ? numberToColombianPriceString(variante.precioConDescuento)
                    : variante.precioConDescuento,
              };
            }),
          };
          console.log("creating: ", {
            // product,
            // imagenes: product.variantes[0].imagenes,
          });
          savingProducts.delete(_id);
        }
      }
    }
  } catch (error) {
    return {
      success: false,
      error: `Failed to save products ${error}`,
    };
  }

  return {
    success: false,
    error: "false error",
  };
};

const findSanityProductBycodigoDeReferenciaAndProductType = async (
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

const zodGafasLujoSchemaWithSanityRefs = zodGafasLujoSanityReady.merge(
  z.object({
    _id: z.string().optional().nullable(),
    marca: z.object({
      _type: z.literal("reference"),
      _ref: z.string(),
    }),
    especificaciones: z.object({
      paisDeOrigen: z.object({
        _type: z.literal("reference"),
        _ref: z.string(),
      }),
      queIncluye: z.string(),
      tipoDeGafa: z.object({ _type: z.literal("reference"), _ref: z.string() }),
      estiloDeGafa: z.object({
        _type: z.literal("reference"),
        _ref: z.string(),
      }),
      montura: z.object({
        formaDeLaMontura: z.object({
          _type: z.literal("reference"),
          _ref: z.string(),
        }),
        materialMontura: z.object({
          _type: z.literal("reference"),
          _ref: z.string(),
        }),
        materialVarilla: z.object({
          _type: z.literal("reference"),
          _ref: z.string(),
        }),
      }),
      lente: z.object({
        material: z.object({ _type: z.literal("reference"), _ref: z.string() }),
        tipo: z.object({ _type: z.literal("reference"), _ref: z.string() }),
      }),
    }),
    variantes: z.array(
      z.object({
        codigoDeReferencia: z.string().or(z.number()),
        precio: z.string().or(z.number()),
        precioConDescuento: z.string().or(z.number()).optional().nullable(),
        unidadesDisponibles: z.number(),
        mostrarUnidadesDisponibles: z.boolean(),
        tag: z.string().optional().nullable(),
        _key: z.string().optional().nullable(),
        colorDeLaMontura: z.object({
          _type: z.literal("reference"),
          _ref: z.string(),
        }),
        colorDeLaVarilla: z.object({
          _type: z.literal("reference"),
          _ref: z.string(),
        }),
        colorDelLente: z.object({
          _type: z.literal("reference"),
          _ref: z.string(),
        }),
        imagenes: z.array(zodImageUploadSchema),
      })
    ),
    detalles: z.object({
      usarDetalles: z.boolean(),
      contenido: z
        .object({
          imagen: z
            .object({
              _type: z.literal("imageUrl"),
              _key: z.string().optional().nullable(),
              alt: z.string().optional().nullable(),
              url: z.string().optional().nullable(),
            })
            .or(
              z
                .object({
                  _type: z.literal("image"),
                  alt: z.string().optional().nullable(),
                  _key: z.string().optional().nullable(),
                  asset: z.object({
                    _ref: z.string(),
                  }),
                })
                .or(z.object({}))
            ),
          resena: z.string().optional().nullable(),
        })
        .optional()
        .nullable(),
    }),
    inspiracion: z.object({
      usarInspiracion: z.boolean(),
      contenido: z
        .object({
          subirImagen: z.boolean(),
          imagen: z
            .object({
              _type: z.literal("imageUrl"),
              _key: z.string().optional().nullable(),
              alt: z.string().optional().nullable(),
              url: z.string().optional().nullable(),
            })
            .or(
              z.object({
                _type: z.literal("image"),
                alt: z.string().optional().nullable(),
                _key: z.string().optional().nullable(),
                asset: z.object({
                  _ref: z.string(),
                }),
              })
            ),
          resena: z.string().optional().nullable(),
        })
        .or(z.object({})),
    }),
    monturaDetalles: z.object({
      usarDetalles: z.boolean(),
      contenido: z
        .object({
          imagen: z.object({
            _type: z.literal("imageUrl"),
            _key: z.string().optional().nullable(),
            alt: z.string().optional().nullable(),
            url: z.string().optional().nullable(),
          }),
          resena: z.string(),
        })
        .or(z.object({})),
    }),
  })
);

type TGafasLujoWithSanityRefs = z.infer<
  typeof zodGafasLujoSchemaWithSanityRefs
>;
