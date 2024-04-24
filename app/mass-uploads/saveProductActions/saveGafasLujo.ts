// "use server";
// import { z } from "zod";
// import sanityClient, { sanityWriteClient } from "@/sanity/sanityClient";
// import { nanoid } from "nanoid";
// import { numberToColombianPriceString } from "@/utils/helpers";
// import { TGafasLujoExcel, TPerfumePremiumExcel } from "../_components/UploadedData";

// const zodImageUploadSchema = z
//   .object({
//     _type: z.literal("imageUrl"),
//     _key: z.string().optional().nullable(),
//     alt: z.string().optional().nullable(),
//     url: z.string().url(),
//   })
//   .or(
//     z.object({
//       _type: z.literal("image"),
//       alt: z.string().optional().nullable(),
//       _key: z.string().optional().nullable(),
//       asset: z.object({
//         _ref: z.string(),
//       }),
//     })
//   );

// const zodGafasLujoSanityReady = z.object({
//   _type: z.literal("gafasLujo"),
//   marca: z.string(),
//   modelo: z.string(),
//   variantes: z.array(
//     z.object({
//       codigoDeReferencia: z.string().or(z.number()),
//       precio: z.string().or(z.number()),
//       precioConDescuento: z.string().or(z.number()).optional().nullable(),
//       unidadesDisponibles: z.number(),
//       mostrarUnidadesDisponibles: z.boolean(),
//       tag: z.string().optional().nullable(),
//       _key: z.string().optional().nullable(),
//       colorDeLaMontura: z.string(),
//       colorDeLaVarilla: z.string(),
//       colorDelLente: z.string(),
//       imagenes: z.array(zodImageUploadSchema),
//     })
//   ),
//   descripcion: z.string(),
//   detalles: z.object({
//     usarDetalles: z.boolean(),
//     contenido: z
//       .object({
//         imagen: zodImageUploadSchema,
//         resena: z.string(),
//       })
//       .optional()
//       .nullable(),
//   }),
//   especificaciones: z.object({
//     estiloDeGafa: z.string(),
//     lente: z.object({
//       material: z.string(),
//       tipo: z.string(),
//     }),
//     montura: z.object({
//       formaDeLaMontura: z.string(),
//       materialDeLaMontura: z.string(),
//       materialDeLaVarilla: z.string(),
//     }),
//     paisDeOrigen: z.string(),
//     queIncluye: z.string(),
//     tipoDeGafa: z.string(),
//   }),
//   garantia: z.object({
//     descripcion: z.string(),
//     meses: z.string().or(z.number()),
//   }),
//   inspiracion: z.object({
//     usarInspiracion: z.boolean(),
//     contenido: z
//       .object({
//         imagen: zodImageUploadSchema,
//         resena: z.string(),
//       })
//       .optional()
//       .nullable(),
//   }),
//   monturaDetalles: z.object({
//     usarDetalles: z.boolean(),
//     contenido: z
//       .object({
//         imagen: zodImageUploadSchema,
//         resena: z.string(),
//       })
//       .optional()
//       .nullable(),
//   }),
//   genero: z.string(),
//   mostrarCredito: z.boolean(),
//   codigoDeProducto: z.string().or(z.number()),
//   parteDeUnSet: z.boolean(),
// });

// const zodProducts = {
//   // perfumeLujo: zodPerfumeLujoSchemaSanityReady,
//   // perfumePremium: zodPerfumePremiumSanityReady,
//   gafasLujo: zodGafasLujoSanityReady,
//   // gafasPremium: zodPerfumeLujoSchemaSanityReady,
//   // relojesLujo: zodPerfumeLujoSchemaSanityReady,
//   // relojesPremium: zodPerfumeLujoSchemaSanityReady,
// };

// type TSanityProduct = z.infer<typeof zodGafasLujoSanityReady>;
// // type TSanityProduct = z.infer<typeof zodPerfumeLujoSchemaSanityReady>;

