"use server";
import { z } from "zod";
import sanityClient, { sanityWriteClient } from "@/sanity/sanityClient";
import { nanoid } from "nanoid";
import { numberToColombianPriceString } from "@/utils/helpers";
import { TPerfumeDeLujoExcel } from "../_components/UploadedData";

const zodImageUploadSchema = z
  .object({
    _type: z.literal("imageUrl"),
    _key: z.string().optional().nullable(),
    alt: z.string().optional().nullable(),
    url: z.string().url(),
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

const zodPerfumeLujoSchemaSanityReady = z.object({
  _type: z.literal("perfumeLujo"),
  marca: z.string(),
  titulo: z.string(),
  imagenes: z.array(zodImageUploadSchema),
  mostrarCredito: z.boolean(),
  genero: z.string(),
  concentracion: z.string(),
  parteDeUnSet: z.boolean(),
  descripcion: z.object({
    imagen: z
      .object({
        alt: z.string().optional().nullable(),
        url: z.string().url().optional().nullable(),
      })
      .optional()
      .nullable(),
    texto: z.string(),
  }),
  inspiracion: z.object({
    usarInspiracion: z.boolean().optional().nullable(),
    contenido: z
      .object({
        subirImagen: z.boolean(),
        imagen: z.object({
          alt: z.string(),
          url: z.string(),
        }),
        resena: z.string().optional().nullable(),
      })
      .optional()
      .nullable(),
  }),
  notasOlfativas: z.object({
    familiaOlfativa: z.string(),
    notasDeBase: z.array(z.string()),
    notasDeCorazon: z.array(z.string()),
    notasDeSalida: z.array(z.string()),
  }),
  ingredientes: z.array(z.string()),
  paisDeOrigen: z.string(),
  variantes: z.array(
    z.object({
      tamano: z.number().or(z.string()),
      precio: z.string().or(z.number()),
      precioConDescuento: z.string().or(z.number()).optional().nullable(),
      codigoDeReferencia: z.string().or(z.number()),
      registroInvima: z.string().or(z.number()),
      unidadesDisponibles: z.number(),
      mostrarUnidadesDisponibles: z.boolean(),
      tag: z.string().optional().nullable(),
      _key: z.string().optional().nullable(),
    })
  ),
});

const zodProducts = {
  perfumeLujo: zodPerfumeLujoSchemaSanityReady,
  // perfumePremium: zodPerfumeLujoSchemaSanityReady,
  // gafasLujo: zodPerfumeLujoSchemaSanityReady,
  // gafasPremium: zodPerfumeLujoSchemaSanityReady,
  // relojesLujo: zodPerfumeLujoSchemaSanityReady,
  // relojesPremium: zodPerfumeLujoSchemaSanityReady,
};

type TSanityProduct = z.infer<(typeof zodProducts)[keyof typeof zodProducts]>;
// type TSanityProduct = z.infer<typeof zodPerfumeLujoSchemaSanityReady>;

function isProductType(key: string): key is keyof typeof zodProducts {
  return key in zodProducts;
}
type TProductWithImageUrl = Omit<
  TPerfumeLujoWithSanityRefs,
  // | "imagenes"
  | "marca"
  | "concentracion"
  | "descripcion"
  | "inspiracion"
  | "notasOlfativas"
  | "ingredientes"
  | "paisDeOrigen"
> & {
  marca: string | { _type: "reference"; _ref: string };
  concentracion: string | { _type: "reference"; _ref: string };
  inspiracion: {
    usarInspiracion: boolean;
    contenido?: {
      subirImagen?: boolean;
      imagen?:
        | {
            _type: "imagenObject";
            url: string;
            alt: string;
          }
        | {
            alt: string | null;
            url: string | null;
          }
        | null;
      resena: string | null;
    };
  };
  descripcion: {
    subirImagen?: boolean;
    imagen?:
      | {
          _type: "imagenObject";
          url: string;
          alt: string;
        }
      | {
          alt: string | null;
          url: string | null;
        }
      | null;
    texto: string;
  };
  notasOlfativas: {
    familiaOlfativa: string | { _type: string; _ref: string };
    notasDeBase: (string | { _type: string; _ref: string; _key: string })[];
    notasDeCorazon: string[] | { _type: string; _ref: string; _key: string }[];
    notasDeSalida: string[] | { _type: string; _ref: string; _key: string }[];
  };
  ingredientes: string[] | { _type: string; _ref: string; _key: string }[];
  paisDeOrigen: string | { _type: string; _ref: string };
};

export const savePerfumesDeLujoProductsInSanityUsingForm = async (
  formState: {
    success: boolean;
    error: string | null;
  },
  data: {
    products: TPerfumeDeLujoExcel[];
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

  const productsToSave: TPerfumeLujoWithSanityRefs[] = [];

  const newProducts: TSanityProduct[] = products.map((product) => {
    return {
      _type: productType,
      marca: product.marca,
      titulo: product.titulo,
      imagenes: product.imagenes.map((img, i) => {
        if (img && typeof img !== "string" && img._id) {
          return {
            _type: "image",
            _key: `image-${nanoid()}`,
            asset: {
              _ref: img._id,
            },
            alt: `${product.marca} ${product.titulo} - ${i + 1}`,
          };
        } else if (typeof img === "string") {
          return {
            _type: "imageUrl",
            _key: `image-${nanoid()}`,
            alt: `${product.marca} ${product.titulo} - ${i + 1}`,
            url: img,
          };
        } else {
          // handle the case where img is undefined or an object without an _id property
          return {
            _type: "imageUrl",
            _key: `image-${nanoid()}`,
            alt: `${product.marca} ${product.titulo} - ${i + 1}`,
            url: "", // provide a default value
          };
        }
      }),
      genero: product.genero,
      concentracion: product.concentracion,
      parteDeUnSet: product.parteDeUnSet,
      inspiracion: {
        usarInspiracion: product.inspiracion?.usarInspiracion,
        contenido: product.inspiracion?.contenido
          ? {
              subirImagen: true,
              imagen: product.inspiracion.contenido.imagen
                ? {
                    url: product.inspiracion.contenido.imagen.url,
                    alt: product.inspiracion.contenido.imagen.alt,
                  }
                : {
                    url: "", // provide a default value
                    alt: "", // provide a default value
                  },
              resena: product.inspiracion.contenido.resena || null,
            }
          : {
              subirImagen: false,
              imagen: {
                url: "", // provide a default value
                alt: "", // provide a default value
              },
              resena: null,
            },
      },
      descripcion: {
        ...product.descripcion,
        imagen:
          product.descripcion && product.descripcion.imagen
            ? {
                url:
                  typeof product.descripcion.imagen === "string"
                    ? product.descripcion.imagen
                    : product.descripcion.imagen.url || null,
                alt: product.descripcion.imagen.alt || null,
              }
            : null,
      },
      notasOlfativas: product.notasOlfativas,
      ingredientes: product.ingredientes,
      paisDeOrigen: product.paisDeOrigen,
      variantes: product.variantes,
      mostrarCredito: product.mostrarCredito,
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
    let mergedProducts: TPerfumeLujoWithSanityRefs[] = [];
    await Promise.all(
      parsedProducts.data.map(async (product) => {
        const newProd: TProductWithImageUrl = {
          ...product,
          // imagenes: product.imagenes,
          marca: product.marca,
          concentracion: product.concentracion,
          inspiracion: {
            ...product.inspiracion,
            usarInspiracion: product.inspiracion.usarInspiracion || false,
            contenido: {
              ...product.inspiracion.contenido,
              imagen:
                product.inspiracion.contenido &&
                product.inspiracion.contenido.imagen
                  ? {
                      url: product.inspiracion.contenido.imagen.url || null,
                      alt: product.inspiracion.contenido.imagen.alt || null,
                    }
                  : null,
              resena: product.inspiracion.contenido?.resena || null,
            },
          },
          descripcion: {
            ...product.descripcion,
            subirImagen: true,
            imagen:
              product.descripcion && product.descripcion.imagen
                ? {
                    url: product.descripcion.imagen.url || null,
                    alt: product.descripcion.imagen.alt || null,
                  }
                : null,
          },
        };
        const ingredientes = await Promise.all(
          product.ingredientes.map(async (ingrediente) => {
            try {
              const ingredienteSanity = await sanityClient.fetch(
                `*[_type == "ingrediente" && nombre == "${ingrediente}"][0]`
              );

              if (!ingredienteSanity) {
                const newIngrediente = await sanityWriteClient.create({
                  _type: "ingrediente",
                  nombre: ingrediente,
                });

                if (!newIngrediente) {
                  throw new Error("Failed to create new ingrediente");
                }
                return {
                  _type: "reference",
                  _ref: newIngrediente._id as string,
                  _key: `ingred-${nanoid()}`,
                };
              } else {
                if (!ingredienteSanity || !ingredienteSanity._id) {
                  throw new Error("IngredienteSanity has no _id property");
                }

                return {
                  _type: "reference",
                  _ref: ingredienteSanity._id,
                  _key: `ingred-${nanoid()}`,
                };
              }
            } catch (error) {
              return {
                _type: "reference",
                _ref: "ingrediente-error",
                _key: `ingred-${nanoid()}`,
              };
            }
          })
        );

        newProd.ingredientes = ingredientes;
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

        const paisDeOrigen = await sanityClient.fetch(
          `*[_type == "paisDeOrigen" && nombre == "${product.paisDeOrigen}"][0]`
        );

        if (!paisDeOrigen) {
          const newPaisDeOrigen = await sanityWriteClient.create({
            _type: "paisDeOrigen",
            nombre: product.paisDeOrigen,
          });

          if (!newPaisDeOrigen) {
            throw new Error("Failed to create new paisDeOrigen");
          }

          newProd.paisDeOrigen = {
            _type: "reference",
            _ref: newPaisDeOrigen._id,
          };
        } else {
          newProd.paisDeOrigen = {
            _type: "reference",
            _ref: paisDeOrigen._id,
          };
        }

        const notasDeBase = await Promise.all(
          product.notasOlfativas.notasDeBase.map(async (nota) => {
            const notaSanity = await sanityClient.fetch(
              `*[_type == "notasOlfativas" && nombre == "${nota}"][0]`
            );

            if (!notaSanity) {
              const newNota = await sanityWriteClient.create({
                _type: "notasOlfativas",
                nombre: nota,
              });

              if (!newNota) {
                throw new Error("Failed to create new nota");
              }

              return {
                _type: "reference",
                _ref: newNota._id,
                _key: `nota-${nanoid()}`,
              };
            } else {
              return {
                _type: "reference",
                _ref: notaSanity._id,
                _key: `nota-${nanoid()}`,
              };
            }
          })
        );
        const notasDeSalida = await Promise.all(
          product.notasOlfativas.notasDeSalida.map(async (nota) => {
            const notaSanity = await sanityClient.fetch(
              `*[_type == "notasOlfativas" && nombre == "${nota}"][0]`
            );

            if (!notaSanity) {
              const newNota = await sanityWriteClient.create({
                _type: "notasOlfativas",
                nombre: nota,
              });
              if (!newNota) {
                throw new Error("Failed to create new nota");
              }
              return {
                _type: "reference",
                _ref: newNota._id as string,
                _key: `nota-${nanoid()}`,
              };
            } else {
              return {
                _type: "reference",
                _ref: notaSanity._id as string,
                _key: `nota-${nanoid()}`,
              };
            }
          })
        );
        const notasDeCorazon = await Promise.all(
          product.notasOlfativas.notasDeSalida.map(async (nota) => {
            const notaSanity = await sanityClient.fetch(
              `*[_type == "notasOlfativas" && nombre == "${nota}"][0]`
            );

            if (!notaSanity) {
              const newNota = await sanityWriteClient.create({
                _type: "notasOlfativas",
                nombre: nota,
              });
              if (!newNota) {
                throw new Error("Failed to create new nota");
              }
              return {
                _type: "reference",
                _ref: newNota._id as string,
                _key: `nota-${nanoid()}`,
              };
            } else {
              return {
                _type: "reference",
                _ref: notaSanity._id as string,
                _key: `nota-${nanoid()}`,
              };
            }
          })
        );

        let familiaOlfativa: {
          _type: string;
          _ref: string;
        } = {
          _type: "reference",
          _ref: "",
        };

        const sanityFamiliaOlfativa = await sanityClient.fetch(
          `*[_type == "familiasOlfativas" && nombre == "${product.notasOlfativas.familiaOlfativa}"][0]`
        );

        if (!familiaOlfativa) {
          const newFamiliaOlfativa = await sanityWriteClient.create({
            _type: "familiasOlfativas",
            nombre: product.notasOlfativas.familiaOlfativa,
          });
          if (!newFamiliaOlfativa) {
            throw new Error("Failed to create new familiaOlfativa");
          }
          familiaOlfativa = {
            _type: "reference",
            _ref: newFamiliaOlfativa._id,
          };
        } else {
          familiaOlfativa = {
            _type: "reference",
            _ref: sanityFamiliaOlfativa._id,
          };
        }

        newProd.notasOlfativas = {
          familiaOlfativa,
          notasDeBase,
          notasDeCorazon,
          notasDeSalida,
        };

        const concentracionSanity = await sanityClient.fetch(
          `*[_type == "concentracion" && nombre == "${product.concentracion}"][0]`
        );

        if (!concentracionSanity) {
          const newConcentracion = await sanityWriteClient.create({
            _type: "concentracion",
            nombre: product.concentracion,
          });
          if (!newConcentracion) {
            throw new Error("Failed to create new concentracion");
          }
          newProd.concentracion = {
            _type: "reference",
            _ref: newConcentracion._id,
          };
        } else {
          newProd.concentracion = {
            _type: "reference",
            _ref: concentracionSanity._id,
          };
        }

        await Promise.all(
          product.variantes.map(async (variante) => {
            try {
              const sanityProd =
                await findSanityProductBycodigoDeReferenciaAndProductType(
                  variante.codigoDeReferencia,
                  // "11411re",
                  product._type
                );

              if (sanityProd) {
                const updatedProduct = {
                  ...sanityProd,
                  ...newProd,
                  _id: sanityProd._id,
                  variantes: product.variantes.map((variante, index) => ({
                    ...variante,
                    codigoDeReferencia: `${variante.codigoDeReferencia}`,
                    _key: `variant-${index}-${nanoid()}`,
                    precio:
                      typeof variante.precio === "number"
                        ? numberToColombianPriceString(variante.precio)
                        : variante.precio,
                  })),
                };

                if (
                  updatedProduct._id === undefined ||
                  updatedProduct._id === null
                ) {
                  return {
                    success: false,
                    error: `Invalid product ${newProd._id} ${newProd.titulo} ${newProd.marca}`,
                  };
                }

                productsToSave.push({
                  ...updatedProduct,
                  _id: updatedProduct._id,
                });
              } else {
                const parsedProduct =
                  zodPerfumeLujoSchemaWithSanityRefs.safeParse(newProd);
                if (!parsedProduct.success) {
                  return {
                    success: false,
                    error: `Invalid product ${newProd._id} ${newProd.titulo} ${newProd.marca}`,
                  };
                }

                productsToSave.push({
                  ...parsedProduct.data,
                  _id: parsedProduct.data._id,
                });
              }
            } catch (error) {
              return console.log(error);
            }
            mergedProducts = productsToSave.reduce(
              (acc: TPerfumeLujoWithSanityRefs[], product) => {
                // Check if the product already exists in the accumulator
                const existingProduct: TPerfumeLujoWithSanityRefs | undefined =
                  acc.find(
                    (p: TPerfumeLujoWithSanityRefs) =>
                      p.titulo === product.titulo && p._type === product._type
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
          })
        );
      })
    );
    return mergedProducts;
  };

  const prodsToSave = await prepareProductsToSave();

  for (const product of prodsToSave) {
    const parsedProd = zodPerfumeLujoSchemaWithSanityRefs.safeParse(product);
    if (!parsedProd.success) {
      console.log({
        product,
        contenido: product.inspiracion.contenido,
        errors: parsedProd.error.errors,
        path: parsedProd.error.errors[0].path,
      });
      return {
        success: false,
        error: `Invalid product ${product._id} ${product.titulo} ${product.marca}`,
      };
    }

    if (parsedProd.data._id && typeof parsedProd.data._id === "string") {
      if (!savingProducts.has(parsedProd.data._id)) {
        savingProducts.set(parsedProd.data._id, true);
        console.log("updating product");
        const saveResp = await sanityWriteClient.createOrReplace({
          ...parsedProd.data,
          _id: parsedProd.data._id,
          slug: {
            _type: "slug",
            current: `/${productType}/${parsedProd.data._id}`,
          },
          variantes: parsedProd.data.variantes.map((variante) => {
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
              registroInvima: `${variante.registroInvima}`,
            };
          }),
        });
        savingProducts.delete(parsedProd.data._id);
      }
    } else {
      const _id = `${productType}-${nanoid()}`;
      if (!savingProducts.has(_id)) {
        savingProducts.set(_id, true);
        console.log("creating product");
        const saveResp = await sanityWriteClient.create({
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
              _key: variante._key || `variant-${nanoid()}`,
              precio: variante.precio,
              precioConDescuento:
                variante.precioConDescuento &&
                numberToColombianPriceString(+variante.precioConDescuento),
              registroInvima: `${variante.registroInvima}`,
            };
          }),
        });
        savingProducts.delete(_id);
      }
    }
  }
  return {
    success: true,
    error: null,
  };
};

const findSanityProductBycodigoDeReferenciaAndProductType = async (
  codigoDeReferencia: string | number,
  productType: "perfumeLujo" | "perfumePremium"
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

const zodPerfumeLujoSchemaWithSanityRefs =
  zodPerfumeLujoSchemaSanityReady.merge(
    z.object({
      _id: z.string().optional().nullable(),
      marca: z.object({
        _type: z.literal("reference"),
        _ref: z.string(),
      }),
      imagenes: z.array(zodImageUploadSchema),
      concentracion: z.object({
        _type: z.literal("reference"),
        _ref: z.string(),
      }),
      descripcion: z
        .object({
          subirImagen: z.boolean().optional().nullable(),
          imagen: z
            .object({
              url: z.string().url().optional().nullable(),
              alt: z.string().optional().nullable(),
            })
            .optional()
            .nullable(),
          texto: z.string(),
        })
        .transform((data) => ({
          ...data,
          imagenExterna: {
            ...data.imagen,
          },
        })),
      inspiracion: z.object({
        usarInspiracion: z.boolean(),
        contenido: z
          .object({
            subirImagen: z.boolean().optional().nullable(),
            imagen: z
              .object({
                url: z.string().url().optional().nullable(),
                alt: z.string().optional().nullable(),
              })
              .optional()
              .nullable(),
            resena: z.string().optional().nullable(),
          })
          .transform((data) => ({
            ...data,
            imagenExterna: {
              ...data.imagen,
            },
          }))
          .optional()
          .nullable(),
      }),
      notasOlfativas: z.object({
        familiaOlfativa: z.object({
          _type: z.literal("reference"),
          _ref: z.string(),
        }),
        notasDeBase: z.array(
          z.object({
            _type: z.literal("reference"),
            _ref: z.string(),
            _key: z.string(),
          })
        ),
        notasDeCorazon: z.array(
          z.object({
            _type: z.literal("reference"),
            _ref: z.string(),
            _key: z.string(),
          })
        ),
        notasDeSalida: z.array(
          z.object({
            _type: z.literal("reference"),
            _ref: z.string(),
            _key: z.string(),
          })
        ),
      }),
      ingredientes: z.array(
        z.object({
          _type: z.literal("reference"),
          _ref: z.string(),
          _key: z.string(),
        })
      ),
      paisDeOrigen: z.object({
        _type: z.literal("reference"),
        _ref: z.string(),
      }),
    })
  );

type TPerfumeLujoWithSanityRefs = z.infer<
  typeof zodPerfumeLujoSchemaWithSanityRefs
>;
