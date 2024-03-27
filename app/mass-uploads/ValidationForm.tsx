"use client";
import { useFormState } from "react-dom";
import { excelData, uploadFile, validateUser } from "./actions";

const ValidationForm = () => {
  const [userFormState, formAction] = useFormState(validateUser, { error: null, success: process.env.NODE_ENV === "development" });
  const [uploadFormState, uploadFormAction] = useFormState(uploadFile, { error: null, success: false, data: [] });





  const titles = uploadFormState.data?.slice(0, 6)

  
  
  if (userFormState.success) {
    console.log({ titles })
    return <div className="fixed top-0 z-[100] bg-white text-black w-screen h-screen overflow-scroll flex flex-col gap-5 justify-center">
      <div className="flex gap-2 items-center flex-col max-w-lg mx-auto text-center">
        <h1 className="text-black text-2xl">Genere un archivo de excel</h1>
        {/* <form action={generateExcelFile}> */}

        <a href="/mass-uploads/generateExcelFile?file=perfumeLujo" className="bg-white w-full text-black border border-black px-10">
          Generar Excel para Perfume de Lujo
        </a>
        <a href="/mass-uploads/generateExcelFile?file=perfumePremium" className="bg-white w-full text-black border border-black px-10">
          Generar Excel para Perfume Premium
        </a>
        <a href="/mass-uploads/generateExcelFile?file=gafasLujo" className="bg-white w-full text-black border border-black px-10">
          Generar Excel para gafas de Lujo
        </a>
        <a href="/mass-uploads/generateExcelFile?file=gafasPremium" className="bg-white w-full text-black border border-black px-10">
          Generar Excel para gafas Premium
        </a>
        <a href="/mass-uploads/generateExcelFile?file=relojesLujo" className="bg-white w-full text-black border border-black px-10">
          Generar Excel para relojes de Lujo
        </a>
        <a href="/mass-uploads/generateExcelFile?file=relojesPremium" className="bg-white w-full text-black border border-black px-10">
          Generar Excel para relojes Premium
        </a>
        <form action={uploadFormAction}>
          <input type="file" name="file" />
          <button type="submit" className="bg-white text-black border border-black px-2">
            Upload file
          </button>
        </form>
      </div>
      {/* </form> */}
      <Titles titles={titles} />
    </div>
  }

  return (
    <div className="fixed top-0 z-[100] bg-white text-black w-screen h-screen flex items-center justify-center">
      <form action={formAction} className="flex flex-col gap-4">
        <label className="flex flex-col" htmlFor="email">
          <span>E-mail</span>
          <input className="border border-black" type="email" name="email" />
        </label>
        <label className="flex flex-col" htmlFor="password">
          <span>Password</span>
          <input className="border border-black" type="password" name="password" />
        </label>
        <button type="submit" className="bg-white text-black border border-black">
          Submit
        </button>
        {userFormState.error && <p className="text-red-600 text-base">{userFormState.error}</p>}
      </form>
    </div>
  );
}

export default ValidationForm;

const Titles = ({ titles }: { titles?: excelData[]; }) => {
  return (
    <ul className="flex flex-col justify-center bg-red-400">
      {titles?.map((title, index) => (
        <li key={index} className="m-4 flex flex-wrap p-4 border bg-green-300 border-gray-300 gap-2 rounded shadow-lg w-full">
          {Array.isArray(title.values) && title.values.map((value, index) => {
            let displayValue = '';
            if (value instanceof Date) {
              displayValue = value.toString();
            } else if (typeof value === 'number' || typeof value === 'boolean') {
              displayValue = value.toString();
            } else if (typeof value === 'string') {
              displayValue = value;
            } else if (value === null || value === undefined) {
              displayValue = '';
            } else {
              // Handle other types here
            }
            return <p key={index} className="bg-gray-200 min-w-[4ch]">{displayValue}</p>
          })}
        </li>
      ))}
    </ul>
  );
}