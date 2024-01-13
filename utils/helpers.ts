export const removeSpanishAccents = function(str: string) {
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
}


export const colombianPriceStringToNumber = (price: string) => {
  return Number(
    price
      .split("$ ")
      .join("")
      .split(".")
      .join("")
      .split("'")
      .join("")
  );
};

export const numberToColombianPriceString = (price: number) => {
  let [integerPart, decimalPart] = price.toString().split('.');
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
    result = result + '.' + decimalPart;
  }

  return result;
}


export const getPriceRangeString = function(productPrices: number[]): string {
  const minProductPrice = Math.min(...productPrices);
  const maxProductPrice = Math.max(...productPrices);

  return minProductPrice === maxProductPrice
    ? `$${numberToColombianPriceString(minProductPrice)}`
    : `$${numberToColombianPriceString(minProductPrice)} - $${numberToColombianPriceString(maxProductPrice)}`;
}

export const toKebabCase = (str: String) => str
.replace(/([a-z])([A-Z])/g, "$1-$2")
.replace(/[\s_]+/g, '-')
.toLowerCase();