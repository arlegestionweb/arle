import Image from "next/image";
import React from "react";

type GalleryProductProps = {
  imagesProduct: {
    url: string;
    alt?: string | null | undefined;
  }[];
  className?: string;
};

const GalleryProduct = ({ imagesProduct }: GalleryProductProps) => {
  return (
    <section className="relative max-h-[473px]">
      <Image
        alt={imagesProduct[0].alt || ""}
        src={imagesProduct[0].url}
        width={300}
        height={473}
        className="object-cover w-full h-[473px]"
      />
    </section>
  );
};

export default GalleryProduct;