// function isProductType(key: string): key is keyof typeof zodProducts {
//   return key in zodProducts;
// }
// type TProductWithImageUrl = Omit<
//   TPerfumePremiumWithSanityRefs,
//   // | "imagenes"
//   "marca" | "detalles"
// > & {
//   marca: string | { _type: "reference"; _ref: string };
//   especificaciones: {
//     paisDeOrigen: string | { _type: "reference"; _ref: string };
//     queIncluye: string;
//     tipoDeGafa: string | { _type: "reference"; _ref: string };
//     estiloDeGafa: string | { _type: "reference"; _ref: string };
//     montura: {
//       formaDeLaMontura: string | { _type: "reference"; _ref: string };
//       materialMontura: string | { _type: "reference"; _ref: string };
//       materialVarilla: string | { _type: "reference"; _ref: string };
//     };
//     lente: {
//       material: string | { _type: "reference"; _ref: string };
//       tipo: string | { _type: "reference"; _ref: string };
//     };
//   };
//   variantes: {
//     codigoDeReferencia: string;
//     precio: string | number;
//     precioConDescuento: string | number | null;
//     unidadesDisponibles: number;
//     mostrarUnidadesDisponibles: boolean;
//     tag: string | null;
//     _key: string | null;
//     colorDeLaMontura: string | { _type: "reference"; _ref: string };
//     colorDeLaVarilla: string | { _type: "reference"; _ref: string };
//     colorDelLente: string | { _type: "reference"; _ref: string };
//     imagenes: (
//       | { _type: "imageUrl"; _key: string; alt: string; url: string }
//       | { _type: "image"; _key: string; alt: string; asset: { _ref: string } }
//     )[];
//   }[];
// };

// export const saveGafasLujoInSanityUsingForm = async (
//   formState: {
//     success: boolean;
//     error: string | null;
//   },
//   data: {
//     products: TGafasLujoExcel[];
//     productType: string;
//   }
// ) => {
//   const { products, productType } = data;

//   if (!isProductType(productType)) {
//     return {
//       success: false,
//       error: `Invalid product type: ${productType}`,
//     };
//   }

//   const productsToSave: TPerfumePremiumWithSanityRefs[] = [];

//   const newProducts: TSanityProduct[] = products.map((product) => {
//     return {
//       _type: productType,
//       marca: product.marca,
//       modelo: product.modelo,
//       variantes: product.variantes.map(variante => ({
//         ...variante,
//         imagenes: variante.imagenes.map((img, i) => {
//           if (img && typeof img !== "string" && img._id) {
//             return {
//               _type: "image",
//               _key: `image-${nanoid()}`,
//               asset: {
//                 _ref: img._id,
//               },
//               alt: `${product.marca} ${product.modelo} - ${i + 1}`,
//             };
//           } else if (typeof img === "string") {
//             return {
//               _type: "imageUrl",
//               _key: `image-${nanoid()}`,
//               alt: `${product.marca} ${product.modelo} - ${i + 1}`,
//               url: img,
//             };
//           } else {
//             // handle the case where img is undefined or an object without an _id property
//             return {
//               _type: "imageUrl",
//               _key: `image-${nanoid()}`,
//               alt: `${product.marca} ${product.modelo} - ${i + 1}`,
//               url: "", // provide a default value
//             };
//           }
//         }),
//       })),
//       mostrarCredito: product.mostrarCredito,
//     };
//   });
//   const productsParser = z.array(
//     zodProducts[productType as keyof typeof zodProducts]
//   );

//   const parsedProducts = productsParser.safeParse(newProducts);

//   if (!parsedProducts.success) {
//     console.log({
//       errors: parsedProducts.error.errors,
//       path: parsedProducts.error.errors[0].path,
//     });
//     return {
//       success: false,
//       error: "Invalid products",
//     };
//   }

//   const savingProducts = new Map();

//   const prepareProductsToSave = async () => {
//     let mergedProducts: TPerfumePremiumWithSanityRefs[] = [];
//     await Promise.all(
//       parsedProducts.data.map(async (product) => {
//         const newProd: TProductWithImageUrl = {
//           ...product,
//           // imagenes: product.imagenes,
//           marca: product.marca,
//           detalles: {
//             ...product.detalles,
//             notasOlfativas: {
//               ...product.detalles.notasOlfativas,
//               familiaOlfativa: product.detalles.notasOlfativas.familiaOlfativa,
//               notasDeBase: product.detalles.notasOlfativas.notasDeBase,
//               notasDeCorazon: product.detalles.notasOlfativas.notasDeCorazon,
//               notasDeSalida: product.detalles.notasOlfativas.notasDeSalida,
//             },
//           },
//           descripcion: product.descripcion,
//         };
//         const marcaDelExcel = product.marca;

//         const marcaSanity = await sanityClient.fetch(
//           `*[_type == "marca" && titulo == "${marcaDelExcel}"][0]`
//         );

