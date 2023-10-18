import { ReadonlyURLSearchParams } from 'next/navigation';

export const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};


export const makeNewParams = (filterName: string, filterValue: string | undefined, oldSearchParams = {}) => {
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
}