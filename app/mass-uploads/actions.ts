"use server";
import { type CellValue, Workbook } from "exceljs";
import fs from "fs";
import path from "path";
import { TProductType } from "./_components/UploadedData";
import { z } from "zod";
import { imageSchema } from "@/sanity/queries/pages/zodSchemas/general";

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

  // console.log(data);

  // console.log(file)

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
  // console.log(products, productType);
  if (!isProductType(productType)) {
    throw new Error(`Invalid product type: ${productType}`);
  }


  const newProducts: TSanityProduct[] = products.reduce(
    (acc: TSanityProduct[], product) => {
      const existingProduct = acc.find(
        (p) => p.marca === product.marca && p.titulo === product.titulo
      );

      if (existingProduct) {
        existingProduct.variantes.push(product.variante);
      } else {
        acc.push({
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
          variantes: [product.variante],
          mostrarCredito: product.mostrarCredito,
        });
      }

      return acc;
    },
    []
  );

  // console.log({ newProducts, variantesLength: newProducts.map(prod => prod.variantes.length) });

  // newProducts.forEach(prod => console.log({variantes: prod.variantes}))
  const productsParser = z.array(zodProducts[productType as keyof typeof zodProducts])

  const parsedProducts = productsParser.safeParse(newProducts);

  console.log({parsedProducts})
};
