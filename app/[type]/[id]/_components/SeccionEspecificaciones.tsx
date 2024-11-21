import { cn } from "@/app/_lib/utils";

type TSeccionEspecificacionesProps = {
  title: string;
  paragraph: string | number;
  dontCapitalize?: boolean;
};

const SeccionEspecificaciones = ({
  title,
  paragraph,
  dontCapitalize
}: TSeccionEspecificacionesProps) => {
  return (
    <div className="flex flex-col">
      <h3 className="content-title">
        {title}
      </h3>
      <p className={dontCapitalize ? "content-text" : "content-text capitalize"}>{paragraph}</p>
    </div>
  );
};

export default SeccionEspecificaciones;