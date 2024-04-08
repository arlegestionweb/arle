"use server";

import { sanityWriteClient } from "@/sanity/sanityClient";
import { CellValue, Workbook } from "exceljs";

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

// async function saveFile(file: File, documentHash: string) {
//   const data = await file.arrayBuffer();
//   const filePath = path.join(__dirname, file.name);

//   fs.appendFileSync(filePath, Buffer.from(data));

//   return filePath; // Return the file path
// }