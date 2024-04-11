"use server";
import { z } from "zod";
import sanityClient, { sanityWriteClient } from "@/sanity/sanityClient";
import { nanoid } from "nanoid";
import { numberToColombianPriceString } from "@/utils/helpers";
import { TPerfumePremiumExcel } from "../_components/UploadedData";

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

const zodPerfumePremiumSanityReady = z.object({
  _type: z.literal("perfumePremium"),
  marca: z.string(),
  titulo: z.string(),
  variantes: z.array(
    z.object({
      codigoDeReferencia: z.string(),
      precio: z.string().or(z.number()),
      precioConDescuento: z.string().or(z.number()).optional().nullable(),
      registroInvima: z.string().or(z.number()),
      unidadesDisponibles: z.number(),
      mostrarUnidadesDisponibles: z.boolean(),
      tamano: z.number().or(z.string()),
      tag: z.string().optional().nullable(),
      _key: z.string().optional().nullable(),
    })
  ),
  descripcion: z.string(),
  detalles: z.object({
    concentracion: z.string(),
    genero: z.string(),
    notasOlfativas: z.object({
      familiaOlfativa: z.string(),
      notasDeBase: z.array(z.string()),
      notasDeCorazon: z.array(z.string()),
      notasDeSalida: z.array(z.string()),
    }),
    resenaCorta: z.string(),
  }),
  mostrarCredito: z.boolean(),
  parteDeUnSet: z.boolean(),
  imagenes: z.array(zodImageUploadSchema),
});

const zodProducts = {
  // perfumeLujo: zodPerfumeLujoSchemaSanityReady,
  perfumePremium: zodPerfumePremiumSanityReady,
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
  TPerfumePremiumWithSanityRefs,
  // | "imagenes"
  "marca" | "detalles"
> & {
  marca: string | { _type: "reference"; _ref: string };
  detalles: {
    concentracion: string;
    notasOlfativas: {
      familiaOlfativa: string | { _type: string; _ref: string };
      notasDeBase: (string | { _type: string; _ref: string; _key: string })[];
      notasDeCorazon:
        | string[]
        | { _type: string; _ref: string; _key: string }[];
      notasDeSalida: string[] | { _type: string; _ref: string; _key: string }[];
    };
    genero: string;
    resenaCorta: string;
  };
};

export const savePerfumesPremiumInSanityUsingForm = async (
  formState: {
    success: boolean;
    error: string | null;
  },
  data: {
    products: TPerfumePremiumExcel[];
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

  const productsToSave: TPerfumePremiumWithSanityRefs[] = [];

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
      parteDeUnSet: product.parteDeUnSet,
      descripcion: product.descripcion,
      detalles: {
        concentracion: product.detalles.concentracion,
        genero: product.detalles.genero,
        notasOlfativas: product.detalles.notasOlfativas,
        resenaCorta: product.detalles.resenaCorta,
      },
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
    let mergedProducts: TPerfumePremiumWithSanityRefs[] = [];
    await Promise.all(
      parsedProducts.data.map(async (product) => {
        const newProd: TProductWithImageUrl = {
          ...product,
          // imagenes: product.imagenes,
          marca: product.marca,
          detalles: {
            ...product.detalles,
            notasOlfativas: {
              ...product.detalles.notasOlfativas,
              familiaOlfativa: product.detalles.notasOlfativas.familiaOlfativa,
              notasDeBase: product.detalles.notasOlfativas.notasDeBase,
              notasDeCorazon: product.detalles.notasOlfativas.notasDeCorazon,
              notasDeSalida: product.detalles.notasOlfativas.notasDeSalida,
            },
          },
          descripcion: product.descripcion,
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

        const notasDeBase = await Promise.all(
          product.detalles.notasOlfativas.notasDeBase.map(async (nota) => {
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
          product.detalles.notasOlfativas.notasDeSalida.map(async (nota) => {
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
          product.detalles.notasOlfativas.notasDeSalida.map(async (nota) => {
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
          `*[_type == "familiasOlfativas" && nombre == "${product.detalles.notasOlfativas.familiaOlfativa}"][0]`
        );

        if (!familiaOlfativa) {
          const newFamiliaOlfativa = await sanityWriteClient.create({
            _type: "familiasOlfativas",
            nombre: product.detalles.notasOlfativas.familiaOlfativa,
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

        newProd.detalles.notasOlfativas = {
          familiaOlfativa,
          notasDeBase,
          notasDeCorazon,
          notasDeSalida,
        };

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
                  zodPerfumePremiumSchemaWithSanityRefs.safeParse(newProd);
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
              (acc: TPerfumePremiumWithSanityRefs[], product) => {
                // Check if the product already exists in the accumulator
                const existingProduct: TPerfumePremiumWithSanityRefs | undefined =
                  acc.find(
                    (p: TPerfumePremiumWithSanityRefs) =>
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
    const parsedProd = zodPerfumePremiumSchemaWithSanityRefs.safeParse(product);
    if (!parsedProd.success) {
      console.log({
        product,
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
              _key: variante._key || `variant-${nanoid()}`,
              precio: variante.precio,

              precioConDescuento:
                variante.precioConDescuento &&
                numberToColombianPriceString(+variante.precioConDescuento),
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
  codigoDeReferencia: string,
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

const zodPerfumePremiumSchemaWithSanityRefs =
  zodPerfumePremiumSanityReady.merge(
    z.object({
      _id: z.string().optional().nullable(),
      marca: z.object({
        _type: z.literal("reference"),
        _ref: z.string(),
      }),
      imagenes: z.array(zodImageUploadSchema),

      descripcion: z.string(),
      detalles: z.object({
        concentracion: z.string(),
        genero: z.string(),
        resenaCorta: z.string(),
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
      }),
    
    })
  );

type TPerfumePremiumWithSanityRefs = z.infer<
  typeof zodPerfumePremiumSchemaWithSanityRefs
>;