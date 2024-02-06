import Link from "next/link";
import GradientImage from "../GradientImage";
import { TAsesoriaSection } from "@/sanity/queries/pages/homepageQuery";

type PageProps = {
    content: TAsesoriaSection
}

const Asesoria = ({content}: PageProps) => {
	return (
		<section className="w-full flex flex-col md:flex-row bg-white">
			{content.usarImagen && content.imagenAsesoria.imagen && (
				<section className="w-full md:w-1/2 h-[500px] p-12 md:pr-0">
					<GradientImage
					alt={content.imagenAsesoria.imagen.alt}
					src={content.imagenAsesoria.imagen.url}
					layout="fill"
					containerclassName="w-full h-[400px] bg-color-bg-surface-1-default self-stretch">
					</GradientImage>
				</section>
			)}
			<section className={`${content.usarImagen ? 'w-full md:w-1/2 items-start' : 'w-full items-center'} md:pl-14  px-10 py-6 md:py-12 flex flex-col justify-center gap-6`}>
				<h3 className="text-zinc-800  text-center font-lora text-2xl md:text-[28px] font-semibold leading-[115%]">{content.titulo}</h3>
				<ul className="pl-4 list-disc flex flex-col justify-center gap-4 text-zinc-800 text-base font-normal font-raleway leading-tight">
					{content.beneficios && content.beneficios.map((beneficio, i) => (
						<li key={i}>{beneficio}</li>
						))}
				</ul>
				<Link href="/listing" className="px-4 py-2 w-full bg-black text-white justify-center items-center flex md:max-w-sm">Quiero una asesoría</Link>
			</section>
		</section>
	)

}

export default Asesoria;