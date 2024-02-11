import Link from "next/link";
import Button from "../Button";
import GradientImage from "../GradientImage";
import Image from "next/image";

type AboutArleProps = {
  sobre: {
    titulo: string;
    descripcion: string;
    imagenes: {
      url: string;
      alt: string;
    }[];
  };
};

const AboutArle = ({ sobre }: AboutArleProps) => {
  return (
    <section className="relative w-screen bg-arle-blue flex flex-col md:flex-row md:items-center md:justify-end md:pl-14 overflow-hidden">

      <section className=" md:w-1/2 px-6 xs:px-8 sm:pl-14 md:pl-0 pt-20 pb-8 md:py-0 md:max-w-screen-sm flex flex-col gap-4 overflow-hidden">
        <Image className="opacity-80 absolute z-0 -top-[150px] xs:-top-[200px] md:-top-[45%] left-[30%] sm:left-[45%] md:left-[20%] lg:left-[25%] 2xl:left-[35%]" width={500} height={500} src="/ArleEscudoSobreAzul.svg" alt="Escudo de Arlé" />
        <h3 className="text-slate-200 text-start lux-title text-3xl font-extralight z-10">
    {sobre.titulo}
        </h3>
        <p className=" text-slate-300 text-lg font-light font-tajawal leading-tight max-w-lg z-10">
          {sobre.descripcion}
        </p>
        <Link className="light-button hidden md:block z-10" href="/sobre-nosotros">
          Conócenos
        </Link>
      </section>

      {/* //*TODO: Refactorizr componente Gradienimg */}
      <section className="w-full h-[400px] md:w-1/2">
        <GradientImage
          alt={sobre.imagenes[0].alt}
          src={sobre.imagenes[0].url}
          layout="fill"
          containerclassName="relative w-full h-full bg-color-bg-surface-1-default self-stretch">
          <div className="sticky px-4 py-6 w-full h-full justify-center flex items-end md:hidden">
          <Link className="light-button" href="/sobre-nosotros">
          Conócenos
          </Link>
          </div>
        </GradientImage>
      </section>
    </section>
  );
};

const SobreButton = () => {
  return (
        <Button className="hidden px-4 py-2 w-full bg-color-bg-surface-1-default justify-center items-center md:inline-flex md:max-w-sm">
          <span className="text-zinc-800 text-lg font-medium font-inter leading-[27px]">
            Conócenos
          </span>
        </Button>
  )
}

export default AboutArle;
