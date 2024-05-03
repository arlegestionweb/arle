"use server";

import { z } from "zod";
import { TPerfumeDeLujoExcel } from "../_components/UploadedData";
import sanityClient, { sanityWriteClient } from "@/sanity/sanityClient";
import { nanoid } from "nanoid";
import { numberToColombianPriceString } from "@/utils/helpers";

const zodInitialImage = z
  .object({
    url: z.string(),
    _id: z.string(),
  })
  .or(z.string());

const zodVariante = z.object({
  codigoDeReferencia: z.string().or(z.number()),
  precio: z.string().or(z.number()),
  precioConDescuento: z.string().or(z.number()).optional().nullable(),
  registroInvima: z.string().or(z.number()).optional().nullable(),
  unidadesDisponibles: z.number(),
  mostrarUnidadesDisponibles: z.boolean(),
  tamano: z.number(),
  etiqueta: z
    .object({
      tag: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
});
const inspiracionWithResena = z.object({
  usarInspiracion: z.literal(true),
  contenido: z.object({
    imagen: z.object({
      alt: z.string(),
      url: z.string().optional().nullable(),
      id: z.string().optional().nullable(),
    }),
    resena: z.string(),
  }),
});

const inspiracionWithoutResena = z.object({
  usarInspiracion: z.literal(false),
});

const inspiracion = z.union([inspiracionWithResena, inspiracionWithoutResena]);

// Use `inspiracion` in your main schema
const zodInitialPerfumeLujo = z.object({
  titulo: z.string(),
  marca: z.string(),
  variantes: z.array(zodVariante),
  concentracion: z.string(),
  descripcion: z.object({
    texto: z.string(),
    imagen: z.object({
      url: z.string(),
      _id: z.string().optional().nullable(),
    }),
  }),
  genero: z.string().transform((val) => val.toLowerCase()),
  ingredientes: z.array(z.string()),
  inspiracion: inspiracion,
  mostrarCredito: z.boolean(),
  notasOlfativas: z.object({
    familiaOlfativa: z.string(),
    notasDeBase: z.array(z.string()),
    notasDeCorazon: z.array(z.string()),
    notasDeSalida: z.array(z.string()),
  }),
  paisDeOrigen: z.string(),
  parteDeUnSet: z.boolean(),
  imagenes: z.array(zodInitialImage).min(1, "Agrega al menos una imagen"),
});

export type TError = {
  message: string;
  path?: string;
  product?:
    | {
        marca: string;
        titulo: string;
      }
    | {
        marca: string;
        modelo: string;
      };
};

export const savePerfumesLujo = async (
  formState: {
    success: boolean;
    errors: TError[] | null;
    message?: string;
  },
  data: {
    products: TPerfumeDeLujoExcel[];
    productType: string;
  }
) => {
  const { products, productType } = data;

  if (productType !== "perfumeLujo") {
    return {
      success: false,
      errors: [
        {
          message: `Invalid product type: ${productType}`,
        },
      ],
    };
  }

  formState.errors = null;

  const errors: TError[] = [];

  const updatedProducts = [];
  const savedProducts = [];
  const initialParsedProducts = z
    .array(zodInitialPerfumeLujo)
    .safeParse(products);

  // console.log({ initialParsedProducts });

  if (!initialParsedProducts.success) {
    console.log({ error: initialParsedProducts.error });
    const parsingErrors = extractErrorsFromIssues(
      initialParsedProducts.error.issues,
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

  const createdMarcas: { _id: string; titulo: string }[] = [];

  for (const product of initialParsedProducts.data) {
    // console.log({
    // product,
    // descripcion: product.descripcion,
    // // inspiracion: product.inspiracion,
    // inspiracionImagen: product.inspiracion?.contenido?.imagen,
    // imagenes: product.imagenes,
    // });

    const references: TZodSanityReferences = {
      ingredientes: [],
      notasOlfativas: {
        notasDeBase: [],
        notasDeCorazon: [],
        notasDeSalida: [],
      },
    };

    const sanityRefResults = await sanityClient.fetch(`{
      "marca": *[_type == "marca" && titulo == "${product.marca}"][0]{
        "_ref":_id,
        "_type": "reference"
      },
      "concentracion": *[_type == "concentracion" && nombre == "${
        product.concentracion
      }"][0]{
        "_ref":_id,
        "_type": "reference"
      },
      "ingredientes": [${product.ingredientes
        .map(
          (ingrediente) =>
            `*[_type == "ingrediente" && nombre == "${ingrediente}"][0]{
              "_ref": _id, 
              "_type": "reference", 
              nombre
            }`
        )
        .join(",")}],
        "notasOlfativas": {
          "familiaOlfativa": *[_type == "familiasOlfativas" && nombre == "${
            product.notasOlfativas.familiaOlfativa
          }"][0]{
            "_ref":_id,
            "_type": "reference",
            nombre
          },
          "notasDeBase": [${product.notasOlfativas.notasDeBase
            .map(
              (nota) => `
            *[_type == "notasOlfativas" && nombre == "${nota}"][0]{
              "_ref":_id,
              "_type": "reference",
              nombre
            }`
            )
            .join(`,`)}],
          "notasDeCorazon": [${product.notasOlfativas.notasDeCorazon
            .map(
              (nota) => `
            *[_type == "notasOlfativas" && nombre == "${nota}"][0]{
              "_ref":_id,
              "_type": "reference",
              nombre
            }`
            )
            .join(`,`)}],
          "notasDeSalida": [${product.notasOlfativas.notasDeSalida
            .map(
              (nota) => `
            *[_type == "notasOlfativas" && nombre == "${nota}"][0]{
              "_ref":_id,
              "_type": "reference",
              nombre
            }`
            )
            .join(`,`)}]
        },
        "paisDeOrigen": *[_type == "paisDeOrigen" && nombre == "${
          product.paisDeOrigen
        }"][0]{
          "_ref":_id,
          "_type": "reference",
          nombre
        },   
      
      }`);

    const zodSanityRefResults = z.object({
      marca: zodRefObject.optional().nullable(),
      concentracion: zodRefObject.optional().nullable(),
      ingredientes: z.array(
        zodRefObject
          .merge(z.object({ nombre: z.string() }))
          .optional()
          .nullable()
      ),
      notasOlfativas: z.object({
        familiaOlfativa: zodRefObject.optional().nullable(),
        notasDeBase: z.array(
          zodRefObject
            .merge(z.object({ nombre: z.string() }))
            .optional()
            .nullable()
        ),
        notasDeCorazon: z.array(
          zodRefObject
            .merge(z.object({ nombre: z.string() }))
            .optional()
            .nullable()
        ),
        notasDeSalida: z.array(
          zodRefObject
            .merge(z.object({ nombre: z.string() }))
            .optional()
            .nullable()
        ),
      }),
      paisDeOrigen: zodRefObject
        .merge(z.object({ nombre: z.string() }))
        .optional()
        .nullable(),
    });

    type TZodSanityReferences = z.infer<typeof zodSanityRefResults>;

    const sanityRefResultsParsed =
      zodSanityRefResults.safeParse(sanityRefResults);

    if (!sanityRefResultsParsed.success) {
      // console.log({ error: sanityRefResultsParsed.error });
      const parsingErrors = extractErrorsFromIssues(
        sanityRefResultsParsed.error.issues,
        products
      );

      for (const error of parsingErrors) {
        errors.push(error);
      }
    } else {
      if (!sanityRefResultsParsed.data.marca) {
        const existingMarca = createdMarcas.find(
          (m) => m.titulo === product.marca
        );

        if (existingMarca) {
          references.marca = {
            _type: "reference",
            _ref: existingMarca._id,
          };
        } else {
          const newMarca = await sanityWriteClient.create({
            _type: "marca",
            titulo: product.marca,
          });

          if (!newMarca) {
            errors.push({
              message: "Failed to create new marca",
              product: product,
            });
          } else {
            references.marca = {
              _type: "reference",
              _ref: newMarca._id,
            };
            createdMarcas.push(newMarca);
          }
        }
      } else {
        references.marca = {
          _type: "reference",
          _ref: sanityRefResultsParsed.data.marca._ref,
        };
      }

      if (!sanityRefResultsParsed.data.concentracion) {
        const newConcentracion = await sanityWriteClient.create({
          _type: "concentracion",
          nombre: product.concentracion,
        });
        if (!newConcentracion) {
          errors.push({
            message: `Fallo la creacion de una nueva concentracion ${product.concentracion}`,
            product: product,
          });
        }

        references.concentracion = {
          _type: "reference",
          _ref: newConcentracion._id,
        };
      } else {
        references.concentracion = {
          _type: "reference",
          _ref: sanityRefResultsParsed.data.concentracion._ref,
        };
      }
      if (!sanityRefResultsParsed.data.paisDeOrigen) {
        const newPaisDeOrigen = await sanityWriteClient.create({
          _type: "paisDeOrigen",
          nombre: product.paisDeOrigen,
        });
        if (!newPaisDeOrigen) {
          errors.push({
            message: `Fallo la creacion de un nuevo pais de origen ${product.paisDeOrigen}`,
            product: product,
          });
        }

        references.paisDeOrigen = {
          _type: "reference",
          _ref: newPaisDeOrigen._id,
          nombre: newPaisDeOrigen.nombre,
        };
      } else {
        references.paisDeOrigen = {
          _type: "reference",
          _ref: sanityRefResultsParsed.data.paisDeOrigen._ref,
          nombre: sanityRefResultsParsed.data.paisDeOrigen.nombre,
        };
      }

      for (const ingrediente of product.ingredientes) {
        const existingIngrediente =
          sanityRefResultsParsed.data.ingredientes?.find(
            (i) => i && i.nombre === ingrediente
          );
        if (existingIngrediente) {
          references.ingredientes.push({
            _type: "reference" as "reference",
            _ref: existingIngrediente._ref,
            nombre: existingIngrediente.nombre,
          });
        } else {
          const newIngrediente = await sanityWriteClient.create({
            _type: "ingrediente",
            nombre: ingrediente,
          });

          if (!newIngrediente) {
            errors.push({
              message: "Fallo la creacion de un nuevo ingrediente",
              product: product,
            });
          } else {
            references.ingredientes.push({
              _type: "reference" as "reference",
              _ref: newIngrediente._id,
              nombre: newIngrediente.nombre,
            });
          }
        }
      }

      if (!sanityRefResultsParsed.data.notasOlfativas.familiaOlfativa) {
        const newfamiliaOlfativa = await sanityWriteClient.create({
          _type: "familiasOlfativas",
          nombre: product.notasOlfativas.familiaOlfativa,
        });
        if (!newfamiliaOlfativa) {
          errors.push({
            message: "Fallo la creacion de una nueva familiaOlfativa",
            product: product,
          });
        }

        references.notasOlfativas.familiaOlfativa = {
          _type: "reference",
          _ref: newfamiliaOlfativa._id,
        };
      } else {
        references.notasOlfativas.familiaOlfativa = {
          _type: "reference",
          _ref: sanityRefResultsParsed.data.notasOlfativas.familiaOlfativa._ref,
        };
      }

      for (const notaDeBase of product.notasOlfativas.notasDeBase) {
        const notasDeBase =
          sanityRefResultsParsed.data.notasOlfativas.notasDeBase?.find(
            (i) => i && i.nombre === notaDeBase
          );
        if (notasDeBase) {
          references.notasOlfativas.notasDeBase.push({
            _type: "reference" as "reference",
            _ref: notasDeBase._ref,
            nombre: notasDeBase.nombre,
          });
        } else {
          const newNotasDeBase = await sanityWriteClient.create({
            _type: "notasOlfativas",
            nombre: notaDeBase,
          });

          if (!newNotasDeBase) {
            errors.push({
              message: `Fallo la creacion de una nueva nota De Base ${notaDeBase}`,
              product: product,
            });
          } else {
            references.notasOlfativas.notasDeBase.push({
              _type: "reference" as "reference",
              _ref: newNotasDeBase._id,
              nombre: newNotasDeBase.nombre,
            });
          }
        }
      }

      for (const notaDeSalida of product.notasOlfativas.notasDeSalida) {
        const notasDeSalida =
          sanityRefResultsParsed.data.notasOlfativas.notasDeBase?.find(
            (i) => i && i.nombre === notaDeSalida
          );
        if (notasDeSalida) {
          references.notasOlfativas.notasDeSalida.push({
            _type: "reference" as "reference",
            _ref: notasDeSalida._ref,
            nombre: notasDeSalida.nombre,
          });
        } else {
          const newNotasDeSalida = await sanityWriteClient.create({
            _type: "notasOlfativas",
            nombre: notaDeSalida,
          });

          if (!newNotasDeSalida) {
            errors.push({
              message: `Fallo la creacion de una nueva nota De Salida ${notaDeSalida}`,
              product: product,
            });
          } else {
            references.notasOlfativas.notasDeSalida.push({
              _type: "reference" as "reference",
              _ref: newNotasDeSalida._id,
              nombre: newNotasDeSalida.nombre,
            });
          }
        }
      }

      for (const notaDeCorazon of product.notasOlfativas.notasDeCorazon) {
        const notasDeCorazon =
          sanityRefResultsParsed.data.notasOlfativas.notasDeBase?.find(
            (i) => i && i.nombre === notaDeCorazon
          );
        if (notasDeCorazon) {
          references.notasOlfativas.notasDeCorazon.push({
            _type: "reference" as "reference",
            _ref: notasDeCorazon._ref,
            nombre: notasDeCorazon.nombre,
          });
        } else {
          const newNotasDeCorazon = await sanityWriteClient.create({
            _type: "notasOlfativas",
            nombre: notaDeCorazon,
          });

          if (!newNotasDeCorazon) {
            errors.push({
              message: `Fallo la creacion de una nueva nota De Corazon ${notaDeCorazon}`,
              product: product,
            });
          } else {
            references.notasOlfativas.notasDeCorazon.push({
              _type: "reference" as "reference",
              _ref: newNotasDeCorazon._id,
              nombre: newNotasDeCorazon.nombre,
            });
          }
        }
      }
    }

    if (
      !references.marca ||
      !references.concentracion ||
      !references.paisDeOrigen ||
      !references.notasOlfativas.familiaOlfativa ||
      references.ingredientes.some(
        (ingrediente) => ingrediente === null || ingrediente === undefined
      ) ||
      references.notasOlfativas.notasDeBase.some(
        (notasDeBase) => notasDeBase === null || notasDeBase === undefined
      ) ||
      references.notasOlfativas.notasDeCorazon.some(
        (notasDeCorazon) =>
          notasDeCorazon === null || notasDeCorazon === undefined
      ) ||
      references.notasOlfativas.notasDeSalida.some(
        (notasDeSalida) => notasDeSalida === null || notasDeSalida === undefined
      )
    ) {
      errors.push({ message: "error con las referencias" });
    } else {
      const ingredientes = references.ingredientes
        .map((ingrediente) => {
          if (ingrediente !== null && ingrediente !== undefined) {
            return {
              ...ingrediente,
              _key: ingrediente._key || nanoid(),
            };
          }
          return null;
        })
        .filter(Boolean) as Array<{
        _key: string;
        _type: "reference";
        _ref: string;
        nombre: string;
      }>;
      const notasDeBase = references.notasOlfativas.notasDeBase
        .map((nota) => {
          if (nota !== null && nota !== undefined) {
            return {
              ...nota,
              _key: nota._key || nanoid(),
            };
          }
          return null;
        })
        .filter(Boolean) as Array<{
        _key: string;
        _type: "reference";
        _ref: string;
        nombre: string;
      }>;
      const notasDeCorazon = references.notasOlfativas.notasDeCorazon
        .map((nota) => {
          if (nota !== null && nota !== undefined) {
            return {
              ...nota,
              _key: nota._key || nanoid(),
            };
          }
          return null;
        })
        .filter(Boolean) as Array<{
        _key: string;
        _type: "reference";
        _ref: string;
        nombre: string;
      }>;
      const notasDeSalida = references.notasOlfativas.notasDeSalida
        .map((nota) => {
          if (nota !== null && nota !== undefined) {
            return {
              ...nota,
              _key: nota._key || nanoid(),
            };
          }
          return null;
        })
        .filter(Boolean) as Array<{
        _key: string;
        _type: "reference";
        _ref: string;
        nombre: string;
      }>;

      const productToSave: TPerfumeDeLujoSanityReady = {
        ...product,
        marca: references.marca,
        concentracion: references.concentracion,
        ingredientes,
        notasOlfativas: {
          familiaOlfativa: references.notasOlfativas.familiaOlfativa,
          notasDeBase,
          notasDeCorazon,
          notasDeSalida,
        },
        paisDeOrigen: references.paisDeOrigen,
        descripcion: {
          texto: product.descripcion.texto,
          subirImagen: product.descripcion.imagen._id ? false : true,
          imagen: product.descripcion.imagen._id
            ? {
                _type: "image" as "image",
                _key: `image-${nanoid()}`,
                asset: {
                  _ref: product.descripcion.imagen._id,
                },
                alt: `${product.marca} ${product.titulo}`,
              }
            : undefined,
          imagenExterna: !product.descripcion.imagen._id
            ? {
                _type: "imageUrl" as "imageUrl",
                _key: `image-${nanoid()}`,
                alt: `${product.marca} ${product.titulo}`,
                url: product.descripcion.imagen.url,
              }
            : undefined,
        },
        // inspiracion: product.inspiracion.usarInspiracion ? {
        //   usarInspiracion: true,
        //   contenido: {
        //     resena:
        //       product.inspiracion.usarInspiracion &&
        //       product.inspiracion.contenido?.resena
        //         ? product.inspiracion.contenido.resena
        //         : undefined,
        //     subirImagen: product.inspiracion.contenido?.imagen?.id
        //       ? false
        //       : true,
        //     imagen: product.inspiracion.contenido?.imagen?.id
        //       ? {
        //           _type: "image" as "image",
        //           _key: `image-${nanoid()}`,
        //           asset: {
        //             _ref: product.inspiracion.contenido?.imagen.id,
        //           },
        //           alt: `${product.marca} ${product.titulo}`,
        //         }
        //       : undefined,
        //     imagenExterna:
        //       !product.inspiracion.contenido?.imagen?.id &&
        //       product.inspiracion.contenido?.imagen?.url
        //         ? {
        //             _type: "imageUrl" as "imageUrl",
        //             _key: `image-${nanoid()}`,
        //             alt: `${product.marca} ${product.titulo}`,
        //             url: product.inspiracion.contenido?.imagen.url,
        //           }
        //         : undefined,
        //   },
        // } : {
        //   usarInspiracion: false,
        //   contenido: {}
        // },
        inspiracion: product.inspiracion.usarInspiracion
          ? {
              usarInspiracion: true,
              contenido: {
                resena:
                  "resena" in product.inspiracion.contenido
                    ? product.inspiracion.contenido?.resena
                    : "",
                subirImagen:
                  "imagen" in product.inspiracion.contenido &&
                  product.inspiracion.contenido?.imagen?.id
                    ? false
                    : true,
                imagen:
                  "imagen" in product.inspiracion.contenido &&
                  product.inspiracion.contenido?.imagen?.id
                    ? {
                        _type: "image" as "image",
                        _key: `image-${nanoid()}`,
                        asset: {
                          _ref: product.inspiracion.contenido?.imagen.id,
                        },
                        alt: `${product.marca} ${product.titulo}`,
                      }
                    : undefined,
                imagenExterna:
                  "imagen" in product.inspiracion.contenido &&
                  !product.inspiracion.contenido?.imagen?.id &&
                  product.inspiracion.contenido?.imagen?.url
                    ? {
                        _type: "imageUrl" as "imageUrl",
                        _key: `image-${nanoid()}`,
                        alt: `${product.marca} ${product.titulo}`,
                        url: product.inspiracion.contenido?.imagen.url,
                      }
                    : undefined,
              },
            }
          : {
              usarInspiracion: false,
              contenido: {
                resena: "",
                subirImagen: false,
              },
            },
        imagenes: product.imagenes.map((imagen) => {
          if (typeof imagen === "string") {
            return {
              _type: "imageUrl" as "imageUrl",
              _key: `image-${nanoid()}`,
              alt: `${product.marca} ${product.titulo}`,
              url: imagen,
            };
          } else {
            return {
              _type: "image" as "image",
              _key: `image-${nanoid()}`,
              asset: {
                _ref: imagen._id,
              },
              alt: `${product.marca} ${product.titulo}`,
            };
          }
        }),
        variantes: product.variantes.map((variante) => {
          return {
            ...variante,
            _key: nanoid(),
            precio:
              typeof variante.precio === "number"
                ? numberToColombianPriceString(variante.precio)
                : variante.precio,
            precioConDescuento:
              variante.precioConDescuento &&
              typeof variante.precioConDescuento === "number"
                ? numberToColombianPriceString(variante.precioConDescuento)
                : `${variante.precioConDescuento}`,
            codigoDeReferencia: `${variante.codigoDeReferencia}`,
          };
        }),
      };

      const parsedProductToSave =
        zodPerfumeLujoWithReferences.safeParse(productToSave);

      if (!parsedProductToSave.success) {
        const parsingErrors = extractErrorsFromIssues(
          parsedProductToSave.error.issues,
          products
        );

        for (const error of parsingErrors) {
          errors.push(error);
        }
      } else {
        const sanityProduct = await sanityClient.fetch(
          `*[_type == "perfumeLujo" && titulo == "${product.titulo}"][0]{...}`
        );

        if (
          sanityProduct &&
          sanityProduct.marca._ref === references.marca._ref
        ) {
          console.log("updating product");
          const updatedProduct = await sanityWriteClient.createOrReplace({
            ...sanityProduct,
            ...parsedProductToSave.data,
          });

          if (!updatedProduct) {
            errors.push({
              message: `Fallo la actualizacion del producto ${product.titulo}`,
              product: product,
            });
          } else {

            console.log({ updatedProduct });
            // return {
            //   success: true,
            //   errors: null,
            // };
          }
        } else {
          console.log("creating product");
          const _id = `pl_${nanoid()}`;

          const newProduct = await sanityWriteClient.create({
            ...parsedProductToSave.data,
            _id,
            _type: "perfumeLujo",
            slug: {
              current: `/${productType}/${_id}`,
            },
          });

          if (!newProduct) {
            errors.push({
              message: `Fallo la creacion del producto ${product.titulo}`,
              product: product,
            });
          } else {

            console.log({ newProduct });
            // return {
            //   success: true,
            //   errors: null,
            // }
          }
        }
      }
    }
  }

  return {
    success: true,
    errors: [],
  };
};

function extractErrorsFromIssues<
  T extends { marca: string; titulo?: string; modelo?: string }
>(issues: z.ZodError["issues"], products: T[]) {
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
        titulo: errorProduct?.titulo || "",
        modelo: errorProduct?.modelo || "",
      },
    });
  }
  return errors;
}

