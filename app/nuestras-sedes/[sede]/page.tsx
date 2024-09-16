import { getSedeByTitle } from "@/sanity/queries/pages/nuestrasSedesQueries";
import ImageScroller from "../_components/ImageScroller";
import Main from "@/app/_components/Main";
import { GoChevronLeft } from "react-icons/go";
import Link from "next/link";
import { unstable_noStore } from "next/cache";


const Page = async ({params}: { params: { sede: string }}) => {
	unstable_noStore();


	const sede = await getSedeByTitle(params?.sede);
	
	if(!sede) return null;

	return(
		<Main extraClasses="bg-white flex flex-col items-center min-h-screen md:mt-[53px]">
			<section className="default-paddings w-full flex">
			<header className="flex py-8 w-full max-w-screen-xl">
			<Link href="/nuestras-sedes"
            className="flex items-center -ml-1 mb-3 group"
            
          >
            <GoChevronLeft className="text-lg text-gray-700 group-hover:text-gray-500" />
            <span className="text-gray-700 text-base font-normal font-inter leading-[21px] underline-offset-2 group-hover:underline group-hover:text-gray-500">
              Volver
            </span>
          </Link>
				<h1 className="font-jomolhari tracking-tight leading-snug text-2xl xs:text-3xl text-gray-800 w-full text-center">Sede: {sede.nombre}</h1>
			</header>
			</section>
			<ImageScroller images={sede.imagenes}/>
			<section className="flex flex-col md:flex-row w-full max-w-screen-xl">
				<article className="w-full md:w-[50%] flex flex-col p-12 pb-0 md:pb-12 gap-5 justify-center">
					<h1 className="about-title">{sede.title}</h1>
					<p className="about-text">{sede.text}</p>
				</article>
				<section className="w-full md:w-[50%] h-full p-12 md:pl-0 flex justify-center">
					<video className="w-full h-full max-h-96 object-cover" controls width="600" height="400">
						<source src={sede.video?.url} />
						Your browser does not support the video tag
					</video>
				</section>
			</section>
			<section className="w-full flex justify-center bg-[#E5E8ED]">
				<section className="w-full max-w-screen-xl flex flex-col md:flex-row justify-center ">
					<article className="p-12 bg-arle-blue md:bg-transparent w-full md:w-[50%] flex flex-col justify-center gap-5 text-white md:text-black">
						<h1 className="about-title-white md:about-title">Atención Personalizada</h1>
						<p className="about-text-white md:about-text">Agenda una cita para que obtengas una atención personalizada en esta sede.</p>
						<Link href="https://wa.me/573160700015?text=Hola,%20estoy%20interesad@%20en%20recibir%20una%20asesoría%20personalizada%20con%20Arlé!" target="_blank" className="light-button md:dark-button">Agendar</Link>
					</article>
					<article className="w-full md:w-[50%] flex flex-col p-12 gap-5">
						<h1 className="about-title">Excelente Ubicación</h1>
						<p className="about-text">{sede.findUsIn}</p>
						<section className="w-full flex" dangerouslySetInnerHTML={{__html: sede.map}} />
					</article>
				</section>
			</section>
		</Main>
	)
}

export default Page;