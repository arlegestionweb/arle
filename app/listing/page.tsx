
import { Metadata } from "next";
import { Suspense } from "react";
import ListingComponent from "./_components/ListingComponent";
import Spinner from "../_components/Spinner";
import Main from "../_components/Main";
import ContentLoader from "./_components/ContentLoader";

export const metadata: Metadata = {
  title: "ARLÉ | Productos",
};

const Listing = ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) =>{


  return(
    <Main extraClasses=" lg:mb-[100vh] bg-white min-h-screen">
      <Suspense fallback={<div>Cargando...</div>}>
        <ContentLoader>
          <ListingComponent searchParams={searchParams} />
        </ContentLoader>
      </Suspense>
    </Main>
  )
}


// Componente que maneja la lógica de renderizado basado en searchParams
const ContentRenderer = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  // Simula el tiempo de carga con una función asíncrona en el servidor
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulación de latencia
  
  // Devuelve el componente listado con los nuevos searchParams
  return <ListingComponent searchParams={searchParams} />;
}

export default Listing;
