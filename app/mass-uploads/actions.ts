"use server";
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

  const savedFile = await saveFile(file, "documentHash");

  const fileData = await fs.readFileSync(savedFile);

  const workbook = new Workbook();

  // Read the Excel file
  await workbook.xlsx.load(fileData);
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

const zodPerfumeLujoSchemaSanityReady = z.object({
  _type: z.literal("perfumeLujo"),
  marca: z.string(),
  titulo: z.string(),
  imagenes: z.array(imageSchema),
  mostrarCredito: z.boolean(),
  genero: z.string(),
  concentracion: z.string(),
  parteDeUnSet: z.boolean(),
  descripcion: z.object({
    imagen: z.object({
      alt: z.string(),
      url: z.string().url(),
    }),
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
      precio: z.number(),
      precioConDescuento: z.number().optional().nullable(),
      codigoDeReferencia: z.string(),
      registroInvima: z.string().or(z.number()),
      unidadesDisponibles: z.number(),
      mostrarUnidadesDisponibles: z.boolean(),
      tag: z.string().optional().nullable(),
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

export const saveProductsInSanity = async (
  products: TProductType[],
  productType: string
) => {
  if (!isProductType(productType)) {
    throw new Error(`Invalid product type: ${productType}`);
  }

  const newProducts: TSanityProduct[] = products.map((product) => {
    return {
      _type: productType,
      marca: product.marca,
      titulo: product.titulo,
      imagenes: product.imagenes.map((img, i) => {
        return {
          alt: `${product.marca} ${product.titulo} - ${i + 1}`,
          url: img,
        };
      }),
      genero: product.genero,
      concentracion: product.concentracion,
      parteDeUnSet: product.parteDeUnSet,
      descripcion: product.descripcion,
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

  if (!parsedProducts.success) {
    throw new Error("Invalid products");
  }

  parsedProducts.data.forEach((product) => {
    product.variantes.forEach(async (variante) => {
      try {
        const sanityProd =
          await findSanityProductBycodigoDeReferenciaAndProductType(
            variante.codigoDeReferencia,
            // "11411re",
            product._type
          );

        type TProductWithImageUrl = Omit<
          TPerfumeLujoWithSanityRefs,
          | "imagenes"
          | "marca"
          | "concentracion"
          | "descripcion"
          | "notasOlfativas"
          | "ingredientes"
          | "paisDeOrigen"
        > & {
          imagenes: {
            _type: "imageUrl";
            _key: string;
            url: string;
          }[];
          marca: string | { _type: "reference"; _ref: string };
          concentracion: string | { _type: "reference"; _ref: string };
          descripcion: {
            subirImagen?: boolean;
            imagen:
              | {
                  _type: "imagenObject";
                  url: string;
                  alt: string;
                }
              | {
                  alt: string;
                  url: string;
                };
            texto: string;
          };
          notasOlfativas: {
            familiaOlfativa: string | { _type: string; _ref: string };
            notasDeBase: (
              | string
              | { _type: string; _ref: string; _key: string }
            )[];
            notasDeCorazon:
              | string[]
              | { _type: string; _ref: string; _key: string }[];
            notasDeSalida:
              | string[]
              | { _type: string; _ref: string; _key: string }[];
          };
          ingredientes:
            | string[]
            | { _type: string; _ref: string; _key: string }[];
          paisDeOrigen: string | { _type: string; _ref: string };
        };

        const newProd: TProductWithImageUrl = {
          ...product,
          imagenes: product.imagenes.map((img, i) => {
            return {
              _type: "imageUrl",
              _key: `image-${nanoid()}`,
              url: img.url,
            };
          }),
          marca: product.marca,
          concentracion: product.concentracion,
          descripcion: {
            ...product.descripcion,
            subirImagen: true,
            imagen: {
              // _type: "imagenObject",
              url: product.descripcion.imagen.url,
              alt: product.descripcion.imagen.alt,
            },
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

        const ingredientes = await Promise.all(
          product.ingredientes.map(async (ingrediente) => {
            const ingredienteSanity = await sanityClient.fetch(
              `*[_type == "ingrediente" && nombre == "${ingrediente}"][0]`
            );

            if (!ingredienteSanity) {
              const newIngrediente = await sanityWriteClient.create({
                _type: "ingrediente",
                nombre: ingrediente,
              });
              return {
                _type: "reference",
                _ref: newIngrediente._id as string,
                _key: `ingred-${nanoid()}`,
              };
            } else {
              return {
                _type: "reference",
                _ref: ingredienteSanity._id as string,
                _key: `ingred-${nanoid()}`,
              };
            }
          })
        );

        newProd.ingredientes = ingredientes;

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

        if (sanityProd) {
          console.log("Product found");

          const updatedProduct = {
            ...sanityProd,
            ...newProd,
            _id: sanityProd._id,
            variantes: product.variantes.map((variante, index) => ({
              ...variante,
              _key: `variant-${index}`,
            })),
          };

          const parsedProduct =
            zodPerfumeLujoSchemaWithSanityRefs.safeParse(updatedProduct);
          console.log("Product found", { parsedProduct });

          if (!parsedProduct.success) {
            throw console.log({ errors: parsedProduct.error.errors });
          }

          if (
            parsedProduct.data._id === undefined ||
            parsedProduct.data._id === null
          ) {
            throw new Error("The _id property is undefined or null");
          }

          await sanityWriteClient.createOrReplace({
            ...parsedProduct.data,
            _id: parsedProduct.data._id,
          });
        } else {
          const parsedProduct =
            zodPerfumeLujoSchemaWithSanityRefs.safeParse(newProd);
          console.log("Product not found", { parsedProduct });
          if (!parsedProduct.success) {
            throw console.log({
              errors: parsedProduct.error.errors,
              path: parsedProduct.error.errors[0].path,
            });
          }
          // console.log("Product not found", { newProd, imagenes: newProd.imagenes });
          await sanityWriteClient.create(parsedProduct.data);
        }
      } catch (error) {
        console.log(error);
      }
    });
  });
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
      imagenes: z.array(
        z.object({
          _type: z.literal("imageUrl"),
          _key: z.string(),
          url: z.string().url(),
        })
      ),
      concentracion: z.object({
        _type: z.literal("reference"),
        _ref: z.string(),
      }),
      descripcion: z
        .object({
          subirImagen: z.boolean().optional().nullable(),
          imagen: z.object({
            url: z.string().url(),
            alt: z.string(),
          }),
          texto: z.string(),
        })
        .transform((data) => ({
          ...data,
          imagen: {
            _type: "imagenExterna",
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
