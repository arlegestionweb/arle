import { TImage } from "@/sanity/queries/pages/zodSchemas/general";
import Image from "next/image";

type ImageWrapperProps = {
  isExternal: boolean;
  imagen: TImage;
  height: number;
  width: number;
  className: string;
};

const ImageWrapper = (props: ImageWrapperProps) => {
  console.log(props);

  // return <></>
  if (props.isExternal ) {
    return (
      <img
        src={props.imagen.urlImage!}
        alt={props.imagen.alt}
        className={props.className}
      />
    );
  }

  if( props.imagen?.alt && props.imagen.url){
      return (
        <Image
          alt={props.imagen.alt}
          src={props.imagen.url}
          height={props.height}
          width={props.width}
          className={props.className}
        />
      );
  }
};

export default ImageWrapper;
