"use client";

import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";
import { cn, createUrl, makeNewParams } from "@/app/_lib/utils";

type SearchInputProps = {
  className?: string;
  onSearch?: () => void;
  mobile?: boolean;
  mobileOpen?: boolean;
}

const SearchInput = ({ className, onSearch, mobile, mobileOpen }: SearchInputProps) => {

  const searchParams = useSearchParams();
  const value = searchParams.get("search");
  const { push: redirect } = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const search = form.search as HTMLInputElement;
    onSearch && onSearch();
    redirect(`/listing?search=${search.value.replace(' ','+')}`);
  };

  return (
    <div className={cn(`flex items-center justify-between h-[36px] w-2/5 rounded border transition-all ${mobile && mobileOpen ? '' : mobile && 'border-color-bg-surface-0-default bg-color-bg-surface-0-default rounded-[0]'}`, className)}>
      <form onSubmit={onSubmit} className={`${mobile && !mobileOpen ? 'pl-0' : 'pl-3'} flex w-full h-full items-center`}>
        <input
          // onKeyDown={handleKeyDown}
          className={`w-full focus-visible:outline-none placeholder:text-gray-400 font-inter placeholder:font-light text-[14px] text-gray-700 ${mobile && !mobileOpen && 'hidden'}`}
          placeholder="Busca productos, marcas y más..."
          name="search"
          type="text"
          defaultValue={value || ""}
        />
      <button type="submit" className={`${mobile && mobileOpen ? '' : mobile && 'border-none'} border-l pl-2 pr-2 h-full`}>
        <FiSearch className="w-[18px] h-[18px] stroke-gray-600"/> 
      </button>
      </form>
    </div>
  );
};

export default SearchInput;