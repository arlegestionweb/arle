"use server";
import {
  numberToColombianPriceString,
  toKebabCase,
} from "./../../utils/helpers";
import { type CellValue, Workbook } from "exceljs";
import fs from "fs";
import path from "path";
import { TProductType } from "./_components/UploadedData";
import { z } from "zod";
import { imageSchema } from "@/sanity/queries/pages/zodSchemas/general";
import sanityClient, { sanityWriteClient } from "@/sanity/sanityClient";
import { nanoid } from "nanoid";

const EMAIL = "email@gmail.com";
const PASSWORD = "password";

export const validateUser = async (
  formState: { success: boolean; error: string | null },
  formData: FormData
) => {
  if (
    formData.get("email") === EMAIL &&
    formData.get("password") === PASSWORD
  ) {
    return {
      success: true,
      error: null,
    };
  } else {
    return {
      success: false,
      error: "Invalid credentials",
    };
  }
};

export type excelData = {
  rowNumber: number;
  values: CellValue[] | { [key: string]: CellValue };
};
export const uploadFile = async (
  formState: {
    success: boolean;
    error: string | null;
    data: excelData[] | null;
    fileName: string | null;
  },
  formData: FormData
) => {
  console.log("File uploaded");
  const file = formData.get("file") as File;

  if (!file) {
    return {
      success: false,
      error: "No file was uploaded",
      data: null,
      fileName: null,
    };
  }

  // if (file)
  if (
    file.type !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
    file.type !== "application/vnd.ms-excel"
  ) {
    return {
      success: false,
      error: "The uploaded file is not an Excel file",
      data: null,
      fileName: null,
    };
  }

  // const savedFile = await saveFile(file, "documentHash");

  // const fileData = await fs.readFileSync(savedFile);

  const savedFile = await sanityWriteClient.assets.upload("file", file);

  const fileData = savedFile.url;

  const response = await fetch(fileData);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const workbook = new Workbook();
  await workbook.xlsx.load(buffer);

  // Read the Excel file
  // await workbook.xlsx.load(fileData);
  // Get the first worksheet
  const worksheet = workbook.worksheets[0];

  // Read the data from the worksheet
  const data: excelData[] = [];
  worksheet.eachRow((row, rowNumber) => {
    data.push({ values: row.values, rowNumber });
  });

  return {
    success: true,
    error: null,
    data,
    fileName: file.name,
  };
};

async function saveFile(file: File, documentHash: string) {
  const data = await file.arrayBuffer();
  const filePath = path.join(__dirname, file.name);

  fs.appendFileSync(filePath, Buffer.from(data));

  return filePath; // Return the file path
}

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
    usarInspiracion: z.boolean(),
    contenido: z
      .object({
        imagen: z.object({
          alt: z.string(),
          url: z.string().url(),
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
      codigoDeReferencia: z.string(),
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
  | "notasOlfativas"
  | "ingredientes"
  | "paisDeOrigen"
> & {
  // imagenes: (
  //   | {
  //       _type: "image";
  //       _key: string;
  //       asset: {
  //         _ref: string;
  //       };
  //     }
  //   | {
  //       _type: "imageUrl";
  //       _key: string;
  //       url: string;
  //     }
  // )[];
  marca: string | { _type: "reference"; _ref: string };
  concentracion: string | { _type: "reference"; _ref: string };
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

export const saveProductsInSanity = async (
  products: TProductType[],
  productType: string
) => {
  if (!isProductType(productType)) {
    throw new Error(`Invalid product type: ${productType}`);
  }

  const productsToSave: TPerfumeLujoWithSanityRefs[] = [];
  const newProducts: TSanityProduct[] = products.map((product) => {
    console.log({ imagenesAntes: product.imagenes });
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
      inspiracion: product.inspiracion,
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
  console.log({ parsedProducts });

  if (!parsedProducts.success) {
    console.log({
      errors: parsedProducts.error.errors,
      path: parsedProducts.error.errors[0].path,
    });
    throw new Error("Invalid products");
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

              // console.log({ ingredienteSanity });

              // console.log({ ingredienteSanity });
              if (!ingredienteSanity) {
                const newIngrediente = await sanityWriteClient.create({
                  _type: "ingrediente",
                  nombre: ingrediente,
                });

                // console.log({ newIngrediente });
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
                  console.log({ ingredienterror: ingredienteSanity });
                  throw new Error("IngredienteSanity has no _id property");
                }

                return {
                  _type: "reference",
                  _ref: ingredienteSanity._id,
                  _key: `ingred-${nanoid()}`,
                };
              }
            } catch (error) {
              console.log({ ingrediente });
              return {
                _type: "reference",
                _ref: "ingrediente-error",
                _key: `ingred-${nanoid()}`,
              };
            }
          })
        );

        newProd.ingredientes = ingredientes;
        // console.log({ ingredientes });
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
                // console.log("Product found");

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

                // const parsedProduct =
                //   zodPerfumeLujoSchemaWithSanityRefs.safeParse(updatedProduct);

                // if (!parsedProduct.success) {
                //   throw console.log({ errors: parsedProduct.error.errors });
                // }

                if (
                  updatedProduct._id === undefined ||
                  updatedProduct._id === null
                ) {
                  throw new Error("The _id property is undefined or null");
                }

                productsToSave.push({
                  ...updatedProduct,
                  _id: updatedProduct._id,
                });
                // console.log("Products not found", {
                //   ingredientes: parsedProduct.data.ingredientes,
                // });
              } else {
                const parsedProduct =
                  zodPerfumeLujoSchemaWithSanityRefs.safeParse(newProd);
                if (!parsedProduct.success) {
                  throw console.log({
                    errors: parsedProduct.error.errors,
                    path: parsedProduct.error.errors[0].path,
                  });
                }
                // console.log("Products not found", {
                //   ingredientes: parsedProduct.data.ingredientes,
                // });
                productsToSave.push({
                  ...parsedProduct.data,
                  _id: parsedProduct.data._id,
                });
                // console.log("Product not found", { newProd, imagenes: newProd.imagenes });
                // await sanityWriteClient.create(parsedProduct.data);
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
    console.log(
      "imagenes",
      { prodImgs: product.imagenes },
      "titulo",
      product.titulo
    );
    const parsedProd = zodPerfumeLujoSchemaWithSanityRefs.safeParse(product);
    if (!parsedProd.success) {
      throw new Error("Invalid product");
    }
    console.log("parsed:", parsedProd.data.imagenes);

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
        // console.log({ saveResp });
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
        // console.log({ saveResp });
      }
    }
  }
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
      // inspiracion:
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
