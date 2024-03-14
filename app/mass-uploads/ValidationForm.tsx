"use client";
import { useFormState } from "react-dom";
import { generateExcelFile, validateUser } from "./actions";

const ValidationForm = () => {
  const [formState, formAction] = useFormState(validateUser, { error: null, success: process.env.NODE_ENV === "development" });

  if (formState.success) {
    return <div className="fixed top-0 z-[100] bg-white text-black w-screen h-screen flex flex-col gap-5 items-center justify-center">
      <h1 className="text-black text-2xl">Genere un archivo de excel</h1>
      {/* <form action={generateExcelFile}> */}

      <a href="/mass-uploads/generateExcelFile?file=perfumeLujo" className="bg-white text-black border border-black px-10">
        Generar Excel para Perfume de Lujo
      </a>
      <a href="/mass-uploads/generateExcelFile?file=perfumePremium" className="bg-white text-black border border-black px-10">
        Generar Excel para Perfume Premium
      </a>
      <a href="/mass-uploads/generateExcelFile?file=gafasLujo" className="bg-white text-black border border-black px-10">
        Generar Excel para gafas de Lujo
      </a>
      <a href="/mass-uploads/generateExcelFile?file=gafasPremium" className="bg-white text-black border border-black px-10">
        Generar Excel para gafas Premium
      </a>
      <a href="/mass-uploads/generateExcelFile?file=relojesLujo" className="bg-white text-black border border-black px-10">
        Generar Excel para relojes de Lujo
      </a>
      <a href="/mass-uploads/generateExcelFile?file=relojesPremium" className="bg-white text-black border border-black px-10">
        Generar Excel para relojes Premium
      </a>
      {/* </form> */}

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
        {formState.error && <p className="text-red-600 text-base">{formState.error}</p>}
      </form>
    </div>
  );
}

export default ValidationForm;