const zodRefObject = z.object({
  _type: z.literal("reference"),
  _ref: z.string(),
  _key: z.string().optional().nullable(),
});

type TSanityReference = z.infer<typeof zodRefObject>;

const zodSanityImageReference = z.object({
  _type: z.literal("image"),
  alt: z.string(),
  _key: z.string(),
  asset: z.object({
    _ref: z.string(),
  }),
});

const zodImagenExterna = z.object({
  _type: z.literal("imageUrl"),
  _key: z.string(),
  alt: z.string(),
  url: z.string().url(),
});

const zodImageSchema = zodSanityImageReference.or(zodImagenExterna);

const zodPerfumeLujoWithReferences = zodInitialPerfumeLujo.merge(
  z.object({
    _id: z.string().optional().nullable(),
    marca: zodRefObject,
    concentracion: zodRefObject,
    descripcion: z.object({
      texto: z.string(),
      subirImagen: z.boolean(),
      imagen: zodSanityImageReference.optional().nullable(),
      imagenExterna: zodImagenExterna.optional().nullable(),
    }),
    ingredientes: z.array(zodRefObject),
    inspiracion: z.object({
      usarInspiracion: z.boolean(),
      contenido: z.object({
        resena: z.string().optional().nullable(),
        subirImagen: z.boolean(),
        imagen: zodSanityImageReference.optional().nullable(),
        imagenExterna: zodImagenExterna.optional().nullable(),
      }),
    }),
    notasOlfativas: z.object({
      familiaOlfativa: zodRefObject,
      notasDeBase: z.array(zodRefObject),
      notasDeCorazon: z.array(zodRefObject),
      notasDeSalida: z.array(zodRefObject),
    }),
    paisDeOrigen: zodRefObject,
    imagenes: z.array(zodImageSchema),
    variantes: z.array(
      zodVariante.merge(
        z.object({
          _key: z.string(),
          precio: z.string(),
          codigoDeReferencia: z.string(),
          precioConDescuento: z.string().optional().nullable(),
        })
      )
    ),
    // slug: z.object({
    //   current: z.string(),
    // }),
  })
);

type TPerfumeDeLujoSanityReady = z.infer<typeof zodPerfumeLujoWithReferences>;
