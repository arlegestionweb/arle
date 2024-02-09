import Button from "../Button";
import GradientImage from "../GradientImage";

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
    <section className="relative w-screen bg-[#00002E] flex flex-col md:flex-row md:items-center md:justify-end">

      <section className="md:w-1/2 px-8 sm:pl-14 xl:pl-4 py-6 lg:max-w-screen-sm flex flex-col gap-4">
        <h3 className="text-white text-center md:text-start text-2xl md:text-[28px] font-semibold">
    {sobre.titulo}
        </h3>
        <p className=" text-zinc-100 text-base font-normal font-raleway leading-tight md:max-w-3xl">
          {sobre.descripcion}
        </p>
        <SobreButton />
      </section>

      {/* //*TODO: Refactorizr componente Gradienimg */}
      <section className="w-full h-[350px] md:w-1/2">
        <GradientImage
          alt={sobre.imagenes[0].alt}
          src={sobre.imagenes[0].url}
          layout="fill"
          containerclassName="w-full h-[400px] bg-color-bg-surface-1-default self-stretch">
          <div className="sticky px-4 py-6 w-full h-full flex items-end md:hidden">
            <Button className="px-4 py-2 w-full bg-color-bg-surface-1-default justify-center items-center inline-flex">
              <span className="text-zinc-800 text-lg font-medium font-inter leading-[27px]">
                Listen our poadcast
              </span>
            </Button>
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
