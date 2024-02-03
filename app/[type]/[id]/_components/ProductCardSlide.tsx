import { TProduct } from "@/sanity/queries/pages/listingQueries";
import React, { useState } from "react";
import SuggestionProductCard from "./SuggestionProductCard";
import { cn } from "@/app/_lib/utils";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type ProductCardSlideProps = {
  nameSection: string;
  products?: TProduct[]; // for test
};

export const ProductCardSlide = ({ nameSection }: ProductCardSlideProps) => {
  return (
    <section className="max-w-mx w-screen py-0 md:py-4 pl-8 lg:px-0 lg:flex lg:flex-col">
      {" "}
      <h3 className="text-zinc-800 text-[28px] font-semibold font-crimson leading-loose">
        {nameSection}
      </h3>
      {/* <SlideMobile products={products} /> */}
      <SlideDesktop products={products} />
    </section>
  );
};

const SlideDesktop = ({
  products,
  className,
}: {
  products: TProduct[];
  className?: string;
}) => {
  const [startIndex, setStartIndex] = useState(0);

  const nextImages = () => {
    setStartIndex(prevIndex => (prevIndex + 1) % products.length);
  };

  const prevImages = () => {
    setStartIndex(prevIndex =>
      prevIndex === 0 ? products.length - 4 : prevIndex - 1
    );
  };

  const visibleImages = Array.from({ length: 4 }, (_, idx) => {
    const arrayIndex = (startIndex + idx) % products.length;
    return products[arrayIndex];
  });

  return (
    <section className="relative">
      <button
        onClick={prevImages}
        className="absolute z-20 -left-[20px] top-1/3 transform -translate-y-1/2 w-10 h-10 p-[7px] border border-spacing-1 border-neutral-900 opacity-80 bg-neutral-100 shadow justify-center items-center inline-flex">
        <IoIosArrowBack />
      </button>

      <ul
        className={cn(
          "pt-4 md:pt-7 pb-3 h-auto w-full max-w-mx  grid grid-cols-[repeat(4,minmax(200px,1fr))] place-content-center gap-4"
        )}>
        {visibleImages.map((img, idx) => (
          <li
            key={`${idx}`}
            className="relative bg-white md:m-0 w-full">
            <SuggestionProductCard producto={img} />
          </li>
        ))}
      </ul>

      <button
        onClick={nextImages}
        className="absolute -right-[20px] top-1/3 transform -translate-y-1/2 w-10 h-10 p-[7px] opacity-80 border border-spacing-1 border-neutral-900 bg-neutral-100 shadow justify-center items-center inline-flex">
        <IoIosArrowForward />
      </button>
    </section>
  );
};

const SlideMobile = ({
  products,
  className,
}: {
  products: TProduct[];
  className?: string;
}) => {
  return (
    <ul
      className={cn(
        "pt-4 md:pt-7 pb-3 h-auto w-full no-scrollbar flex justify-start md:gap-4 max-w-mx overflow-x-auto overflow-y-hidden snap-x snap-mandatory",
        className
      )}>
      {products.map(product => (
        <li
          key={product._id}
          className=" w-[159px] mr-4 md:m-0 md:w-72 snap-always snap-center">
          <div className="relative w-[159px] h-auto md:w-[288px]">
            <SuggestionProductCard producto={product} />
          </div>
        </li>
      ))}
    </ul>
  );
};

