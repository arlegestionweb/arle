import { TProduct } from "@/sanity/queries/pages/listingQueries";
import { TVarianteGafa } from "@/sanity/queries/pages/zodSchemas/gafas";
import { TPerfumeVariant } from "@/sanity/queries/pages/zodSchemas/perfume";
import { TRelojVariant } from "@/sanity/queries/pages/zodSchemas/reloj";


type TVariant = TPerfumeVariant | TVarianteGafa | TRelojVariant;


export type TVarianSelectorProps<T extends TProduct> = {
    product: T;
    selectedVariant: T["variantes"][0];
    setSelectedVariant: (variant: T["variantes"][0]) => void;
};