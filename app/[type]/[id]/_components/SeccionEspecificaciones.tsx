type TSeccionEspecificacionesProps = {
  title: string;
  paragraph: string;
};

const SeccionEspecificaciones = ({
  title,
  paragraph,
}: TSeccionEspecificacionesProps) => {
  return (
    <div className="flex flex-col">
      <h3 className="text-neutral-600 text-lg font-bold font-tajawal leading-snug">
        {title}
      </h3>
      <p>{paragraph}</p>
    </div>
  );
};

export default SeccionEspecificaciones;