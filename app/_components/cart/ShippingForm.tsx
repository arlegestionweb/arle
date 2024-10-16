

const ShippingForm = () => {
  const availableCountries = ["Colombia"];
  return (
    <section className="flex flex-col gap-3 py-6">
      <h3 className="text-zinc-800 text-xl font-bold font-tajawal leading-normal">
        Información de envío
      </h3>
      <p className="-mt-4 font-tajawal font-light text-base text-gray-600">(*) Campo requerido</p>

      <InputComponent
        name="name"
        title="Nombres y Apellidos *"
        autocomplete="name"
      />

      <InputComponent
        name="id"
        title="Identificación *"
        type="id"
        autocomplete="legal-id"
      />

      <InputComponent
        name="phone"
        title="Teléfono *"
        type="number"
        autocomplete="tel"
      />

      <InputComponent
        name="email"
        placeholder="email@ejemplo.com.co"
        title="Correo electrónico *"
        type="email"
        autocomplete="email"
      />

      <InputComponent
        name="pais"
        type="select"
        autocomplete="country-name"
        options={availableCountries}
        title="País"
      />

      <div className="flex justify-between gap-2">
        <InputComponent 
        name="ciudad" 
        title="Ciudad *" />

        <InputComponent
          name="codigoPostal"
          title="Código Postal"
          autocomplete="postal-code"
        />
      </div>
        <InputComponent name="departamento" title="Departamento *" />
      <InputComponent
        name="direccion"
        title="Dirección de envío *"
        autocomplete="street-address"
      />
    </section>
  );
};

type TInputComponent =
  | {
      autocomplete?: string;
      name: string;
      type?: "text" | "number" | "id" | "email";
      title?: string;
      placeholder?: string;
      options?: string[];
    }
  | {
    autocomplete?: string;
    name: string;
    type?: "select";
    title?: string;
    placeholder?: string;
    options: string[]; // This prop is required when type is "pais"
  };

const InputComponent = ({
  autocomplete,
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
          autoComplete={autocomplete || ""}
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
            <option value="cc">NIT</option>
            <option value="ti">TI</option>
            <option value="ce">CE</option>
            <option value="pp">Pasaporte</option>
          </select>

          <input
            className="w-full focus-visible:outline-arle-blue h-9 px-3 bg-white rounded border border-stone-300"
            autoComplete={autocomplete}
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