import SearchInput from "../SearchInput";
import Link from "next/link";
import { GoArrowUpRight, GoChevronLeft } from "react-icons/go";
import { useRouter } from "next/navigation";

type ModalContentProps = {
  marca?: string | null;
  setIsMenu: (arg0: boolean) => void;
  isMenuOpen: boolean;
  subtitle: string;
  items: { name: string }[];
  setSelectedItems: (arg0: any) => void;
  selectedItems: { name: string }[];
  currentScreen: number;
  bottomSection: boolean;
};

const ModalContent = ({
  marca,
  selectedItems,
  currentScreen,
  setIsMenu,
  isMenuOpen,
  items,
  setSelectedItems,
  subtitle,
  bottomSection,
}: ModalContentProps) => {
  const [productType, gender] = selectedItems.map((item) => item.name);

  const { push } = useRouter();
  const linkToAll =
    currentScreen === 0
      ? "/listing"
      : currentScreen === 2
      ? `/listing?type=${productType}&genero=${gender}`
      : `/listing?type=${
          subtitle === "perfumes" ? "perfume" : subtitle?.toLowerCase()
        }`;
  return (
    <aside
      className={`w-screen max-w-[400px] flex-col relative overflow-y-scroll transition-all`}
    >
      <section className="py-[18px] px-6 flex flex-col gap-[12px]">
        <div className="md:hidden">
          <SearchInput className="w-full" onSearch={() => setIsMenu(false)} />
        </div>
        <h2 className="text-zinc-800 text-lg  font-medium font-tajawal leading-snug capitalize cursor-default pb-4">
          {subtitle === "perfume" ? "perfumes" : subtitle}
        </h2>
        {items.length > 0 ? (
          <ul className="flex flex-col gap-[15px] ">
            {items.map((item) => (
              <li
                className="cursor-pointer items-center flex gap-2"
                key={item.name}
                onClick={() => {
                  if (currentScreen === 2) {
                    setIsMenu(false);
                    push(
                      `/listing?type=${productType}&genero=${gender}&marcas=${item.name}`,
                      { scroll: false }
                    );
                  } else {
                    setSelectedItems((prev: { name: string }[]) => [
                      ...prev,
                      item,
                    ]);
                  }
                }}
              >
                {currentScreen === 2 && <GoArrowUpRight className="w-5 h-5" />}
                <h3 className="capitalize text-gray-800 text-base font-normal font-tajawal leading-tight underline-offset-2 hover:underline hover:text-gray-600">
                  {item.name === "perfume" ? "perfumes" : item.name}
                </h3>
              </li>
            ))}
            <li className="">
              <Link
                href={linkToAll}
                className="flex items-center gap-2"
                onClick={() => setIsMenu(false)}
              >
                <GoArrowUpRight className="w-5 h-5" />
                <h3 className="capitalize text-gray-800 text-base font-normal font-tajawal leading-tight underline-offset-2 hover:underline hover:text-gray-600">
                  ver todos
                </h3>
              </Link>
            </li>
          </ul>
        ) : (
          <p className="text-zinc-800 text-base font-normal font-tajawal leading-tight">
            Cargando...
          </p>
        )}
      </section>
      {bottomSection && (
        <section className="p-6 flex flex-col gap-6">
          <Link
            href={"/sobre-nosotros"}
            className="flex items-center gap-2"
            onClick={() => setIsMenu(false)}
          >
            <GoArrowUpRight className="w-5 h-5" />
            <p className="text-zinc-800 text-base font-normal font-tajawal leading-tight underline-offset-2 hover:underline hover:text-gray-600">
              Acerca de ARLÉ
            </p>
          </Link>
          {marca && (
            <Link
              href={`/listing?marcas=${marca}`}
              className="w-full flex justify-center border-black border py-1"
              onClick={() => setIsMenu(false)}
            >
              <p className="text-black text-base font-medium font-inter leading-normal ">
                {marca}
              </p>
            </Link>
          )}
        </section>
      )}
    </aside>
  );
};

export default ModalContent;
