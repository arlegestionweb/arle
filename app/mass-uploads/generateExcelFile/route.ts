import sanityClient, { sanityWriteClient } from "@/sanity/sanityClient";
import { columnLetterToNumber, incrementColumnLetter } from "@/utils/helpers";
import { convertirCamelCaseATitulo } from "@/app/_lib/utils";
import * as ExcelJS from "exceljs";
import { Stream } from "stream";
import { NextApiResponse } from "next";
import { promisify } from "util";
import { productQueryString } from "./queryStrings";

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

      if (docKey.path[0] === "genero" || docKey.path[1] === "genero") {
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
        console.log({docKey})
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
