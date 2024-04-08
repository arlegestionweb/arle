export const normalizeName = function (name: string) {
  return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const removeSpanishAccents = function (str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[áäâà]/g, "a")
    .replace(/[éëêè]/g, "e")
    .replace(/[íïîì]/g, "i")
    .replace(/[óöôò]/g, "o")
    .replace(/[úüûù]/g, "u")
    .replace(/[ñ]/g, "n")
    .replace(/[ç]/g, "c");
};

export const colombianPriceStringToNumber = (price: string) => {
  return Number(
    price.split("$ ").join("").split(".").join("").split("'").join("")
  );
};

export const numberToColombianPriceString = (price: number) => {
  if (!price) return "";
  let [integerPart, decimalPart] = price.toString().split(".");
  let result = "";
  let count = 0;

  for (let i = integerPart.length - 1; i >= 0; i--) {
    count++;
    result = integerPart[i] + result;
    if (count === 3 && i !== 0) {
      result = "." + result;
      count = 0;
    }
  }

  if (decimalPart) {
    result = result + "." + decimalPart;
  }

  return result;
};

export const getPriceRangeString = function (productPrices: number[]): string {
  const minProductPrice = Math.min(...productPrices);
  const maxProductPrice = Math.max(...productPrices);

  return minProductPrice === maxProductPrice
    ? `$${numberToColombianPriceString(minProductPrice)}`
    : `$${numberToColombianPriceString(
        minProductPrice
      )} - $${numberToColombianPriceString(maxProductPrice)}`;
};

export const toKebabCase = (str: String) =>
  str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();

export const camelToTitleCase = function (str: string): string {
  let result = str[0].toUpperCase();

  for (let i = 1; i < str.length; i++) {
    if (str[i] === str[i].toUpperCase()) {
      result += " ";
    }
    result += str[i];
  }

  return result;
};

export const columnLetterToNumber = function (columnLetter: string): number {
  let columnNumber = 0;
  for (let i = 0; i < columnLetter.length; i++) {
    columnNumber = columnNumber * 26 + columnLetter.charCodeAt(i) - 64;
  }
  return columnNumber;
};

export const incrementColumnLetter = function (columnLetter: string): string {
  if (columnLetter === "Z" || columnLetter === "z") {
    return String.fromCharCode(columnLetter.charCodeAt(0) - 25) + "A";
  } else if (columnLetter.endsWith("Z") || columnLetter.endsWith("z")) {
    return incrementColumnLetter(columnLetter.slice(0, -1)) + "A";
  } else {
    return (
      columnLetter.slice(0, -1) +
      String.fromCharCode(columnLetter.charCodeAt(columnLetter.length - 1) + 1)
    );
  }
};
