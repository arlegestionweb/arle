import { RefObject, useEffect, useRef } from "react";
import Link from "next/link";
import { TBrand } from "@/sanity/queries/menu";

export type TDropdownOption = {
  titulo: string;
}

const useOutsideClick = <T extends HTMLElement>(
  ref: RefObject<HTMLElement>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};

const SimpleDropdown = ({ options, isOpen, onClose, ignoreRef }: {
  options: TBrand;
  isOpen: boolean;
  onClose: () => void;
  ignoreRef?: React.RefObject<HTMLElement>;
}) => {
  const dropdownRef = useRef<HTMLUListElement | null>(null);

  useOutsideClick(dropdownRef, onClose);


  if (!isOpen) return null;

  return (
    <ul ref={dropdownRef} className="absolute top-5 translate-y-1 left-0 min-w-full w-fit text-left flex flex-col z-30 bg-white border border-black max-h-[60svh] overflow-y-scroll p-1 gap-0.5">
      {options && options.map((option, index) => {
        return (
          <li key={index + option.titulo } className="hover:bg-slate-100 px-2 w-fit min-w-full">
            <Link href={`/listing?marcas=${option.titulo}`} scroll={false} >
              <p className="whitespace-nowrap">
                {option.titulo}
              </p>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default SimpleDropdown;