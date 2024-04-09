
export type TProductTypesForUpload = 'perfumeLujo' | 'perfumePremium' | 'relojesPremium' | 'relojesLujo' | 'gafasLujo' | 'gafasPremium';

export function getProductTypeFromFileName(fileName: string): TProductTypesForUpload | null {
  const productTypes: TProductTypesForUpload[] = ['perfumeLujo', 'perfumePremium', 'relojesPremium', 'relojesLujo', 'gafasLujo', 'gafasPremium'];

  for (let productType of productTypes) {
    if (fileName.includes(productType)) {
      return productType as TProductTypesForUpload;
    }
  }


  return null;
}