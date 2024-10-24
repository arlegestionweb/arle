import { useEffect, useState } from "react";


const ShippingForm = () => {
  const availableCountries = ["Colombia"];

  const [formData, setFormData] = useState({
    name: "",
    id: "",
    phone: "",
    email: "",
    pais: "Colombia",
    ciudad: "",
    codigoPostal: "",
    departamento: "",
    direccion: "",
  });
  
  
  
  // Cargar datos del localStorage cuando se monta el componente
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("shippingData") || "{}");
    if(savedData){
      setFormData((prevData) => ({ ...prevData, ...savedData }));
      console.log("checking saved data");
    }
  }, []);
  
  // Manejar el cambio en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      localStorage.setItem("shippingData", JSON.stringify(updatedData)); // Guardar en localStorage cada vez que se actualiza
      return updatedData;
    });
  };

  return (
    <section className="flex flex-col gap-3 py-4">
      <h3 className="text-zinc-800 text-xl font-bold font-tajawal leading-normal">
        Ingresa la información de envío
      </h3>
      <p className="-mt-4 font-tajawal font-light text-base text-gray-600">(*) Campo requerido</p>

      <InputComponent
        name="name"
        title="Nombres y Apellidos *"
        value={formData.name}
        onChange={handleChange}
        autocomplete="name"
      />

      <InputComponent
        name="id"
        title="Identificación *"
        type="id"
        value={formData.id}
        onChange={handleChange}
        autocomplete="legal-id"
      />

      <InputComponent
        name="phone"
        title="Teléfono *"
        type="number"
        value={formData.phone}
        onChange={handleChange}
        autocomplete="tel"
      />

      <InputComponent
        name="email"
        placeholder="email@ejemplo.com.co"
        title="Correo electrónico *"
        type="email"
        value={formData.email}
        onChange={handleChange}
        autocomplete="email"
      />

      <InputComponent
        name="pais"
        type="select"
        autocomplete="country-name"
        options={availableCountries}
        value={formData.pais}
        onChange={handleChange}
        title="País"
      />

      <div className="flex justify-between gap-2">
        <InputComponent 
        name="ciudad" 
        value={formData.ciudad}
        onChange={handleChange}
        title="Ciudad *" />

        <InputComponent
          name="codigoPostal"
          title="Código Postal"
          value={formData.codigoPostal}
          onChange={handleChange}
          autocomplete="postal-code"
        />
      </div>
      <InputComponent 
        name="departamento" 
        title="Departamento *" 
        value={formData.departamento}
        onChange={handleChange}
      />
      <InputComponent
        name="direccion"
        title="Dirección de envío *"
        autocomplete="street-address"
        value={formData.direccion}
        onChange={handleChange}
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
      value: string;
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    }
  | {
      autocomplete?: string;
      name: string;
      type?: "select";
      title?: string;
      placeholder?: string;
      options: string[];
      value: string;
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    };

const InputComponent = ({
  autocomplete,
  name,
  type = "text",
  title,
  placeholder,
  options,
  value,
  onChange,
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
          value={value}
          onChange={onChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Deshabilitar el "Enter" en este campo
            }
          }}
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
            value={value} // Valor controlado
            onChange={onChange} // Función para manejar el cambio
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // Deshabilitar el "Enter" en este campo
              }
            }}
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
          value={value} // Valor controlado
          onChange={onChange} // Función para manejar el cambio
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