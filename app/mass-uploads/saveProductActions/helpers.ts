import { z } from "zod";

export function extractErrorsFromIssues<T extends { marca: string; titulo?: string; modelo?: string }>(
    issues: z.ZodError["issues"],
    products: T[]
  ) {
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