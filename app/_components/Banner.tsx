import Image from "next/image";
import GradientImage from "./GradientImage";

type BannerProps = {
  banners: [
    {
      titulo: string;
      descripcion: string;
      imagen: {
        alt: string;
        url: string;
      };
    }
  ];
};

const Banner = ({ banners }: BannerProps) => {
  return (
    <section className="w-screen h-[377px]">
      <GradientImage
        src={banners[0].imagen.url}
        alt={banners[0].imagen.alt}
        layout="fill"
        imageClassName="fit object-cover object-top"
        containerclassName=" px-2 pt-2 pb-9 flex-col justify-end items-center gap-2.5 inline-flex">

        <div className="sticky z-10 self-stretch h-[114px] flex-col justify-center items-center gap-2.5 flex">
          <div className="self-stretch text-center text-white text-[32px] font-semibold font-['Lora'] uppercase leading-[38.40px]">
            Promotional banner - hero section
          </div>
        </div>

      </GradientImage>
      <div className="justify-start items-start gap-[15px] inline-flex" />
    </section>
  );
};

export default Banner;
