"use client";

import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";
import { cn, createUrl, makeNewParams } from "@/app/_lib/utils";

type SearchInputProps = {
  className?: string;
  onSearch?: () => void;
}

const SearchInput = ({ className, onSearch }: SearchInputProps) => {

  const searchParams = useSearchParams();
  const value = searchParams.get("search");
  const { push: redirect } = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const search = form.search as HTMLInputElement;
    onSearch && onSearch();
    redirect(
      createUrl("/listing", makeNewParams("search", search.value, searchParams)),
      { scroll: false }
    );
  };

  return (
    <div className={cn("flex items-center justify-between h-8 w-2/5 rounded border pl-3 py-[6px]", className)}>
      <form onSubmit={onSubmit} className="flex w-full h-full items-center">
        <input
          // onKeyDown={handleKeyDown}
          className="w-full focus-visible:outline-none placeholder:text-gray-400 font-inter placeholder:font-light text-[14px] text-gray-700"
          placeholder="Busca productos, marcas y más..."
          name="search"
          type="text"
          defaultValue={value || ""}
        />
      </form>
      <button type="submit" onClick={onSearch} className="border-l pl-2 pr-3 h-full">
        <FiSearch className="w-[18px] h-[18px] "/> 
      </button>
    </div>
  );
};

export default SearchInput;