//         if (!marcaSanity) {
//           const newMarca = await sanityWriteClient.create({
//             _type: "marca",
//             titulo: marcaDelExcel,
//           });

//           if (!newMarca) {
//             throw new Error("Failed to create new marca");
//           }

//           newProd.marca = {
//             _type: "reference",
//             _ref: newMarca._id,
//           };
//         } else {
//           newProd.marca = {
//             _type: "reference",
//             _ref: marcaSanity._id,
//           };
//         }

//         const concentracionSanity = await sanityClient.fetch(
//           `*[_type == "concentracion" && nombre == "${product.detalles.concentracion}"][0]`
//         );

//         if (!concentracionSanity) {
//           const newConcentracion = await sanityWriteClient.create({
//             _type: "concentracion",
//             nombre: product.detalles.concentracion,
//           });
//           if (!newConcentracion) {
//             throw new Error("Failed to create new concentracion");
//           }
//           newProd.detalles.concentracion = {
//             _type: "reference",
//             _ref: newConcentracion._id,
//           };
//         } else {
//           newProd.detalles.concentracion = {
//             _type: "reference",
//             _ref: concentracionSanity._id,
//           };
//         }

//         const notasDeBase = await Promise.all(
//           product.detalles.notasOlfativas.notasDeBase.map(async (nota) => {
//             const notaSanity = await sanityClient.fetch(
//               `*[_type == "notasOlfativas" && nombre == "${nota}"][0]`
//             );

//             if (!notaSanity) {
//               const newNota = await sanityWriteClient.create({
//                 _type: "notasOlfativas",
//                 nombre: nota,
//               });

//               if (!newNota) {
//                 throw new Error("Failed to create new nota");
//               }

//               return {
//                 _type: "reference",
//                 _ref: newNota._id,
//                 _key: `nota-${nanoid()}`,
//               };
//             } else {
//               return {
//                 _type: "reference",
//                 _ref: notaSanity._id,
//                 _key: `nota-${nanoid()}`,
//               };
//             }
//           })
//         );
//         const notasDeSalida = await Promise.all(
//           product.detalles.notasOlfativas.notasDeSalida.map(async (nota) => {
//             const notaSanity = await sanityClient.fetch(
//               `*[_type == "notasOlfativas" && nombre == "${nota}"][0]`
//             );

//             if (!notaSanity) {
//               const newNota = await sanityWriteClient.create({
//                 _type: "notasOlfativas",
//                 nombre: nota,
//               });
//               if (!newNota) {
//                 throw new Error("Failed to create new nota");
//               }
//               return {
//                 _type: "reference",
//                 _ref: newNota._id as string,
//                 _key: `nota-${nanoid()}`,
//               };
//             } else {
//               return {
//                 _type: "reference",
//                 _ref: notaSanity._id as string,
//                 _key: `nota-${nanoid()}`,
//               };
//             }
//           })
//         );
//         const notasDeCorazon = await Promise.all(
//           product.detalles.notasOlfativas.notasDeSalida.map(async (nota) => {
//             const notaSanity = await sanityClient.fetch(
//               `*[_type == "notasOlfativas" && nombre == "${nota}"][0]`
//             );

//             if (!notaSanity) {
//               const newNota = await sanityWriteClient.create({
//                 _type: "notasOlfativas",
//                 nombre: nota,
//               });
//               if (!newNota) {
//                 throw new Error("Failed to create new nota");
//               }
//               return {
//                 _type: "reference",
//                 _ref: newNota._id as string,
//                 _key: `nota-${nanoid()}`,
//               };
//             } else {
//               return {
//                 _type: "reference",
//                 _ref: notaSanity._id as string,
//                 _key: `nota-${nanoid()}`,
//               };
//             }
//           })
//         );

//         let familiaOlfativa: {
//           _type: string;
//           _ref: string;
//         } = {
//           _type: "reference",
//           _ref: "",
//         };

//         const sanityFamiliaOlfativa = await sanityClient.fetch(
//           `*[_type == "familiasOlfativas" && nombre == "${product.detalles.notasOlfativas.familiaOlfativa}"][0]`
//         );

