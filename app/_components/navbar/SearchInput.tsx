"use client";

import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";
import { AiOutlineEnter } from "react-icons/ai";
import { createUrl, makeNewParams } from "@/sanity/lib/utils";
import { cn } from "@/app/_lib/utils";

type SearchInputProps = {
  className?: string;
}

const SearchInput = ({className}: SearchInputProps) => {

  const searchParams = useSearchParams();
  const value = searchParams.get("search");
  const { push: redirect } = useRouter();

  const handleKeyDown = (event: React.ChangeEvent<HTMLInputElement>) => {
    redirect(
      createUrl("/listing", makeNewParams("search", event.currentTarget.value, searchParams))
    );
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const search = form.search as HTMLInputElement;
    redirect(
      createUrl("/listing", makeNewParams("search", search.value, searchParams)), 
      { scroll: false }
    );
  };
  return (
    <div className={cn("flex items-center justify-between h-9 w-2/5 rounded-lg border bg-background px-3 pl-3 gap-2 py-[6px]", className)}>
      <form onSubmit={onSubmit} className="flex items-center gap-2">
        <FiSearch />
        <input
          // onKeyDown={handleKeyDown}
          className="w-full focus-visible:outline-none placeholder:text-[#79767A] "
          placeholder="Buscar"
          name="search"
          type="text"
          defaultValue={value || ""}
          onChange={handleKeyDown}
        />
      </form>
      <Link href={`/listing?search=${value}`}>
        <AiOutlineEnter />
      </Link>
    </div>
  );
};

export default SearchInput;
