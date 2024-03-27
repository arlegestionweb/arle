import sanityClient, { sanityWriteClient } from "@/sanity/sanityClient";
import { columnLetterToNumber, incrementColumnLetter } from "@/utils/helpers";
import { convertirCamelCaseATitulo } from "@/app/_lib/utils";
import * as ExcelJS from "exceljs";
import { Stream } from "stream";
import { NextApiResponse } from "next";
import { promisify } from "util";

type NestedKey = {
  path: string[];
  reference: boolean;
  options: any[];
  boolean?: boolean;
  array?: boolean;
  order: number;
};

export const dynamic = "force-dynamic"; // defaults to auto

function getNestedKeys2(
  obj: any,
  path: string[] = [],
  oldOrder: number = Infinity
): NestedKey[] {
  return Object.entries(obj).reduce(
    (result: NestedKey[], [key, value]: [string, any]) => {
      if (key === "order") {
        return result;
      }

      const newPath = path.includes(key) ? path : path.concat(key);

      const order = value?.order || oldOrder;

      if (typeof value !== "object" || value === null || Array.isArray(value)) {
        if (obj.boolean) {
          result.push({
            path: newPath,
            reference: value?.reference || false,
            options: value?.options || [],
            boolean: true,
            order,
          });
        } else if (obj.reference) {
          if (!result.find((item) => item.path.includes(path[0]))) {
            result.push({
              path: newPath,
              reference: obj?.reference || false,
              options: obj?.options || [],
              order,
            });
          }
        } else if (obj.array) {
          if (!result.find((item) => item.path.includes(path[0]))) {
            const newObj = {
              path: newPath,
              reference: obj?.reference || false,
              options: obj?.options || [],
              array: obj?.array || false,
              order,
            };
            result.push(newObj);
          }
        } else {
          result.push({
            order,
            path: newPath,
            reference: value?.reference || false,
            options: value?.options || [],
          });
        }
      } else {
        result.push(...getNestedKeys2(value, newPath, order));
      }
      return result;
    },
    []
  );
}
// const ExcelJS = require('exceljs');
async function createWorkbook2(docKeys: NestedKey[], file: string) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("My Sheet");
  const optionsSheet = workbook.addWorksheet("Options");
  let columnLetter = "A";

  docKeys.forEach((docKey) => {
    docKey.path.forEach((part, index) => {
      let cell = sheet.getCell(`${columnLetter}${index + 1}`);
     
      if (convertirCamelCaseATitulo(part) === "Array") {
        cell.value =
          "Encuentra las opciones para este campo en la fila 5 de esta columna, las opciones deben ir en un solo campo separados por comas.";
      }
      if (
        convertirCamelCaseATitulo(part) !== "Reference" &&
        convertirCamelCaseATitulo(part) !== "Boolean" &&
        convertirCamelCaseATitulo(part) !== "Array" &&
        convertirCamelCaseATitulo(part) !== "Nombre"
      ) {
        cell.value = convertirCamelCaseATitulo(part);
        cell.font = { bold: true };
      }

      if (docKey.path[0] === "genero") {
        const options = ["mujer", "hombre", "unisex"];

        options.forEach((option, index) => {
          optionsSheet.getCell(`${columnLetter}${index + 1}`).value = option;
        });

        const range = `Options!$${columnLetter}$1:$${columnLetter}$${options.length}`;

        for (let i = 6; i <= 106; i++) {
          const cell = sheet.getCell(`${columnLetter}${i}`);
          cell.dataValidation = {
            type: "list",
            formulae: [range],
            // allowBlank: true, // Allow empty cells (optional)
          };
        }
      }

      if (docKey.array) {
        const options = docKey.options.map((option) => option.nombre);

        options.forEach((option, index) => {
          optionsSheet.getCell(`${columnLetter}${index + 1}`).value = option;
        });

        const range = `Options!$${columnLetter}$1:$${columnLetter}$${options.length}`;
        const cell = sheet.getCell(`${columnLetter}${5}`);
        cell.dataValidation = {
          type: "list",
          formulae: [range],
        };
      }

      if (docKey.boolean && index === docKey.path.length - 1) {
        const options = ["si", "no"];

        options.forEach((option, index) => {
          optionsSheet.getCell(`${columnLetter}${index + 1}`).value = option;
        });

        const range = `Options!$${columnLetter}$1:$${columnLetter}$${options.length}`;
        for (let i = 6; i <= 106; i++) {
          const cell = sheet.getCell(`${columnLetter}${i}`);
          cell.dataValidation = {
            type: "list",
            formulae: [range],
            // allowBlank: true, // Allow empty cells (optional)
          };
        }
      }

      // If the docKey has the 'reference' flag, add options to the cell
      if (docKey.reference && index === docKey.path.length - 1) {
        // Add the options to the options sheet
        docKey.options
          .sort((optionA, optionB) =>
            optionA.nombre.localeCompare(optionB.nombre)
          )
          .forEach((option, index) => {
            optionsSheet.getCell(`${columnLetter}${index + 1}`).value =
              option.nombre;
          });

        const range = `Options!$${columnLetter}$1:$${columnLetter}$${docKey.options.length}`;
        // optionColumnLetter = incrementColumnLetter(optionColumnLetter);
        for (let i = 6; i <= 106; i++) {
          const cell = sheet.getCell(`${columnLetter}${i}`);
          cell.dataValidation = {
            type: "list",
            formulae: [range],
            // allowBlank: true, // Allow empty cells (optional)
          };
        }
      }
    });
    // optionColumnLetter = incrementColumnLetter(optionColumnLetter);
    columnLetter = incrementColumnLetter(columnLetter);
  });

  for (let rowNumber = 1; rowNumber <= 3; rowNumber++) {
    let startColumnForMerge = "A";
    let mergeRanges = [];

    for (
      let columnLetter = "A";
      columnLetter !== "XFD" &&
      sheet.getCell(`${columnLetter}${rowNumber}`).value !== undefined;
      columnLetter = incrementColumnLetter(columnLetter)
    ) {
      const value = sheet.getCell(`${columnLetter}${rowNumber}`).value;
      const nextValue = sheet.getCell(
        `${incrementColumnLetter(columnLetter)}${rowNumber}`
      ).value;

      // If the current value is not the same as the next value, add the range to mergeRanges
      if (value !== nextValue) {
        mergeRanges.push({
          top: rowNumber,
          left: columnLetterToNumber(startColumnForMerge),
          bottom: rowNumber,
          right: columnLetterToNumber(columnLetter),
        });
        startColumnForMerge = incrementColumnLetter(columnLetter);
      }
    }
    // Merge the cells in each range in mergeRanges
    mergeRanges.forEach((range) => {
      sheet.mergeCells(range);
    });
  }

  // Add 6 more columns for images
  for (let i = 0; i < 6; i++) {
    if (columnLetterToNumber(columnLetter) <= 16384) {
      const cell = sheet.getCell(`${columnLetter}1`);
      cell.value = `Image-${i + 1}`;
      cell.font = { bold: true };
      columnLetter = incrementColumnLetter(columnLetter);
    }
  }
  // for (let row = 6; row <= 106; row++) {
  //   for (let col = 1; col <= columnLetterToNumber(columnLetter); col++) {
  //     const cell = sheet.getCell(row, col);
  //     cell.border = {
  //       top: { style: "thin" },
  //       left: { style: "thin" },
  //       bottom: { style: "thin" },
  //       right: { style: "thin" },
  //     };
  //   }
  // }

  return workbook;
}

