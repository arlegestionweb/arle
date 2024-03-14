import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import sanityClient from "@/sanity/sanityClient";
import { columnLetterToNumber, incrementColumnLetter } from "@/utils/helpers";
import { convertirCamelCaseATitulo } from "@/app/_lib/utils";
import * as ExcelJS from "exceljs";

type NestedKey = {
  path: string[];
  reference: boolean;
  options: any[];
  boolean?: boolean;
};

function getNestedKeys2(obj: any, path: string[] = []): NestedKey[] {
  return Object.entries(obj).reduce(
    (result: NestedKey[], [key, value]: [string, any]) => {
      const newPath = path.concat(key);
      if (typeof value !== "object" || value === null || Array.isArray(value)) {
        if (obj.boolean) {
          result.push({
            path: newPath,
            reference: value?.reference || false,
            options: value?.options || [],
            boolean: true,
          });
        } else if (obj.reference) {
          if (!result.find((item) => item.path.includes(path[0]))) {
            result.push({
              path: newPath,
              reference: obj?.reference || false,
              options: obj?.options || [],
            });
          }
        } else {
          result.push({
            path: newPath,
            reference: value?.reference || false,
            options: value?.options || [],
          });
        }
      } else {
        result.push(...getNestedKeys2(value, newPath));
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

      if (
        convertirCamelCaseATitulo(part) !== "Reference" &&
        convertirCamelCaseATitulo(part) !== "Boolean" &&
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

        // Set data validation on the entire column
        // sheet.getColumn(columnLetter).eachCell((cell) => {
        //   cell.dataValidation = {
        //     type: "list",
        //     formulae: [range],
        //     allowBlank: true, // Allow empty cells (optional)
        //   };
        // });
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

  return await workbook.xlsx.writeFile(`./${file}.xlsx`);
}

const productQueryString: Record<string, string> = {
  perfumeLujo: `
    "codigoDeProducto": _id,
    titulo,
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
      codigoDeReferencia,
      unidadesDisponibles,
      registroInvima,
      tag,
      precioConDescuento,
      "mostrarUnidadesDisponibles": {
        "boolean": true,
      },
      tamano,
      precio
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
      "notasDeBase": notasDeBase [] -> nombre,
      "notasDeSalida": notasDeSalida [] -> nombre,
      "familiaOlfativa": familiaOlfativa -> {
        nombre,
        "reference": true,
        "options": *[_type == "familiasOlfativas"] {nombre}
      },
      "notasDeCorazon": notasDeCorazon [] -> nombre
    },
    "ingredientes": ingredientes [] -> nombre,
    "mostrarCredito": {
      "boolean": true,
    },
    "marca": marca -> {"nombre": titulo, "reference": true, "options": *[_type == "marca"] {"nombre": titulo}},
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
export const GET = async (req: Request) => {
  if (req.method === "GET") {
    const { url } = req;

    const params = new URLSearchParams(url.split("?")[1]);

    const file = params.get("file");

    // console.log({ file });

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

      // .sort()
      // .filter((key) => key !== "variante._key" && key !== "variante._type");

      console.log({
        docKeys,
        length: docKeys.length,
        prodName: sanityDoc,
        paths: docKeys.map((key) => key.path),
      });

      await createWorkbook2(docKeys, file);
      const filePath = path.resolve(`./${file}.xlsx`);

      const fileBuffer = fs.readFileSync(filePath);

      // Create a new NextResponse and set the body to the file buffer
      const response = new NextResponse(fileBuffer);

      // Set headers
      response.headers.set(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      response.headers.set(
        "Content-Disposition",
        `attachment; filename=${file}.xlsx`
      );
      setTimeout(() => {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Error deleting file ${filePath}:`, err);
          }

          console.log(`File ${filePath} deleted`);
        });
      }, 60 * 1000); // 60 seconds
      return response;
    } catch (error) {
      console.error(error);
      return Response.json({ status: 500 });
    }
  }

  return Response.json({ status: 405 });
};
