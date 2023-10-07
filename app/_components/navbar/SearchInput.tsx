"use client";

import Link from "next/link";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { AiOutlineEnter } from "react-icons/ai";
import { type } from "os";
import { cn } from "@/app/_lib/utils";

type SearchInputProps = {
  className?: string;
}

const SearchInput = ({className}: SearchInputProps) => {
  const [value, setValue] = useState("");
  const { push: redirect } = useRouter();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // Add your logic here'
      redirect(`/listing?search=${value}`, { scroll: false });
    }
  };

  return (
    <div className={cn("flex items-center justify-between h-9 w-2/5 rounded-lg border bg-background px-3 pl-3 gap-2 py-[6px]", className)}>
      <div className="flex items-center gap-2">
        <FiSearch />
        <input
          onKeyDown={handleKeyDown}
          className="w-full focus-visible:outline-none placeholder:text-[#79767A] "
          placeholder="Search"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <Link href={`/listing?search=${value}`}>
        <AiOutlineEnter />
      </Link>
    </div>
  );
};

export default SearchInput;
