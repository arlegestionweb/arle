"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";

const SearchDesktop = () => {
  const [value, setValue] = useState("");
  const { push: redirect } = useRouter();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log("Enter key pressed!", value);
      // Add your logic here'
      redirect(`/listing?search=${value}`, { scroll: false });
    }
  };

  return (
    <Link
      href={`/listing?search=${value}`}
      className="flex h-9 w-2/5 rounded-lg border bg-background px-3 pl-9 py-[6px] placeholder:text-[#79767A] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-0  disabled:opacity-50"
    >
      <FiSearch />
      <input
        onKeyDown={handleKeyDown}
        className=""
        placeholder="Search"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </Link>
  );
};

export default SearchDesktop;