//         if (!familiaOlfativa) {
//           const newFamiliaOlfativa = await sanityWriteClient.create({
//             _type: "familiasOlfativas",
//             nombre: product.detalles.notasOlfativas.familiaOlfativa,
//           });
//           if (!newFamiliaOlfativa) {
//             throw new Error("Failed to create new familiaOlfativa");
//           }
//           familiaOlfativa = {
//             _type: "reference",
//             _ref: newFamiliaOlfativa._id,
//           };
//         } else {
//           familiaOlfativa = {
//             _type: "reference",
//             _ref: sanityFamiliaOlfativa._id,
//           };
//         }

//         newProd.detalles.notasOlfativas = {
//           familiaOlfativa,
//           notasDeBase,
//           notasDeCorazon,
//           notasDeSalida,
//         };

//         await Promise.all(
//           product.variantes.map(async (variante) => {
//             try {
//               const sanityProd =
//                 await findSanityProductBycodigoDeReferenciaAndProductType(
//                   variante.codigoDeReferencia,
//                   // "11411re",
//                   product._type
//                 );

//               if (sanityProd) {
//                 const updatedProduct = {
//                   ...sanityProd,
//                   ...newProd,
//                   _id: sanityProd._id,
//                   variantes: product.variantes.map((variante, index) => ({
//                     ...variante,
//                     _key: `variant-${index}-${nanoid()}`,
//                     precio:
//                       typeof variante.precio === "number"
//                         ? numberToColombianPriceString(variante.precio)
//                         : variante.precio,
//                   })),
//                 };

//                 if (
//                   updatedProduct._id === undefined ||
//                   updatedProduct._id === null
//                 ) {
//                   return {
//                     success: false,
//                     error: `Invalid product ${newProd._id} ${newProd.titulo} ${newProd.marca}`,
//                   };
//                 }

//                 productsToSave.push({
//                   ...updatedProduct,
//                   _id: updatedProduct._id,
//                 });
//               } else {
//                 const parsedProduct =
//                   zodPerfumePremiumSchemaWithSanityRefs.safeParse(newProd);
//                 if (!parsedProduct.success) {
//                   return {
//                     success: false,
//                     error: `Invalid product ${newProd._id} ${newProd.titulo} ${newProd.marca}`,
//                   };
//                 }

//                 productsToSave.push({
//                   ...parsedProduct.data,
//                   _id: parsedProduct.data._id,
//                 });
//               }
//             } catch (error) {
//               return console.log(error);
//             }
//             mergedProducts = productsToSave.reduce(
//               (acc: TPerfumePremiumWithSanityRefs[], product) => {
//                 // Check if the product already exists in the accumulator
//                 const existingProduct:
//                   | TPerfumePremiumWithSanityRefs
//                   | undefined = acc.find(
//                   (p: TPerfumePremiumWithSanityRefs) =>
//                     p.titulo === product.titulo && p._type === product._type
//                 );

//                 if (existingProduct) {
//                   // If the product already exists, merge the variants
//                   const variantes = [
//                     ...existingProduct.variantes,
//                     ...product.variantes,
//                   ];
//                   const uniqueVariantes = [];

//                   // Create a Set to store the codigoDeReferencia values
//                   const variantCodes = new Set();

//                   // Loop over the variantes array
//                   for (const variante of variantes) {
//                     // If the variant's codigoDeReferencia is not in the Set, add it to the uniqueVariantes array and the Set
//                     if (!variantCodes.has(variante.codigoDeReferencia)) {
//                       uniqueVariantes.push(variante);
//                       variantCodes.add(variante.codigoDeReferencia);
//                     }
//                   }

//                   existingProduct.variantes = uniqueVariantes;
//                 } else {
//                   // If the product doesn't exist, add it to the accumulator
//                   acc.push(product);
//                 }

//                 return acc;
//               },
//               []
//             );
//           })
//         );
//       })
//     );
//     return mergedProducts;
//   };

//   const prodsToSave = await prepareProductsToSave();

//   for (const product of prodsToSave) {
//     const parsedProd = zodPerfumePremiumSchemaWithSanityRefs.safeParse(product);
//     if (!parsedProd.success) {
//       console.log({
//         product,
//         errors: parsedProd.error.errors,
//         path: parsedProd.error.errors[0].path,
//       });
//       return {
//         success: false,
//         error: `Invalid product ${product._id} ${product.titulo} ${product.marca}`,
//       };
//     }

