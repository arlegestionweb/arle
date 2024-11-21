"use client";
import { useRef } from "react";
import Link from "next/link";


export type TDropdownOption = ({
  label?: string;
  value?: string;
  href?: string;
} | undefined | null)

const Dropdown = ({ options, isOpen, onClose, ignoreRef }: {
  options: TDropdownOption[] | undefined | null;
  isOpen: boolean;
  onClose: () => void;
  ignoreRef?: React.RefObject<HTMLElement>;
}) => {
  const dropdownRef = useRef<HTMLUListElement | null>(null);

  if (!isOpen) return null;

  return (
    <ul ref={dropdownRef} className="absolute top-full translate-y-1 left-0 min-w-full w-fit text-left flex flex-col z-30 bg-white border border-black">
      {options?.map((option) => {
        return (
          <li key={option?.value} className="hover:bg-slate-100 px-2 w-fit min-w-full">
            <Link href={option?.href || ""} scroll={false}>
              <p className="whitespace-nowrap">
                {option?.label}
              </p>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default Dropdown;