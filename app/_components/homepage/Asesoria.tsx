import Link from "next/link";
import GradientImage from "../GradientImage";
import { TAsesoriaSection } from "@/sanity/queries/pages/homepageQuery";
import GradientVideo from "../GradientVideo";

type PageProps = {
    content: TAsesoriaSection
}

const Asesoria = ({content}: PageProps) => {
	return (
		<section className="w-full flex flex-col md:flex-row md:justify-end bg-white">
			{content.usarImagen && content.imagenAsesoria.imagen && (
				<section className="w-full md:w-1/2 h-[350px] sm:h-[400px] p-8  md:pr-0 md:max-w-screen-sm">
					{content.imagenAsesoria.imagenOVideo ? (
						<GradientImage
						alt={content.imagenAsesoria.imagen.alt || ""}
						src={content.imagenAsesoria.imagen.url}
						layout="fill"
						gradientOff
						containerclassName="w-full h-[400px] bg-color-bg-surface-1-default self-stretch">
					</GradientImage>
					): (
						<GradientVideo
							url={content.imagenAsesoria.videoObject?.video?.url || ""}
							imagenUrl={content.imagenAsesoria.videoObject?.imagenDeCarga?.url || ""}
							imagenAlt={content.imagenAsesoria.videoObject?.imagenDeCarga?.alt || ""}
							containerclassName="w-full h-[400px] bg-color-bg-surface-1-default self-stretch"
							gradientOff
						/>
					)}
				</section>
			)}
			<section className={`${content.usarImagen ? 'w-full md:w-1/2 items-start' : 'w-full items-center'} md:pl-14  px-8 sm:px-14 pb-14 md:py-0 flex flex-col justify-center gap-6`}>
				<h2 className="section-title text-gray-800 ">{content.titulo}</h2>
				<ul className="pl-4 list-disc flex flex-col justify-center gap-1 ">
					{content.beneficios && content.beneficios.map((beneficio, i) => (
						<li key={i + beneficio}><h3 className="text-gray-700 section-text">{beneficio}</h3></li>
						))}
				</ul>
				<Link href="https://wa.me/573160700015?text=Hola,%20estoy%20interesad@%20en%20recibir%20una%20asesoría%20personalizada%20con%20Arlé!" target="_blank" className="dark-button">Quiero una asesoría</Link>
			</section>
		</section>
	)

}

export default Asesoria;