import { ReadonlyURLSearchParams } from 'next/navigation';

export const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};


export const makeNewParams = (filterName: string, filterValue: string | undefined, searchParams = {}) => {
  const newParams = new URLSearchParams(searchParams.toString());

  if (filterValue) {
    newParams.set(filterName, filterValue);
  } else {
    newParams.delete(filterName);
  }

  return newParams;
};