const productQueryString: Record<string, string> = {
  perfumeLujo: `
    "codigoDeProducto": {
      "order": 1,
      _id
    },
    "titulo": {
      "order": 2,
      titulo
    },
    "inspiracion": {
      "usarInspiracion":  {
        "boolean": true,
      },
      "contenido":  {
        "resena": contenido.resena,
        "imagen":  {
          "alt": contenido.imagen.alt,
          "url": contenido.imagen.asset->url,
        }
      }
    },
    'variante': variantes[0]{
      "codigoDeReferencia": {
        "order": 4,
        codigoDeReferencia
      },
      "unidadesDisponibles": {
        "order": 5,
        unidadesDisponibles
      },
      "registroInvima": {
        "order": 6,
        registroInvima
      },
      "tag": {
        "order": 7,
        "nombre": "Etiqueta",
        "reference": true,
        "options": [
          {
            "nombre": "Nuevo"
          }, 
          {
            "nombre": "Mas Vendido"
          }, 
          {
            "nombre": "Super Descuento"
          }
        ]
      },
      "precioConDescuento": {
        "order": 8,
        precioConDescuento
      },
      "mostrarUnidadesDisponibles": {
        "boolean": true,
        "order": 9,
      },
      "tamano": {
        "order": 10,
        tamano
      },
      "precio": {
        "order": 3,
        precio
      },
    },
    genero,
    "parteDeUnSet": {
      "boolean": true,
    },
    "concentracion": concentracion -> {
      "reference": true,
      nombre,
      "options": *[_type == "concentracion"] {nombre}
    },
    "notasOlfativas": notasOlfativas {
      "notasDeBase": notasDeBase [] -> {
        nombre,
        "array": true,
        "options": *[_type == "notasOlfativas"] {nombre}
      },
      "notasDeSalida": notasDeSalida [0] -> {
        "array": true,
        nombre,
        "options": *[_type == "notasOlfativas"] {nombre}
      },
      "familiaOlfativa": familiaOlfativa -> {
        nombre,
        "reference": true,
        "options": *[_type == "familiasOlfativas"] {nombre}
      },
      "notasDeCorazon": notasDeCorazon [0] -> {
        "array": true,
        nombre,
        "options": *[_type == "notasOlfativas"] {nombre}
      },
    },
    "ingredientes": ingredientes [0] -> {
      "array": true,
      nombre,
      "options": *[_type == "ingrediente"] {nombre}
    },
    "mostrarCredito": {
      "boolean": true,
    },
    "marca": marca -> {
      "order": 12,
      "nombre": titulo, 
      "reference": true, 
      "options": *[_type == "marca"] {"nombre": titulo}
    },
    "descripcion": descripcion {
      texto,
      "imagen": imagen {
        alt,
        "url": asset->url,
      }
    },
    'paisDeOrigen': paisDeOrigen -> {
      nombre,
      "reference": true,
      "options": *[_type == "paisDeOrigen"] {nombre}
    }, 
    coleccionDeMarca
    `,
  perfumePremium: `
    "codigoDeProducto": _id,
    descripcion,
    "detalles": detalles {
      genero,
      "concentracion": concentracion -> {
        "reference": true,
        nombre,
        "options": *[_type == "concentracion"] {nombre}
      },
      resenaCorta,
      "notasOlfativas": notasOlfativas {
        "notasDeBase": notasDeBase [] -> nombre,
        "notasDeSalida": notasDeSalida [] -> nombre,
        "familiaOlfativa": familiaOlfativa -> {
          nombre,
          "reference": true,
          "options": *[_type == "familiasOlfativas"] {nombre}
        },
        "notasDeCorazon": notasDeCorazon [] -> nombre
      },
    },
    titulo,
    "mostrarCredito": {
      "boolean": true,
    },
    "marca": marca -> {"nombre": titulo, "reference": true, "options": *[_type == "marca"] {"nombre": titulo}},
    'variante': variantes[0]{
      tamano,
      tag,
      precio,
      codigoDeReferencia,
      registroInvima,
      unidadesDisponibles,
      "mostrarUnidadesDisponibles": {
        "boolean": true,
      },
      precioConDescuento
    },
    "parteDeUnSet": {
      "boolean": true,
    },
    'paisDeOrigen': paisDeOrigen -> {
      nombre,
      "reference": true,
      "options": *[_type == "paisDeOrigen"] {nombre}
    }, 
    coleccionDeMarca
    `,
  gafasLujo: `
    "codigoDeProducto": _id,
    "marca": marca -> {
      "nombre": titulo, 
      "reference": true, 
      "options": *[_type == "marca"] {"nombre": titulo}
    },
    modelo,
    descripcion,
    genero,
    "mostrarCredito": {
      "boolean": true
    },
    "garantia": garantia { 
      meses, 
      descripcion
    },
    "inspiracion": inspiracion {
      "usarInspiracion":  {
        "boolean": true,
      },
      "contenido":  {
        "resena": contenido.resena,
        "imagen":  {
          "alt": contenido.imagen.alt,
          "url": contenido.imagen.asset->url,
        }
      }
    },
    "detalles": detalles {
      "usarDetalles":  {
        "boolean": true,
      },
      "contenido":  {
        "resena": contenido.resena,
        "imagen":  {
          "alt": contenido.imagen.alt,
          "url": contenido.imagen.asset->url,
        }
      }
    },
    "monturaDetalles": monturaDetalles {
      "usarDetalles":  {
        "boolean": true,
      },
      "contenido":  {
        "resena": contenido.resena,
        "imagen":  {
          "alt": contenido.imagen.alt,
          "url": contenido.imagen.asset->url
        }
      }
    },
    "especificaciones": especificaciones {
      'paisDeOrigen': paisDeOrigen -> {
        nombre,
        "reference": true,
        "options": *[_type == "paisDeOrigen"] {nombre}
      }, 
      queIncluye,
      "tipoDeGafa": tipoDeGafa -> {
        "nombre": titulo,
        "reference": true,
        "options": *[_type == "tipoDeGafa"] {"nombre": titulo}
      },
      "estiloDeGafa": estiloDeGafa -> {
        "nombre": titulo,
        "reference": true,
        "options": *[_type == "estiloDeGafa"] {"nombre": titulo}
      },
      "montura": montura {
        "formaDeLaMontura": formaDeLaMontura -> {
          "nombre": titulo,
          "reference": true,
          "options": *[_type == "formaDeLaMontura"] {"nombre": titulo}
        },
        "materialMontura": materialMontura -> {
          "nombre": titulo,
          "reference": true,
          "options": *[_type == "materialDelMarco"] {"nombre": titulo}
        },
        "materialVarilla": materialVarilla -> {
          "nombre": titulo,
          "reference": true,
          "options": *[_type == "materialDeLaVarilla"] {"nombre": titulo}
        },
      },
      "lente": lente {
        "material": material -> {
          "nombre": titulo,
          "reference": true,
          "options": *[_type == "materialDelLente"] {"nombre": titulo}
        },
        "tipo": tipo -> {
          "nombre": titulo,
          "reference": true,
          "options": *[_type == "tipoDeLente"] {"nombre": titulo}
        },
      },
    },
    coleccionDeMarca,
    'variante': variantes[0] {
      codigoDeReferencia,
      "colorDelLente": colorDelLente -> {
        nombre,
        "reference": true,
        "options": *[_type == "colores"] {nombre}
      },
      "colorDeLaVarilla": colorDeLaVarilla -> {
        nombre,
        "reference": true,
        "options": *[_type == "colores"] {nombre}
      },
      "colorDeLaMontura": colorDeLaMontura -> {
        nombre,
        "reference": true,
        "options": *[_type == "colores"] {nombre}
      },
      unidadesDisponibles,
      precio,
      precioConDescuento,
      tag,
      "mostrarUnidadesDisponibles": {
        "boolean": true,
      },
    }
  `,
  gafasPremium: `
  "mostrarCredito": {
    "boolean": true,
  },
  "codigoDeProducto": _id,
  "marca": marca -> {
    "nombre": titulo, 
    "reference": true, 
    "options": *[_type == "marca"] {"nombre": titulo}
  },
  "variante": variantes[0] {
      "colorDelLente": colorDelLente -> {
        nombre,
        "reference": true,
        "options": *[_type == "colores"] {nombre}
      },
      "colorDeLaVarilla": colorDeLaVarilla -> {
        nombre,
        "reference": true,
        "options": *[_type == "colores"] {nombre}
      },
      "colorDeLaMontura": colorDeLaMontura -> {
        nombre,
        "reference": true,
        "options": *[_type == "colores"] {nombre}
      },
      precioConDescuento,
      codigoDeReferencia,
      unidadesDisponibles,
      precio,
      tag,
      "mostrarUnidadesDisponibles": {
        "boolean": true,
      }
    },
    modelo,
    genero,
    descripcion,
    "detalles": detalles {
      "tipoDeGafa": tipoDeGafa -> {
        "nombre": titulo,
        "reference": true,
        "options": *[_type == "tipoDeGafa"] {"nombre": titulo}
      },
      "estiloDeGafa": estiloDeGafa -> {
        "nombre": titulo,
        "reference": true,
        "options": *[_type == "estiloDeGafa"] {"nombre": titulo}
      },
      "lente": lente {
        "material": material -> {
          "nombre": titulo,
          "reference": true,
          "options": *[_type == "materialDelLente"] {"nombre": titulo}
        },
        "tipo": tipo -> {
          "nombre": titulo,
          "reference": true,
          "options": *[_type == "tipoDeLente"] {"nombre": titulo}
        },
      },
      "montura": montura {
        "formaDeLaMontura": formaDeLaMontura -> {
          "nombre": titulo,
          "reference": true,
          "options": *[_type == "formaDeLaMontura"] {"nombre": titulo}
        },
        "materialMontura": materialMontura -> {
          "nombre": titulo,
          "reference": true,
          "options": *[_type == "materialDelMarco"] {"nombre": titulo}
        },
        "materialVarilla": materialVarilla -> {
          "nombre": titulo,
          "reference": true,
          "options": *[_type == "materialDeLaVarilla"] {"nombre": titulo}
        },
      },
    },
    "garantia": garantia { 
      meses, 
      descripcion
    },
  `,
  relojesLujo: `
    "mostrarCredito": {
      "boolean": true,
    },
    genero,
    "marca": marca -> {
      "nombre": titulo, 
      "reference": true, 
      "options": *[_type == "marca"] {"nombre": titulo}
    },
    "codigoDeProducto": _id,
    "detalles": detalles {
      "usarDetalles":  {
        "boolean": true,
      },
      "contenido":  {
        "resena": contenido.resena,
        "imagen":  {
          "alt": contenido.imagen.alt,
          "url": contenido.imagen.asset->url,
        }
      }
    },
    "especificaciones": especificaciones {
      "tipoDeReloj": tipoDeReloj -> {
        "nombre": titulo, 
        "reference": true,
        "options": *[_type == "tipoDeReloj"] {"nombre": titulo}
      },
      "estiloDeReloj": estiloDeReloj -> {
        "nombre": titulo, 
        "reference": true,
        "options": *[_type == "estiloDeReloj"] {"nombre": titulo}
      },
      "resistenciaAlAgua": {
        "boolean": true,
      },
      "funciones": funciones [] -> {
        "nombre": titulo,
        descripcion
      },
      "materialDelPulso": material -> {
        nombre,
        "reference": true,
        "options": *[_type == "materialDelPulso"] {nombre}
      }
    },
    "variante": variantes[0]{
      precioConDescuento,
      precio,
      "colorTablero": colorTablero -> nombre,
      unidadesDisponibles,
      "mostrarUnidadesDisponibles": {
        "boolean": true,
      },
      codigoDeReferencia,
      tag,
      "colorCaja": colorCaja -> {
        nombre,
        "reference": true,
        "options": *[_type == "colores"] {nombre}
      },
      "colorPulso": colorPulso -> {
        nombre,
        "reference": true,
        "options": *[_type == "colores"] {nombre}
      },
      "colorTablero": colorTablero -> {
        nombre,
        "reference": true,
        "options": *[_type == "colores"] {nombre}
      },
    },
    "inspiracion": inspiracion {
      "usarInspiracion":  {
        "boolean": true,
      },
      "contenido":  {
        "resena": contenido.resena,
        "imagen":  {
          "alt": contenido.imagen.alt,
          "url": contenido.imagen.asset->url,
        }
      }
    },
    modelo,
    "garantia": garantia { 
      meses, 
      descripcion
    },
    "movimiento": movimiento {
      "usarMovimiento": {
        "boolean": true,
      },
      "tipoDeMovimiento": tipoDeMovimiento -> {
        "nombre": titulo,
        "reference": true,
        "options": *[_type == "tipoDeMovimiento"] {"nombre": titulo}
      },
      "contenido": contenido {
        descripcion,
        "imagen": imagen {
          alt,
          "url": asset->url,
        }
      }
    },
    "caja": caja {
      diametro,
      "material": material -> {
        nombre,
        "reference": true,
        "options": *[_type == "materialDeCaja"] {nombre}
      },
      "cristal": cristal -> {
        titulo,
        "reference": true,
        "options": *[_type == "cristal"] {"nombre": titulo}
      }
    },
    coleccionDeMarca,
    descripcion,
  `,
  relojesPremium: `
    "variante": variantes[0]{
      precio,
      precioConDescuento,
      "colorTablero": colorTablero -> {
        nombre,
        "reference": true,
        "options": *[_type == "colores"] {nombre}
      },
      codigoDeReferencia,
      tag,
      unidadesDisponibles,
      "mostrarUnidadesDisponibles": {
        "boolean": true,
      },
      "colorCaja": colorCaja -> {
        nombre,
        "reference": true,
        "options": *[_type == "colores"] {nombre}
      },
      "colorPulso": colorPulso -> {
        nombre,
        "reference": true,
        "options": *[_type == "colores"] {nombre}
      }
    },
    "codigoDeProducto": _id,
    modelo,
    descripcion,
    "garantia": garantia { 
      meses, 
      descripcion
    },
    "marca": marca -> {
      "nombre": titulo, 
      "reference": true, 
      "options": *[_type == "marca"] {"nombre": titulo}
    },
    "detallesReloj": detallesReloj {
      "tipoDeReloj": tipoDeReloj -> {
        "nombre": titulo, 
        "reference": true,
        "options": *[_type == "tipoDeReloj"] {"nombre": titulo}
      },
      "estiloDeReloj": estiloDeReloj -> {
        "nombre": titulo, 
        "reference": true,
        "options": *[_type == "estiloDeReloj"] {"nombre": titulo}
      },
      "funciones": funciones [] -> {
        titulo,
        descripcion
      },
      "resistenciaAlAgua": {
        "boolean": true,
      },
      "material": material -> nombre,
      "tipoDeMovimiento": tipoDeMovimiento -> titulo,
      "caja": caja {
        diametro,
        "materialDelPulso": material -> {
          nombre,
          "reference": true,
          "options": *[_type == "materialDelPulso"] {nombre}
        },
        "cristal": cristal -> {
          titulo,
          "reference": true,
          "options": *[_type == "cristal"] {"nombre": titulo}
        }
      },
    },
    "genero": detallesReloj.genero,
    coleccionDeMarca
  `,
};
export const GET = async (req: Request, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { url } = req;

    const params = new URLSearchParams(url.split("?")[1]);

    const file = params.get("file");

    if (!file) {
      return Response.json({ status: 400 });
    }

    const queryString = productQueryString[file];

    if (!queryString) {
      return Response.json({ status: 400, message: "no query string" });
    }

    try {
      const sanityDoc = await sanityClient.fetch(`*[_type == "${file}"][0]{
        ${queryString}
      }`);

      const docKeys = getNestedKeys2(sanityDoc).sort((a, b) => {
        return a.path
          .join(".")
          .toLowerCase()
          .localeCompare(b.path.join(".").toLowerCase());
      });

      const sortedDocKeys = docKeys.sort((a, b) => {
        return a.order - b.order;
      });

      console.log({ paths: sortedDocKeys.map((key) => key.path) })
      const workbook = await createWorkbook2(sortedDocKeys, file);

      const stream = new Stream.PassThrough();
      await workbook.xlsx.write(stream);

      const getBuffer = promisify(streamToBuffer);

      const buffer = await getBuffer(stream);

      if (!buffer) {
        throw new Error("Failed to convert stream to buffer");
      }

      const asset = await sanityWriteClient.assets.upload(
        "file",
        new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }),
        { filename: `${file}.xlsx` } // Specify the filename here
      );

      if (!asset) {
        throw new Error("Failed to upload asset");
      }

      // console.log({ asset });

      return Response.redirect(asset.url);
    } catch (error) {
      console.error(error);
      return Response.json({ status: 500, error });
    }
  }

  return Response.json({ status: 405 });
};

function streamToBuffer(
  stream: NodeJS.ReadableStream,
  callback: (err: Error | null, buffer?: Buffer) => void
) {
  const chunks: any[] = [];
  stream.on("data", (chunk) => chunks.push(chunk));
  stream.on("error", callback);
  stream.on("end", () => callback(null, Buffer.concat(chunks)));
}
