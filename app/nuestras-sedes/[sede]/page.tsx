import { getSedeByTitle } from "@/sanity/queries/pages/nuestrasSedesQueries";
import Image from "next/image";
import ImageScroller from "../_components/ImageScroller";

export const dynamic = "force-dynamic";

const Page = async ({params}: { params: { sede: string }}) => {

	const sede = await getSedeByTitle(params?.sede);
	
	console.log(sede);
	if(!sede) return null;

	return(
		<main className="w-full pt-[70px] md:pt-0 bg-white flex flex-col items-center">
			<ImageScroller images={sede.imagenes}/>
			<section className="flex flex-col md:flex-row w-full max-w-screen-xl md:h-[400px]">
				<article className="w-full md:w-[50%] flex flex-col p-12 gap-5 justify-center">
					<h1>{sede.title}</h1>
					<p>{sede.text}</p>
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
						<h1>Atención Personalizada</h1>
						<p>Agenda una cita para que obtengas una atención personalizada en esta sede.</p>
						<button>Agendar</button>
					</article>
					<article className="w-full md:w-[50%] flex flex-col p-12 gap-5">
						<h1>Excelente Ubicación</h1>
						<p>{sede.findUsIn}</p>
						<section className="w-full flex" dangerouslySetInnerHTML={{__html: sede.map}} />
					</article>
				</section>
			</section>
		</main>
	)
}

export default Page;