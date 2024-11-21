import Main from "../_components/Main";
import BackButton from "../_components/BackButton";
import InputButton from "./_components/InputButton";

const Page = () => {
  
  return (
    <Main extraClasses="bg-white md:mt-[53px] w-full min-h-screen flex flex-col items-center justify-center px-10 pb-10">
      <section className="w-full flex flex-col max-w-screen-xs gap-4">
        <BackButton />
        <h2 className="font-tajawal font-gray-800 font-bold text-2xl">
          Ingresa tu Código de Compra:
        </h2>
        <InputButton />
      </section>
    </Main>
  );
};

export default Page;
