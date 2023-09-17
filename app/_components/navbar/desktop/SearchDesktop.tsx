"use client";

import { FormEvent, useState } from "react";

const SearchDesktop = () => {
  const [value, setValue] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(value);
  };

  return (
    <form
      className="w-2/5"
      onSubmit={onSubmit}>
      <input
        className="flex h-9 w-full rounded-lg border bg-background px-3 pl-9 py-[6px] placeholder:text-[#79767A] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-0  disabled:opacity-50"
        placeholder="Search"
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
};

export default SearchDesktop;
