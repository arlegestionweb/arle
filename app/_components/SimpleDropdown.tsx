import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { TBrand } from "@/sanity/queries/menu";

export type TDropdownOption = {
  titulo: string;
}

const useOutsideHover = <T extends HTMLElement>(
  ref: RefObject<T>,
  callback: () => void,
  isOpen: boolean,
  setViewAll: Dispatch<SetStateAction<boolean>>,
) => {
  useEffect(() => {
    const handleMouseLeave = (event: MouseEvent) => {
      const relatedTarget = event.relatedTarget as Node;
      if (ref.current && !ref.current.contains(relatedTarget)) {
        callback();
        setViewAll(false);
      }
    };

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (isOpen && ref.current && !ref.current.contains(event.target as Node)) {
        callback();
        setViewAll(false);
      }
    };

    const element = ref.current;
    if (element) {
      element.addEventListener('mouseleave', handleMouseLeave);
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside); // For mobile support

    return () => {
      if (element) {
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, callback, setViewAll]);
};

const SimpleDropdown = ({ options, isOpen, onClose, ignoreRef }: {
  options: TBrand;
  isOpen: boolean;
  onClose: () => void;
  ignoreRef?: React.RefObject<HTMLElement>;
}) => {
  const dropdownRef = useRef<HTMLUListElement | null>(null);
  const [viewAll, setViewAll] = useState(false);
  const [newOptions, setNewOptions] = useState<TBrand>([]);

  useEffect(()=> {
    if(!viewAll) options && setNewOptions(options.filter(option => option.sugerida === true))
    else options && setNewOptions(options)
  }, [viewAll, options])

  useOutsideHover(dropdownRef, onClose, isOpen, setViewAll);

  if (!isOpen) return null;

  return (
    <ul ref={dropdownRef} className="absolute top-5 translate-y-1 right-0 min-w-full w-fit text-left flex flex-col z-50 bg-white border border-black max-h-[60svh] overflow-y-scroll px-1 py-2 gap-1 small-scrollbar font-tajawal font-normal text-base ">
      {newOptions && newOptions.map((option, index) => 
        (
          <li key={index + option.titulo } onClick={onClose} className="px-2 group w-fit min-w-full">
          <Link href={`/listing?marcas=${option.titulo.replace("&","AND")}`} scroll={false} >
          <p className="whitespace-nowrap text-gray-800 leading-tight underline-offset-2 group-hover:underline group-hover:text-gray-600">
          {option.titulo}
          </p>
          </Link>
          </li>
        ))}
        {!viewAll && (
          <button className="w-full flex justify-center bg-gray-100 hover:bg-gray-200" onClick={() => setViewAll(true)}>Todas...</button>
        )}
    </ul>
  )
}

export default SimpleDropdown;