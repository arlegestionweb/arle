const ShippingForm = () => {
  const availableCountries = ["Colombia"];
  return (
    <form className="flex flex-col gap-3 py-6">
      <h3 className="text-zinc-800 text-xl font-bold font-tajawal leading-normal">
        Información de envío
      </h3>

      <InputComponent
        name="nombre"
        title="Nombre completo"
      />

      <InputComponent
        name="identificacion"
        title="Identificación"
        type="id"
      />

      <InputComponent
        name="telefono"
        title="Teléfono"
        type="number"
      />

      <InputComponent
        name="email"
        placeholder="email@ejemplo.com.co"
        title="Nombre completo"
        type="email"
      />

      <InputComponent
        name="pais"
        type="select"
        options={availableCountries}
        title="País"
      />

      <div className="flex justify-between gap-2">
        <InputComponent name="ciudad" placeholder="Cali" title="Ciudad" />
        <InputComponent
          name="codigoPostal"
          placeholder="760002"
          title="Código Postal"
        />
      </div>
      <InputComponent
        name="direccion"
        placeholder="Cra. 98 #16-200"
        title="Dirección de envío"
      />
    </form>
  );
};

type TInputComponent =
  | {
      name: string;
      type?: "text" | "number" | "id" | "email";
      title?: string;
      placeholder?: string;
      options?: string[];
    }
  | {
      name: string;
      type?: "select";
      title?: string;
      placeholder?: string;
      options: string[]; // This prop is required when type is "pais"
    };

const InputComponent = ({
  name,
  type = "text",
  title,
  placeholder,
  options,
}: TInputComponent) => {
  if (type === "text" || type === "email" || type === "number")
    return (
      <label
        htmlFor={name}
        className=" flex flex-col"
      >
        <h4 className="text-zinc-800 text-lg font-medium font-tajawal leading-snug">{title || name}</h4>
        <input
          className="w-full focus-visible:outline-arle-blue h-9 px-3 bg-white rounded border border-stone-300"
          type={type}
          name={name}
          id={name}
          placeholder={placeholder || ""}
        />
      </label>
    );

  if (type === "id")
    return (
      <label htmlFor={name}>
        <h4 className="text-zinc-800 text-lg font-medium font-tajawal leading-snug">
          {title || name}
        </h4>
        <div className="flex">
          <select
            name="idType"
            className="w-[58px] h-9 pl-2 py-[5px] bg-zinc-200 rounded-tl rounded-bl border-l border-t border-b border-stone-300"
          >
            <option value="cc">CC</option>
            <option value="ti">TI</option>
            <option value="ce">CE</option>
            <option value="pp">Pasaporte</option>
          </select>

          <input
            className="w-full focus-visible:outline-arle-blue h-9 px-3 bg-white rounded border border-stone-300"
            type="number"
            name={name}
            id={name}
            placeholder={placeholder}
          />
        </div>
      </label>
    );
  if (type === "select")
    return (
      <label
        htmlFor={name}
        className="flex flex-col"
      >
        <h4 className="text-zinc-800 text-lg font-medium font-tajawal leading-snug ">{title || name}</h4>
        <select
          className="w-full focus-visible:outline-arle-blue h-9 px-3 bg-white rounded border border-stone-300"
          name={name}
          id={name}
        >
          {options?.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </label>
    );
};


export default ShippingForm;