//     if (parsedProd.data._id && typeof parsedProd.data._id === "string") {
//       if (!savingProducts.has(parsedProd.data._id)) {
//         savingProducts.set(parsedProd.data._id, true);
//         console.log("updating product");
//         const saveResp = await sanityWriteClient.createOrReplace({
//           ...parsedProd.data,
//           _id: parsedProd.data._id,
//           slug: {
//             _type: "slug",
//             current: `/${productType}/${parsedProd.data._id}`,
//           },
//           variantes: parsedProd.data.variantes.map((variante) => {
//             return {
//               ...variante,
//               _key: variante._key || `variant-${nanoid()}`,
//               codigoDeReferencia: `${variante.codigoDeReferencia}`,
//               precio:
//                 typeof variante.precio === "number"
//                   ? numberToColombianPriceString(variante.precio)
//                   : variante.precio,
//               precioConDescuento:
//                 variante.precioConDescuento &&
//                 typeof variante.precioConDescuento === "number"
//                   ? numberToColombianPriceString(variante.precioConDescuento)
//                   : variante.precioConDescuento,
//               registroInvima: `${variante.registroInvima}`,
//             };
//           }),
//         });
//         savingProducts.delete(parsedProd.data._id);
//       }
//     } else {
//       const _id = `${productType}-${nanoid()}`;
//       if (!savingProducts.has(_id)) {
//         savingProducts.set(_id, true);
//         console.log("creating product");
//         const saveResp = await sanityWriteClient.create({
//           ...parsedProd.data,
//           _id,
//           slug: {
//             _type: "slug",
//             current: `/${productType}/${_id}`,
//           },
//           variantes: parsedProd.data.variantes.map((variante) => {
//             // const precio = numberToColombianPriceString(variante.precio);

//             return {
//               ...variante,
//               codigoDeReferencia: `${variante.codigoDeReferencia}`,
//               _key: variante._key || `variant-${nanoid()}`,
//               precio:
//                 typeof variante.precio === "number"
//                   ? numberToColombianPriceString(variante.precio)
//                   : variante.precio,
//               precioConDescuento:
//                 variante.precioConDescuento &&
//                 typeof variante.precioConDescuento === "number"
//                   ? numberToColombianPriceString(variante.precioConDescuento)
//                   : variante.precioConDescuento,
//               registroInvima: `${variante.registroInvima}`,
//             };
//           }),
//         });
//         savingProducts.delete(_id);
//       }
//     }
//   }
//   return {
//     success: true,
//     error: null,
//   };
// };

// const findSanityProductBycodigoDeReferenciaAndProductType = async (
//   codigoDeReferencia: string | number,
//   productType: "perfumeLujo" | "perfumePremium"
// ) => {
//   const query = `*[_type == "${productType}"]{...}`;

//   const products = await sanityClient.fetch(query);

//   const product = products.find(
//     (prod: { variantes: { codigoDeReferencia: string }[] }) => {
//       return prod.variantes.some((variante) => {
//         return variante.codigoDeReferencia === codigoDeReferencia;
//       });
//     }
//   );

//   return product;
// };

// const zodPerfumePremiumSchemaWithSanityRefs =
//   zodPerfumePremiumSanityReady.merge(
//     z.object({
//       _id: z.string().optional().nullable(),
//       marca: z.object({
//         _type: z.literal("reference"),
//         _ref: z.string(),
//       }),
//       imagenes: z.array(zodImageUploadSchema),

//       descripcion: z.string(),
//       detalles: z.object({
//         concentracion: z.object({
//           _type: z.literal("reference"),
//           _ref: z.string(),
//         }),
//         genero: z.string(),
//         resenaCorta: z.string().optional().nullable(),
//         notasOlfativas: z.object({
//           familiaOlfativa: z.object({
//             _type: z.literal("reference"),
//             _ref: z.string(),
//           }),
//           notasDeBase: z.array(
//             z.object({
//               _type: z.literal("reference"),
//               _ref: z.string(),
//               _key: z.string(),
//             })
//           ),
//           notasDeCorazon: z.array(
//             z.object({
//               _type: z.literal("reference"),
//               _ref: z.string(),
//               _key: z.string(),
//             })
//           ),
//           notasDeSalida: z.array(
//             z.object({
//               _type: z.literal("reference"),
//               _ref: z.string(),
//               _key: z.string(),
//             })
//           ),
//         }),
//       }),
//     })
//   );

// type TPerfumePremiumWithSanityRefs = z.infer<
//   typeof zodPerfumePremiumSchemaWithSanityRefs
// >;
