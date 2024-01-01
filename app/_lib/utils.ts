import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TProduct } from "@/sanity/queries/pages/listingQueries";
import { ReadonlyURLSearchParams } from "next/navigation";

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const makeNewParams = (
  filterName: string,
  filterValue: string | undefined,
  oldSearchParams = {}
) => {
  const newParams = new URLSearchParams(oldSearchParams.toString());

  if (filterValue) {
    newParams.set(filterName, filterValue);
  } else {
    newParams.delete(filterName);
  }

  return newParams;
};

export const formatNumber = function (number: number | string): string {
  let numStr = number.toString();
  let result = "";
  let count = 0;

  for (let i = numStr.length - 1; i >= 0; i--) {
    count++;
    result = numStr[i] + result;
    if (count === 3 && i !== 0) {
      result = "." + result;
      count = 0;
    }
  }
  return result;
};

export const getAllMarcas = (products: TProduct[]) =>
  products.map((product) => product.marca);

  export const getAllColeccionesDeMarca = (products: TProduct[]) => 
  products
    .map(product => product.coleccionDeMarca)
    .filter((coleccionDeMarca): coleccionDeMarca is string => coleccionDeMarca !== undefined && coleccionDeMarca !== null);
    
export const spanishToCamelCase = function (input: string) {
  // Split the input string into words
  const words = input.split(/[\s]+/);

  // Capitalize the first letter of each word and join them in camelCase
  const camelCased = words
    .map((word) => {
      // Remove accents from the word
      const wordWithoutAccents = word
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      // Capitalize the first letter and use the rest of the letters as is
      return (
        wordWithoutAccents.charAt(0).toUpperCase() +
        wordWithoutAccents.slice(1).toLowerCase()
      );
    })
    .join("");

  return camelCased.charAt(0).toLowerCase() + camelCased.slice(1); // Make the first character lowercase
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
