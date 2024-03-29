"use server";
import { type CellValue, Workbook } from "exceljs";
import fs from "fs";
import path from "path";

const EMAIL = "email@gmail.com";
const PASSWORD = "password";

export const validateUser = async (
  formState: { success: boolean; error: string | null },
  formData: FormData
) => {
  console.log({
    username: formData.get("email"),
    password: formData.get("password"),
  });

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
