import { useEffect, useRef, useState } from "react";

interface ShippingFormProps {
  errorPaths: string[];
}

const ShippingForm: React.FC<ShippingFormProps> = ({errorPaths}) => {
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
  
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("shippingData") || "{}");
    if(savedData){
      setFormData((prevData) => ({ ...prevData, ...savedData }));
    }
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      localStorage.setItem("shippingData", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  return (
    <section className="flex flex-col gap-3 py-2">
      <h3 className="text-zinc-600 text-xl font-bold font-tajawal leading-normal">
        Ingresa la información de envío
      </h3>
      <p className="-mt-4 font-tajawal font-light text-base text-gray-600">(*) Campo requerido</p>

      <InputComponent
        id="name"
        name="name"
        title="Nombres y Apellidos *"
        value={formData.name}
        onChange={handleChange}
        autocomplete="name"
        errorPaths={errorPaths}
      />

      <InputComponent
        id="id"
        name="id"
        title="Identificación *"
        type="id"
        value={formData.id}
        onChange={handleChange}
        autocomplete="legal-id"
        errorPaths={errorPaths}
      />

      <InputComponent
        id="phone"
        name="phone"
        title="Teléfono *"
        type="number"
        value={formData.phone}
        onChange={handleChange}
        autocomplete="tel"
        errorPaths={errorPaths}
      />

      <InputComponent
        id="email"
        name="email"
        placeholder="email@ejemplo.com.co"
        title="Correo electrónico *"
        type="email"
        value={formData.email}
        onChange={handleChange}
        autocomplete="email"
        errorPaths={errorPaths}
      />

      <InputComponent
        id='country'
        name="pais"
        type="select"
        autocomplete="country-name"
        options={availableCountries}
        value={formData.pais}
        onChange={handleChange}
        title="País"
        errorPaths={errorPaths}
      />

      <div className="flex justify-between gap-2">
        <InputComponent
          id='city'
          name="ciudad" 
          value={formData.ciudad}
          onChange={handleChange}
          title="Ciudad *" 
          errorPaths={errorPaths}
        />

        <InputComponent
          id='postal'
          name="codigoPostal"
          title="Código Postal"
          value={formData.codigoPostal}
          onChange={handleChange}
          autocomplete="postal-code"
          errorPaths={[]}
        />
      </div>
      <InputComponent 
        id='department'
        name="departamento" 
        title="Departamento *" 
        value={formData.departamento}
        onChange={handleChange}
        errorPaths={errorPaths}
        type="text"
      />
      <InputComponent
        id='addressObject.address'
        name="direccion"
        title="Dirección de envío *"
        autocomplete="street-address"
        value={formData.direccion}
        onChange={handleChange}
        errorPaths={errorPaths}
      />
    </section>
  );
};

type TInputComponent =
  | {
      id:string;
      autocomplete?: string;
      name: string;
      type?: "text" | "number" | "id" | "email";
      title?: string;
      placeholder?: string;
      options?: string[];
      value: string;
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
      errorPaths: string[];
    }
  | {
      id:string;
      autocomplete?: string;
      name: string;
      type?: "select";
      title?: string;
      placeholder?: string;
      options: string[];
      value: string;
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
      errorPaths: string[];
    };

    const placeholderTexts = [
    {
      name: 'name',
      text: 'Ingresa tu nombre'
    },
    {
      name: 'phone',
      text: 'Ingresa tu teléfono'
    },
    {
      name: 'email',
      text: 'Ingresa tu email'
    },
    {
      name: 'city',
      text: 'Ingresa tu ciudad'
    },
    {
      name: 'department',
      text: 'Ingresa tu departamento'
    },
    {
      name: 'addressObject.address',
      text: 'Ingresa tu dirección'
    },
  ]

const InputComponent = ({
  id,
  autocomplete,
  name,
  type = "text",
  title,
  placeholder,
  options,
  value,
  onChange,
  errorPaths,
}: TInputComponent) => {

  
  const inputRef = useRef<any>(null);
  
  const [inputError, setInputError] = useState(false);
  
  useEffect(() => {
    if (errorPaths.some((path) => path.includes(id))){
      setInputError(true);
      if (inputRef.current) {
        inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else setInputError(false)
  }, [errorPaths]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (inputError === true) {
      setInputError(false); 
    }
    onChange(e);
  };

  if (type === "text" || type === "email" || type === "number")
    return (
      <label
        htmlFor={name}
        className=" flex flex-col"
      >
        <h4 className="text-zinc-700 text-base font-medium font-tajawal leading-snug">{title || name}</h4>
        <input
          ref={inputRef}
          className={`${inputError && 'border-red-500'} rounded-md border border-gray-200 bg-gray-50 w-full focus-visible:outline-arle-blue h-9 px-3`}
          autoComplete={autocomplete || ""}
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Deshabilitar el "Enter" en este campo
            }
          }}
          placeholder={placeholder}
        />
        <p className="text-red-500 text-sm font-inter font-normal">{inputError ? placeholderTexts.find(item => item.name === id)?.text : ''}</p>
      </label>
    );

  if (type === "id")
    return (
      <label htmlFor={name}>
        <h4 className="text-zinc-700 text-base font-medium font-tajawal leading-snug focus-visible:outline-arle-blue">
          {title || name}
        </h4>
        <div className="flex">
          <select
            name="idType"
            className= {`${inputError && 'border-red-500'} border-gray-200 bg-gray-50 w-[58px] h-9 pl-2 py-[5px] rounded-tl-md rounded-bl-md border-l border-t border-b focus-visible:outline-arle-blue`}
          >
            <option value="CC">CC</option>
            <option value="NIT">NIT</option>
            <option value="TI">TI</option>
            <option value="CE">CE</option>
            <option value="PP">Pasaporte</option>
          </select>

          <input
            className={`${inputError && 'border-red-500'} w-full focus-visible:outline-arle-blue h-9 px-3 border-gray-200 bg-gray-50 rounded-tr-md rounded-br-md border-r border-t border-b`}
            ref={inputRef}
            autoComplete={autocomplete}
            type="number"
            name={name}
            id={name}
            value={value}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // Deshabilitar el "Enter" en este campo
              }
            }}
            placeholder={placeholder}
          />
        </div>
          <p className="text-red-500 text-sm font-inter font-normal">{inputError ? 'Ingresa tu número de documento' : ''}</p>
      </label>
    );
  if (type === "select")
    return (
      <label
        htmlFor={name}
        className="flex flex-col"
      >
        <h4 className="text-zinc-700 text-base font-medium font-tajawal leading-snug ">{title || name}</h4>
        <select
          className="rounded-md border border-gray-200 bg-gray-50 w-full focus-visible:outline-arle-blue h-9 px-3"
          name={name}
          id={name}
          value={value}
          onChange={onChange}
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