const products: TProduct[] = [
  {
    date: "2023-10-18T13:03:29Z",
    slug: "/perfumePremium/11c45a88-31d6-4582-be96-99192f9a7096",
    _id: "11c45a88-31d6-4582-be96-99192f9a7096",
    detalles: {
      concentracion: "Eau de Toilette",
      resenaCorta:
        "Perfume INSPIRADO en un DIOS GRIEGO La PERFECCIÓN y la PASIÓN fusionadas en un frasco. Un homenaje a Eros, el dios del AMOR.",
      notasOlfativas: {
        notasDeBase: null,
        notasDeSalida: null,
        familiaOlfativa: "Cítrico",
        notasDeCorazon: null,
      },
    },
    genero: "hombre",
    titulo: "EROS",
    _type: "perfumePremium",
    mostrarCredito: true,
    imagenes: [
      {
        alt: "perfume versace pour homme con fondo de esencias",
        url: "https://cdn.sanity.io/images/qhszuxx1/production/6c07c669c7bc51ad1d8b22b39f57d751f4014ea5-364x351.png",
      },
    ],
    marca: "Versace",
    variantes: [
      {
        tamano: 100,
        precio: "1.200.000",
        codigoDeReferencia: "1246548465",
        registroInvima: "123123123123123",
        unidadesDisponibles: 10,
        etiqueta: "nuevo",
      },
      {
        tamano: 200,
        precio: "1.200.000",
        codigoDeReferencia: "ljk12n3lj1n23",
        registroInvima: "kjwnedfdkjnwefkjnwefoljnwefpoimi",
        unidadesDisponibles: 3,
        etiqueta: null,
      },
      {
        tamano: 250,
        precio: "2.400.000",
        codigoDeReferencia: "ljk12n3lj1n23",
        registroInvima: "lkanciywbfopidm",
        unidadesDisponibles: 3,
        etiqueta: null,
      },
    ],
    parteDeUnSet: false,
    descripcion:
      "Perfume con una nota principal envuelta en un delicioso aroma de Ámbar amaderada con notas aromáticas, cítricas y avainilladas.",
    coleccionDeMarca: null,
  },
  {
    date: "2023-10-18T13:06:35Z",
    slug: "/perfumePremium/ff2cfa02-3708-4bdf-9211-c329b7b0fad5",
    _id: "ff2cfa02-3708-4bdf-9211-c329b7b0fad5",
    detalles: {
      concentracion: "Eau de Toilette",
      resenaCorta: null,
      notasOlfativas: {
        notasDeBase: null,
        notasDeSalida: null,
        familiaOlfativa: "Cítrico",
        notasDeCorazon: null,
      },
    },
    genero: "mujer",
    titulo: "Good Girl Supreme EDP",
    _type: "perfumePremium",
    mostrarCredito: false,
    imagenes: [
      {
        alt: "perfume good girl supreme en un fondo dorado",
        url: "https://cdn.sanity.io/images/qhszuxx1/production/4176f8b35dbc2e40fb93ae1f8629fd9dfb573046-522x524.png",
      },
    ],
    marca: "Carolina Herrera",
    variantes: [
      {
        tamano: 80,
        precio: "560.000",
        codigoDeReferencia: "1321516486",
        registroInvima: "onedfiodub2fij3",
        unidadesDisponibles: 15,
        etiqueta: "mas vendido",
      },
      {
        tamano: 150,
        precio: "1.500.000",
        codigoDeReferencia: "qweqwecqwecq",
        registroInvima: "lokmsdckvbhvop2okfop2ienf",
        unidadesDisponibles: 4,
        etiqueta: "nuevo",
      },
      {
        tamano: 200,
        precio: "200.000",
        codigoDeReferencia: "09u1e497yhfojnef",
        registroInvima: "klmjcuh2fin2f",
        unidadesDisponibles: 3,
        etiqueta: "mas vendido",
      },
    ],
    parteDeUnSet: false,
    descripcion:
      "Intensamente seductora, Good Girl Eau de Parfum Suprême es una reinvención de la icónica fragancia Good Girl, con una fórmula nueva y atrevida. Redefine el emblemático contraste entre luces y sombras y nos anima a conectar con nuestro lado rebelde, para que aceptemos plenamente todas las facetas de nuestra personalidad. En palabras de Carolina A. Herrera, directora creativa de Belleza: “It's so good to be bad!”.",
    coleccionDeMarca: null,
  },
  {
    date: "2023-10-31T13:36:14Z",
    titulo: "Kalan EDP",
    inspiracion: {
      usarInspiracion: true,
      contenido: {
        resena:
          "Intenso y sutil a la vez, Kalan es una firma olfativa que sorprende con una apertura chispeante, que mezcla pimienta negra y especias con notas frescas de naranja sanguina. El eau de parfum Parfums de Marly está anclado en un corazón de flor de naranjo y lavanda y, a medida que evoluciona, facetas de sándalo blanco se despliegan y se cubren con notas de musgo y maderas preciosas. El resultado es una narrativa olfativa redonda con notas altas claras y seductoras y, al mismo tiempo, una base inmediatamente discernible. La armonía entre los materiales y los acordes crea esta música olfativa que es la firma de Kalan.",
        imagen: {
          alt: "chica en la playa",
          url: "https://cdn.sanity.io/images/qhszuxx1/production/38f75f68f0033b2abd33c853df0e1f6f8dc9efc2-1456x816.png",
        },
      },
    },
    variantes: [
      {
        tamano: 125,
        precio: "1.950.000",
        precioConDescuento: "1.500.000",
        codigoDeReferencia: "135135494",
        registroInvima: "65465432441",
        mostrarUnidadesDispobibles: false,
        unidadesDisponibles: 5,
      },
      {
        tamano: 150,
        precio: "123.123.123",
        precioConDescuento: null,
        codigoDeReferencia: "sdfwef23 ",
        registroInvima: "02ju3dr9unweovuhrw9vuh",
        mostrarUnidadesDispobibles: false,
        unidadesDisponibles: 4,
      },
    ],
    genero: "unisex",
    _type: "perfumeLujo",
    slug: "/perfumeLujo/6e596e66-3d28-43b1-b140-40034764733d",
    _id: "6e596e66-3d28-43b1-b140-40034764733d",
    parteDeUnSet: false,
    concentracion: "Eau de Parfum",
    imagenes: [
      {
        alt: "Perfume rojo parfums de marly de cabeza",
        url: "https://cdn.sanity.io/images/qhszuxx1/production/48c5c5ff2b0110230e580838bef31c0c767075f9-353x354.png",
      },
      {
        alt: "image-2",
        url: "https://cdn.sanity.io/images/qhszuxx1/production/c04b4c2d86b249d00c434a5f5f109008ba02de34-850x850.png",
      },
      {
        alt: "image-3",
        url: "https://cdn.sanity.io/images/qhszuxx1/production/9867205ac6c2b15d51af2f478c3d992a8dfc3b67-1000x1000.png",
      },
      {
        alt: "image-4",
        url: "https://cdn.sanity.io/images/qhszuxx1/production/129b6c79fc7d2fddfa13b7a65587888394b6fd8d-800x800.png",
      },
      {
        alt: "image3",
        url: "https://cdn.sanity.io/images/qhszuxx1/production/528dee7be46f7a6c7d1c1e510d43a51b01a41848-288x288.png",
      },
    ],
    notasOlfativas: {
      notasDeBase: ["Amaderado"],
      notasDeSalida: ["Amaderado"],
      familiaOlfativa: "Cítrico",
      notasDeCorazon: ["Amaderado"],
    },
    ingredientes: ["Vainilla"],
    mostrarCredito: true,
    marca: "Parfums de Marly",
    descripcion: {
      texto:
        "El perfume Kalan ofrece una fragancia intensa con un alto nivel de concentración. A diferencia de los eau de toilette, se recomienda para el invierno y noches interminables ya que perdurará en tu piel por muchas horas.",
      imagen: {
        alt: "Perfume rojo parfums de marly con caballos de ajedrez",
        url: "https://cdn.sanity.io/images/qhszuxx1/production/129b6c79fc7d2fddfa13b7a65587888394b6fd8d-800x800.png",
      },
    },
    paisDeOrigen: "Francia",
    banners: [
      {
        imagenOVideo: true,
        imagen: {
          alt: "perfume en meson",
          url: "https://cdn.sanity.io/images/qhszuxx1/production/27f36189b87e28f0b4b50d246bb7fa8238c93a35-1024x1024.png",
        },
        video: null,
      },
      {
        imagenOVideo: true,
        imagen: {
          alt: "dsd",
          url: "https://cdn.sanity.io/images/qhszuxx1/production/c04b4c2d86b249d00c434a5f5f109008ba02de34-850x850.png",
        },
        video: null,
      },
      {
        imagenOVideo: false,
        imagen: null,
        video: {
          url: "https://cdn.sanity.io/files/qhszuxx1/production/17737f700093c64742fa97591ff11fa2403b5758.mp4",
        },
      },
    ],
    coleccionDeMarca: "bonita",
  },
  {
    date: "2023-10-18T13:03:29Z",
    slug: "/perfumePremium/11c45a88-31d6-4582-be96-99192f9a7096",
    _id: "11c45a88-31d6-4582-be96-99192f9a7096",
    detalles: {
      concentracion: "Eau de Toilette",
      resenaCorta:
        "Perfume INSPIRADO en un DIOS GRIEGO La PERFECCIÓN y la PASIÓN fusionadas en un frasco. Un homenaje a Eros, el dios del AMOR.",
      notasOlfativas: {
        notasDeBase: null,
        notasDeSalida: null,
        familiaOlfativa: "Cítrico",
        notasDeCorazon: null,
      },
    },
    genero: "hombre",
    titulo: "EROS",
    _type: "perfumePremium",
    mostrarCredito: true,
    imagenes: [
      {
        alt: "perfume versace pour homme con fondo de esencias",
        url: "https://cdn.sanity.io/images/qhszuxx1/production/6c07c669c7bc51ad1d8b22b39f57d751f4014ea5-364x351.png",
      },
    ],
    marca: "Versace",
    variantes: [
      {
        tamano: 100,
        precio: "1.200.000",
        codigoDeReferencia: "1246548465",
        registroInvima: "123123123123123",
        unidadesDisponibles: 10,
        etiqueta: "nuevo",
      },
      {
        tamano: 200,
        precio: "1.200.000",
        codigoDeReferencia: "ljk12n3lj1n23",
        registroInvima: "kjwnedfdkjnwefkjnwefoljnwefpoimi",
        unidadesDisponibles: 3,
        etiqueta: null,
      },
      {
        tamano: 250,
        precio: "2.400.000",
        codigoDeReferencia: "ljk12n3lj1n23",
        registroInvima: "lkanciywbfopidm",
        unidadesDisponibles: 3,
        etiqueta: null,
      },
    ],
    parteDeUnSet: false,
    descripcion:
      "Perfume con una nota principal envuelta en un delicioso aroma de Ámbar amaderada con notas aromáticas, cítricas y avainilladas.",
    coleccionDeMarca: null,
  },
  {
    date: "2023-10-18T13:06:35Z",
    slug: "/perfumePremium/ff2cfa02-3708-4bdf-9211-c329b7b0fad5",
    _id: "ff2cfa02-3708-4bdf-9211-c329b7b0fad5",
    detalles: {
      concentracion: "Eau de Toilette",
      resenaCorta: null,
      notasOlfativas: {
        notasDeBase: null,
        notasDeSalida: null,
        familiaOlfativa: "Cítrico",
        notasDeCorazon: null,
      },
    },
    genero: "mujer",
    titulo: "Good Girl Supreme EDP",
    _type: "perfumePremium",
    mostrarCredito: false,
    imagenes: [
      {
        alt: "perfume good girl supreme en un fondo dorado",
        url: "https://cdn.sanity.io/images/qhszuxx1/production/4176f8b35dbc2e40fb93ae1f8629fd9dfb573046-522x524.png",
      },
    ],
    marca: "Carolina Herrera",
    variantes: [
      {
        tamano: 80,
        precio: "560.000",
        codigoDeReferencia: "1321516486",
        registroInvima: "onedfiodub2fij3",
        unidadesDisponibles: 15,
        etiqueta: "mas vendido",
      },
      {
        tamano: 150,
        precio: "1.500.000",
        codigoDeReferencia: "qweqwecqwecq",
        registroInvima: "lokmsdckvbhvop2okfop2ienf",
        unidadesDisponibles: 4,
        etiqueta: "nuevo",
      },
      {
        tamano: 200,
        precio: "200.000",
        codigoDeReferencia: "09u1e497yhfojnef",
        registroInvima: "klmjcuh2fin2f",
        unidadesDisponibles: 3,
        etiqueta: "mas vendido",
      },
    ],
    parteDeUnSet: false,
    descripcion:
      "Intensamente seductora, Good Girl Eau de Parfum Suprême es una reinvención de la icónica fragancia Good Girl, con una fórmula nueva y atrevida. Redefine el emblemático contraste entre luces y sombras y nos anima a conectar con nuestro lado rebelde, para que aceptemos plenamente todas las facetas de nuestra personalidad. En palabras de Carolina A. Herrera, directora creativa de Belleza: “It's so good to be bad!”.",
    coleccionDeMarca: null,
  },
];
