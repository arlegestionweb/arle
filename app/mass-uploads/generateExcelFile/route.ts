import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import sanityClient from "@/sanity/sanityClient";
import { columnLetterToNumber, incrementColumnLetter } from "@/utils/helpers";
import { convertirCamelCaseATitulo } from "@/app/_lib/utils";
import * as ExcelJS from "exceljs";

function getNestedKeys(
  obj: Record<string, any>,
  prefix: string = ""
): string[] {
  return Object.entries(obj).reduce(
    (keys: string[], [key, value]: [string, any]) => {
      const newKey = `${prefix}${key}`;
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        return [...keys, ...getNestedKeys(value, `${newKey}.`)];
      }
      return [...keys, newKey];
    },
    []
  );
}
// const ExcelJS = require('exceljs');

async function createWorkbook(docKeys: string[], file: string) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("My Sheet");

  let columnLetter = "A";

  docKeys.forEach((key) => {
    const parts = key.split(".");
    parts.forEach((part, index) => {
      let cell = sheet.getCell(`${columnLetter}${index + 1}`);
      cell.value = convertirCamelCaseATitulo(part);
      cell.font = { bold: true };
    });
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

// export const productQuery: Record<string, string> = {
//   relojesLujo: `{
//     "date": _createdAt,
//     genero,
//     mostrarCredito,
//     "marca": marca->titulo,
//     _type,
//     _id,
//     "detalles": detalles {
//       usarDetalles,
//       "contenido": contenido {
//         texto,
//         "imagen": imagen {
//           alt,
//           "url": asset->url,
//         }
//       }
//     },
//     "especificaciones": especificaciones {
//       "tipoDeReloj": tipoDeReloj -> titulo,
//       "estiloDeReloj": estiloDeReloj -> titulo,
//       resistenciaAlAgua,
//       "funciones": funciones [] -> {
//         titulo,
//         descripcion
//       },
//       "material": material -> nombre
//     },
//     "variantes": variantes[]{
//       precioConDescuento,
//       precio,
//       "colorTablero": colorTablero -> {
//         nombre,
//         "color": color.hex
//       },
//       "imagenes": imagenes[]{
//         alt,
//         "url": asset->url,
//       },
//       unidadesDisponibles,
//       mostrarUnidadesDisponibles,
//       codigoDeReferencia,
//       tag,
//       "colorCaja": colorCaja -> {
//         nombre,
//         "color": color.hex
//       },
//       "colorPulso": colorPulso -> {
//         nombre,
//         "color": color.hex
//       },
//       "colorTablero": colorTablero -> {
//         nombre,
//         "color": color.hex
//       },
//       _type,
//     },
//     "inspiracion": ${inspiracionQuery},
//     modelo,
//     ${garantiaQuery},
//     ${movimientoQuery},
//     "caja": caja {
//       diametro,
//       "material": material -> nombre,
//       "cristal": cristal -> titulo
//     },
//     coleccionDeMarca,
//     descripcion,
//     ${bannersQuery},
//     "slug": slug.current,
//   }
// `,
//   relojesPremium: `{
//     "date": _createdAt,
//     "variantes": variantes[]{
//       precio,
//       "colorTablero": colorTablero -> {
//         nombre,
//         "color": color.hex
//       },
//       "imagenes": imagenes[]{
//         alt,
//         "url": asset->url,
//       },
//       codigoDeReferencia,
//       tag,
//       unidadesDisponibles,
//       mostrarUnidadesDisponibles,
//       "colorCaja": colorCaja -> {
//         nombre,
//         "color": color.hex
//        },
//       "colorPulso": colorPulso -> {
//         nombre,
//         "color": color.hex
//       }
//     },
//     _id,
//     modelo,
//     descripcion,
//     "slug": slug.current,
//     ${garantiaQuery},
//     _type,
//     "marca": marca->titulo,
//     "detallesReloj": detallesReloj {
//       "tipoDeReloj": tipoDeReloj -> titulo,
//       "estiloDeReloj": estiloDeReloj -> titulo,
//       "funciones": funciones [] -> {
//         titulo,
//         descripcion
//       },
//       resistenciaAlAgua,
//       "material": material -> nombre,
//       "tipoDeMovimiento": tipoDeMovimiento -> titulo,
//       "caja": caja {
//         diametro,
//         "material": material -> nombre,
//         "cristal": cristal -> titulo
//       },
//     },
//     "genero": detallesReloj.genero,
//     coleccionDeMarca
//   }`,
//   perfumeLujo: `{
//     "date": _createdAt,
//     titulo,
//     "inspiracion": ${inspiracionQuery},
//     "variantes": variantes[] {
//       codigoDeReferencia,
//       unidadesDisponibles,
//       registroInvima,
//       tag,
//       precioConDescuento,
//       mostrarUnidadesDisponibles,
//       tamano,
//       precio
//     },
//     genero,
//     _type,
//     "slug": slug.current,
//     _id,
//     parteDeUnSet,
//     "concentracion": concentracion -> nombre,
//     "imagenes": imagenes[]{
//         alt,
//         "url": asset->url,
//       },
//     "notasOlfativas": notasOlfativas {
//       "notasDeBase": notasDeBase [] -> nombre,
//       "notasDeSalida": notasDeSalida [] -> nombre,
//       "familiaOlfativa": familiaOlfativa -> nombre,
//       "notasDeCorazon": notasDeCorazon [] -> nombre
//     },
//     "ingredientes": ingredientes [] -> nombre,
//     mostrarCredito,
//     "marca": marca -> titulo,
//     "descripcion": descripcion {
//       texto,
//       "imagen": imagen {
//         ...,
//         alt,
//         "url": asset->url,
//       }
//     },
//     "paisDeOrigen": paisDeOrigen -> nombre,
//    ${bannersQuery},
//    coleccionDeMarca
//   }`,
//   perfumePremium: `{
//     "date": _createdAt,
//     "slug": slug.current,
//     "detalles": detalles {
//       "concentracion": concentracion -> nombre,
//       resenaCorta,
//       "notasOlfativas": notasOlfativas {
//         "notasDeBase": notasDeBase [] -> nombre,
//         "notasDeSalida": notasDeSalida [] -> nombre,
//         "familiaOlfativa": familiaOlfativa -> nombre,
//         "notasDeCorazon": notasDeCorazon [] -> nombre
//       },

//     },
//     "genero": detalles.genero,
//     _id,
//     titulo,
//     _type,
//     mostrarCredito,
//     "imagenes": imagenes[]{
//       alt,
//       "url": asset->url,
//     },
//     "marca": marca->titulo,
//     "variantes": variantes[]{
//       tamano,
//       tag,
//       precio,
//       precioConDescuento,
//       codigoDeReferencia,
//       registroInvima,
//       unidadesDisponibles,
//       mostrarUnidadesDisponibles,
//     },
//     parteDeUnSet,
//     descripcion,
//     coleccionDeMarca
//   }`,
//   gafasLujo: `{
//     "date": _createdAt,
//     _id,
//     _type,
//     "marca": marca->titulo,
//     modelo,
//     descripcion,
//     genero,
//     mostrarCredito,
//     ${garantiaQuery},
//     "inspiracion": ${inspiracionQuery},
//     "detalles": detalles {
//       usarDetalles,
//       "contenido": contenido {
//         texto,
//         "imagen": imagen {
//           alt,
//           "url": asset->url,
//         }
//       }
//     },
//     "monturaDetalles": monturaDetalles {
//       usarDetalles,
//         "contenido": contenido {
//           texto,
//           "imagen": imagen {
//             alt,
//             "url": asset->url,
//           }
//         },
//     },
//     ${bannersQuery},
//     "especificaciones": especificaciones {
//       "paisDeOrigen": paisDeOrigen -> nombre,
//       queIncluye,
//       "tipoDeGafa": tipoDeGafa -> titulo,
//       "estiloDeGafa": estiloDeGafa -> titulo,
//       "montura": montura {
//         "formaDeLaMontura": formaDeLaMontura -> titulo,
//         "materialMontura": materialMontura -> titulo,
//         "materialVarilla": materialVarilla -> titulo,
//       },
//       "lente": lente {
//         "material": material -> titulo,
//         "tipo": tipo -> titulo,
//       },
//     },
//     modelo,
//     coleccionDeMarca,
//     "slug": slug.current,
//     "variantes": variantes[] {
//       "colorDelLente": colorDelLente -> {
//         nombre,
//         "color": color.hex
//       },
//       "colorDeLaVarilla": colorDeLaVarilla -> {
//         nombre,
//         "color": color.hex
//       },
//       "colorDeLaMontura": colorDeLaMontura -> {
//         nombre,
//         "color": color.hex
//       },
//       "imagenes": imagenes[] {
//         alt,
//         "url": asset->url,
//       },
//       codigoDeReferencia,
//       unidadesDisponibles,
//       precio,
//       tag,
//       mostrarUnidadesDisponibles
//     },
//     modelo,
//     "slug": slug.current,
//     genero,
//     descripcion,
//     "detalles": detalles {
//       "tipoDeGafa": tipoDeGafa -> titulo,
//       "estiloDeGafa": estiloDeGafa -> titulo,
//         "lente": lente {
//         "tipo": tipo -> titulo,
//         "material": material -> titulo,
//       },
//       "montura": montura {
//         "formaDeLaMontura": formaDeLaMontura -> titulo,
//         "materialMontura": materialMontura -> titulo,
//         "materialVarilla": materialVarilla -> titulo,
//       }
//     },
//   }`,

//   gafasPremium: `{
//     "date": _createdAt,
//     _type,
//     "marca": marca->titulo,
//     _id,
//     "variantes": variantes[] {
//       "colorDelLente": colorDelLente -> {
//         nombre,
//         "color": color.hex
//       },
//       "colorDeLaVarilla": colorDeLaVarilla -> {
//         nombre,
//         "color": color.hex
//       },
//       "colorDeLaMontura": colorDeLaMontura -> {
//         nombre,
//         "color": color.hex
//       },
//       "imagenes": imagenes[] {
//         alt,
//         "url": asset->url,
//       },
//       codigoDeReferencia,
//       unidadesDisponibles,
//       precio,
//       tag,
//       mostrarUnidadesDisponibles
//     },
//     modelo,
//     "slug": slug.current,
//     genero,
//     descripcion,
//     "detalles": detalles {
//       "tipoDeGafa": tipoDeGafa -> titulo,
//       "estiloDeGafa": estiloDeGafa -> titulo,
//         "lente": lente {
//         "tipo": tipo -> titulo,
//         "material": material -> titulo,
//       },
//       "montura": montura {
//         "formaDeLaMontura": formaDeLaMontura -> titulo,
//         "materialMontura": materialMontura -> titulo,
//         "materialVarilla": materialVarilla -> titulo,
//       }
//     },
//     ${garantiaQuery}
//   }`,
// };

const productQueryString: Record<string, string> = {
  perfumeLujo: `
    "codigoDeProducto": _id,
    titulo,
    "inspiracion": {
      usarInspiracion,
      "contenido": contenido {
        resena,
        "imagen": imagen {
          alt,
          "url": asset->url,
        }
      }
    },
    'variante': variantes[0]{
      codigoDeReferencia,
      unidadesDisponibles,
      registroInvima,
      tag,
      precioConDescuento,
      mostrarUnidadesDisponibles,
      tamano,
      precio
    },
    genero,
    'slug': slug.current,
    parteDeUnSet,
    "concentracion": concentracion -> nombre,
    "notasOlfativas": notasOlfativas {
      "notasDeBase": notasDeBase [] -> nombre,
      "notasDeSalida": notasDeSalida [] -> nombre,
      "familiaOlfativa": familiaOlfativa -> nombre,
      "notasDeCorazon": notasDeCorazon [] -> nombre
    },
    "ingredientes": ingredientes [] -> nombre,
    mostrarCredito,
    "marca": marca -> titulo,
    "descripcion": descripcion {
      texto,
      "imagen": imagen {
        alt,
        "url": asset->url,
      }
    },
    'paisDeOrigen': paisDeOrigen -> nombre, 
    coleccionDeMarca
    `,
  perfumePremium: `
    "codigoDeProducto": _id,
    'slug': slug.current,
    descripcion,
    "detalles": detalles {
      genero,
      "concentracion": concentracion -> nombre,
      resenaCorta,
      "notasOlfativas": notasOlfativas {
        "notasDeBase": notasDeBase [] -> nombre,
        "notasDeSalida": notasDeSalida [] -> nombre,
        "familiaOlfativa": familiaOlfativa -> nombre,
        "notasDeCorazon": notasDeCorazon [] -> nombre
      }
    },
    titulo,
    mostrarCredito,
    'marca': marca -> nombre,
    'variante': variantes[0]{
      tamano,
      tag,
      precio,
      codigoDeReferencia,
      registroInvima,
      unidadesDisponibles,
      mostrarUnidadesDisponibles,
      precioConDescuento
    },
    parteDeUnSet,
    coleccionDeMarca
    `,
  gafasLujo: `
    "codigoDeProducto": _id,
    'marca': marca -> titulo,
    modelo,
    descripcion,
    genero,
    mostrarCredito,
    "garantia": garantia { 
      meses, 
      descripcion
    },
    "inspiracion": inspiracion {
      usarInspiracion,
      "contenido": contenido {
        resena,
        "imagen": imagen {
          alt,
          "url": asset->url,
        }
      }
    },
    "detalles": detalles {
      usarDetalles,
      "contenido": contenido {
        texto,
        "imagen": imagen {
          alt,
          "url": asset->url,
        }
      }
    },
    "monturaDetalles": monturaDetalles {
      usarDetalles,
        "contenido": contenido {
          texto,
          "imagen": imagen {
            alt,
            "url": asset->url,
          }
        },
    },
    "especificaciones": especificaciones {
      "paisDeOrigen": paisDeOrigen -> nombre,
      queIncluye,
      "tipoDeGafa": tipoDeGafa -> titulo,
      "estiloDeGafa": estiloDeGafa -> titulo,
      "montura": montura {
        "formaDeLaMontura": formaDeLaMontura -> titulo,
        "materialMontura": materialMontura -> titulo,
        "materialVarilla": materialVarilla -> titulo,
      },
      "lente": lente {
        "material": material -> titulo,
        "tipo": tipo -> titulo,
      },
    },
    coleccionDeMarca,
    'slug': slug.current,
    'variante': variantes[0] {
      codigoDeReferencia,
      "colorDelLente": colorDelLente -> nombre,
      "colorDeLaVarilla": colorDeLaVarilla -> nombre,
      "colorDeLaMontura": colorDeLaMontura -> nombre,
      unidadesDisponibles,
      precio,
      precioConDescuento,
      tag,
      mostrarUnidadesDispobibles
    }
  `,
  gafasPremium: `
  "codigoDeProducto": _id,
    "marca": marca->titulo,
    "variante": variantes[0] {
      "colorDelLente": colorDelLente -> nombre,
      "colorDeLaVarilla": colorDeLaVarilla -> nombre,
      "colorDeLaMontura": colorDeLaMontura -> nombre,
      precioConDescuento,
      codigoDeReferencia,
      unidadesDisponibles,
      precio,
      tag,
      mostrarUnidadesDisponibles
    },
    modelo,
    "slug": slug.current, 
    genero,
    descripcion,
    "detalles": detalles {
      "tipoDeGafa": tipoDeGafa -> titulo,
      "estiloDeGafa": estiloDeGafa -> titulo,
        "lente": lente {
        "tipo": tipo -> titulo,
        "material": material -> titulo,
      },
      "montura": montura {
        "formaDeLaMontura": formaDeLaMontura -> titulo,
        "materialMontura": materialMontura -> titulo,
        "materialVarilla": materialVarilla -> titulo,
      }
    },
    "garantia": garantia { 
      meses, 
      descripcion
    },
  `,
  relojesLujo: `
  genero,
  mostrarCredito,
  "marca": marca -> titulo,
  "codigoDeProducto": _id,
  "detalles": detalles {
    usarDetalles,
    "contenido": contenido {
      texto,
      "imagen": imagen {
        alt,
        "url": asset->url
      }
    }
  },
  "especificaciones": especificaciones {
    "tipoDeReloj": tipoDeReloj -> titulo,
    "estiloDeReloj": estiloDeReloj -> titulo,
    resistenciaAlAgua,
    "funciones": funciones [] -> {
      titulo,
      descripcion
    },
    "material": material -> nombre
  },
  "variante": variantes[0]{
    precioConDescuento,
    precio,
    "colorTablero": colorTablero -> nombre,
    unidadesDisponibles,
    mostrarUnidadesDisponibles,
    codigoDeReferencia,
    tag,
    "colorCaja": colorCaja -> nombre,
    "colorPulso": colorPulso -> nombre,
    "colorTablero": colorTablero -> nombre,
  },
  "inspiracion": inspiracion {
    usarInspiracion,
    "contenido": contenido {
      resena,
      "imagen": imagen {
        alt,
        "url": asset->url,
      }
    }
  },
  modelo,
  "garantia": garantia { 
    meses, 
    descripcion
  },
  "movimiento": movimiento {
    usarMovimiento,
    "tipoDeMovimiento": tipoDeMovimiento -> titulo,
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
    "material": material -> nombre,
    "cristal": cristal -> titulo
  },
  coleccionDeMarca,
  descripcion,
  "slug": slug.current
  `,
  relojesPremium: `
    "variante": variantes[0]{
      precio,
      precioConDescuento,
      "colorTablero": colorTablero -> nombre,
      "imagenes": imagenes[]{
        alt,
        "url": asset->url,
      },
      codigoDeReferencia,
      tag,
      unidadesDisponibles,
      mostrarUnidadesDisponibles,
      "colorCaja": colorCaja -> nombre,
      "colorPulso": colorPulso -> nombre
    },
    "codigoDeProducto": _id,
    modelo,
    descripcion,
    "slug": slug.current,
    "garantia": garantia { 
      meses, 
      descripcion
    },
    "marca": marca->titulo,
    "detallesReloj": detallesReloj {
      "tipoDeReloj": tipoDeReloj -> titulo,
      "estiloDeReloj": estiloDeReloj -> titulo,
      "funciones": funciones [] -> {
        titulo,
        descripcion
      },
      resistenciaAlAgua,
      "material": material -> nombre,
      "tipoDeMovimiento": tipoDeMovimiento -> titulo,
      "caja": caja {
        diametro,
        "material": material -> nombre,
        "cristal": cristal -> titulo
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

    console.log({ file });

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

      const docKeys = getNestedKeys(sanityDoc)
        .sort()
        .filter((key) => key !== "variante._key" && key !== "variante._type");

      console.log({
        docKeys,
        length: docKeys.length,
        prodName: sanityDoc,
      });

      await createWorkbook(docKeys, file);

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
