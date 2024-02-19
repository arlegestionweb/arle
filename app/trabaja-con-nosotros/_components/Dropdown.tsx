"use client";

import { useState } from "react";
import { PiSuitcaseSimple } from "react-icons/pi";

const Dropdown = ({ items }: {
  items: string[];
  title: string;

}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <ul>
      <button type="button" className="text-sm sm:text-base border flex items-center border-gray-700 py-0.5 px-8 gap-2" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        {" "}
        <PiSuitcaseSimple className="text-lg sm:text-xl" /> Área laboral: todas
      </button>
      {isDropdownOpen && (
        <>
          {
            items.map((item, i) => (
              <li key={i} className={`transition-all ${isDropdownOpen ? "h-fit" : "h-0"}`}>{item}</li>
            ))
          }
        </>
      )}
    </ul>
  );
}

export default Dropdown;