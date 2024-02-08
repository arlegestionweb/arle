import { IoCloseSharp } from "react-icons/io5";
import SearchInput from "../SearchInput";
import Link from "next/link";
import { GoArrowUpRight, GoChevronLeft } from "react-icons/go";
import Button from "../../Button";
import { useRouter } from "next/navigation";

type ModalContentProps = {
  marca?: string | null;
  setIsMenu: (arg0: boolean) => void;
  isMenuOpen: boolean;
  title?: string;
  subtitle: string;
  items: { name: string }[];
  setSelectedItems: (arg0: any) => void;
  selectedItems: { name: string }[];
  currentScreen: number;
} & (
    | { withBackButton: true; onBackButtonClick: () => void }
    | { withBackButton?: false; onBackButtonClick?: never }
  );


const ModalContent = ({ marca, selectedItems, currentScreen, setIsMenu, isMenuOpen, title, items, setSelectedItems, subtitle, withBackButton, onBackButtonClick }: ModalContentProps) => {
  const [productType, gender] = selectedItems.map(item => item.name);

  const { push } = useRouter()
  const linkToAll = currentScreen === 0 ? '/listing' :
    currentScreen === 2 ? `/listing?type=${productType}&genero=${gender}` :
      `/listing?type=${subtitle === "perfumes" ? "perfume" : subtitle?.toLowerCase()}`
  return (
    <aside
      className={`${isMenuOpen ? "" : "hidden"
        } w-[80vw]  max-w-[400px] min-w-[400px] flex-grow h-screen bg-white flex-col relative overflow-y-scroll`}
    >
      <header className="w-full border-b border-stone-300 h-16 p-4 flex items-center justify-between">
        {withBackButton ? (
          <button className="flex items-center" onClick={onBackButtonClick}>
            <GoChevronLeft className="w-5 h-5" />
            <span className="text-black text-sm font-semibold font-inter leading-[21px]">
              Volver
            </span>
          </button>
        ) : (

          <h1 className="grow capitalize shrink basis-0 text-zinc-800 text-xl font-bold font-tajawal leading-normal">{title}</h1>
        )}
        <IoCloseSharp className="cursor-pointer w-5 h-5" onClick={() => setIsMenu(false)} />
      </header>
      <section className="py-[18px] px-4 flex flex-col gap-[12px]">
        <div className="md:hidden">
          <SearchInput className="w-full" onSearch={() => setIsMenu(false)} />
        </div>
        <h2 className="text-zinc-800 text-lg  font-semibold font-tajawal leading-snug capitalize">{subtitle === "perfume" ? "perfumes" : subtitle}</h2>
        {items.length > 0 ? (

          <ul className="flex flex-col gap-[12px] ">
            {items.map((item) => (
              <li className="cursor-pointer"
                key={item.name}
                onClick={() => {
                  if (currentScreen === 2) {
                    setIsMenu(false)
                    push(`/listing?type=${productType}&genero=${gender}&marcas=${item.name}`, { scroll: false })
                  } else {
                    setSelectedItems((prev: { name: string }[]) => [...prev, item])
                  }
                }}
              >
                <h3 className="capitalize text-zinc-800 text-base font-normal font-tajawal leading-tight">
                  {item.name === "perfume" ? "perfumes" : item.name}
                </h3>
              </li>
            ))}
            <li className="">
              <Link href={linkToAll} className="flex items-center gap-2" onClick={() => setIsMenu(false)} >
                <h3 className="capitalize text-zinc-800 text-base font-normal font-tajawal leading-tight">
                  todos
                </h3>
              </Link>
            </li>

          </ul>
        ) : (
          <p className="text-zinc-800 text-base font-normal font-tajawal leading-tight">Cargando...</p>
        )}
      </section>
      <footer className="p-4 flex flex-col gap-6">
        <Link href={'/sobre-nosotros'} className="flex items-center gap-2" onClick={() => setIsMenu(false)}>
          <GoArrowUpRight className="w-5 h-5" />
          <p className="text-zinc-800 text-base font-normal font-tajawal leading-tight">Acerca de ARLÉ</p>
        </Link>
        {marca && (
          <Link href={`/listing?marcas=${marca}`} className="w-full flex justify-center border-black border py-1" onClick={() => setIsMenu(false)}>
          <p className="text-black text-base font-medium font-inter leading-normal">{marca}</p>
          </Link>
        )}
      </footer>
    </aside>
  );
}

export default ModalContent;