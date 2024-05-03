export const toCamelCase = (str: string) => {
  const words = str.split(' ');
  return [
    words[0].toLowerCase(),
    ...words.slice(1).map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
  ].join('');
};

export const arrayMessage = toCamelCase('Encuentra las opciones para este campo en la fila 5 de esta columna, las opciones deben ir en un solo campo separados por comas')

export const setNestedProperty = (obj: any, path: string, value: any) => {
  if (path === '') {
    return value;
  }
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length; i++) {
    if (i === keys.length - 1) {
      current[keys[i]] = value;
    } else {
      current[keys[i]] = current[keys[i]] || {};
      current = current[keys[i]];
    }
  }
};



export function moveEmptyKeyValuesToParent(obj: any) {
  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      if ('' in obj[key]) {
        obj[key] = obj[key][''];
      } else {
        moveEmptyKeyValuesToParent(obj[key]);
      }
    }
  }
}
