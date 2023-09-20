// {
//   titulo: 'Sobre Arle',
//   descripcion: 'descripcion de sobre arle',
//   imagenes: [ [Object], [Object], [Object] ]
// },

import Image from "next/image";
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

    <section className="relative w-screen min-h-[500px] bg-[#00002E] flex flex-col justify-center items-center md:px-10 md:flex-row md:py-12">
      <div className="px-4 py-6">
        <h3 className="text-white text-center text-2xl font-lora font-semibold leading-loose">
          About Arlé
        </h3>
        <div className=" text-zinc-100 text-base font-normal font-raleway leading-tight md:max-w-3xl">
          Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar
          elementum tempus hac tellus libero accumsan. Lorem ipsum dolor sit
          amet consectetur adipiscing elit semper dalar elementum tempus hac
          tellus libero accumsan.{" "}
        </div>
      </div>
      
      {/* //*TODO: Refactorizr componente Gradienimg */}

      <GradientImage
        alt={sobre.imagenes[0].alt}
        src={sobre.imagenes[0].url}
        layout="fill"
        containerclassName="h-96 md:w-[400px] md:h-[300px] max-w-3xl"  
      >
        <div className="sticky px-4 py-6 w-full h-full flex items-end md:hidden">
          <Button className="px-4 py-2 w-full bg-white justify-center items-center inline-flex">
            <span className="text-zinc-800 text-lg font-medium font-inter leading-[27px]">
              Listen our poadcast
            </span>
          </Button>
        </div>        
      </GradientImage>
    </section>
  );
};

export default AboutArle;
