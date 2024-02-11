import Link from "next/link";
import GradientImage from "../GradientImage";
import { TAsesoriaSection } from "@/sanity/queries/pages/homepageQuery";

type PageProps = {
    content: TAsesoriaSection
}

const Asesoria = ({content}: PageProps) => {
	return (
		<section className="w-full flex flex-col md:flex-row md:justify-end bg-white">
			{content.usarImagen && content.imagenAsesoria.imagen && (
				<section className="w-full md:w-1/2 h-[350px] sm:h-[500px] p-8  md:pr-0 md:max-w-screen-sm">
					<GradientImage
					alt={content.imagenAsesoria.imagen.alt}
					src={content.imagenAsesoria.imagen.url}
					layout="fill"
					containerclassName="w-full h-[400px] bg-color-bg-surface-1-default self-stretch">
					</GradientImage>
				</section>
			)}
			<section className={`${content.usarImagen ? 'w-full md:w-1/2 items-start' : 'w-full items-center'} md:pl-14  px-4 xs:px-8 sm:px-14 pb-14 md:py-0 flex flex-col justify-center gap-6`}>
				<h3 className="lux-title text-gray-800 text-3xl drop-shadow-none">{content.titulo}</h3>
				<ul className="pl-4 list-disc flex flex-col justify-center gap-4 ">
					{content.beneficios && content.beneficios.map((beneficio, i) => (
						<li className="text-gray-700 text-lg font-normal font-tajawal leading-tight" key={i}>{beneficio}</li>
						))}
				</ul>
				<Link href="/listing" className="dark-button">Quiero una asesoría</Link>
			</section>
		</section>
	)

}

export default Asesoria;