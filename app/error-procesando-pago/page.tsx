import Link from "next/link";
import Main from "../_components/Main";
import SuccessIcon from "../_components/SuccessIcon";

const Page = () => {
  return (
    <Main extraClasses="bg-white md:mt-[53px] w-full min-h-screen flex flex-col items-center justify-center px-10 pb-10">

      <SuccessIcon failiure/>
      <h1 className="pt-3 font-tajawal font-bold text-4xl leading-none text-gray-800 text-center">Error de pago</h1>

      <section className="flex flex-col gap-1 max-w-screen-xs text-sm md:text-base">

      <h2 className="font-tajawal font-medium text-xl md:text-2xl text-gray-800">Lo sentimos.</h2>
      <h2>Parece que hubo un error procesando el pago de tu pedido.</h2>
      <p>Por favor inténtalo de nuevo.</p>
      
      <Link href="/listing" className="mt-4 dark-button button-float">Finalizar</Link>

      </section>


    </Main>
  );
}

export default Page;