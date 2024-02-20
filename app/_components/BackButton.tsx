"use client"

import { GoChevronLeft } from "react-icons/go"

const BackButton = () => {
    return (
        <button
          className="flex items-center -ml-1 group"
          onClick={() => window.history.back()}
        >
          <GoChevronLeft className="text-lg text-gray-700 group-hover:text-gray-500" />
          <span className="text-gray-700 text-base font-normal font-inter leading-[21px] underline-offset-2 group-hover:underline group-hover:text-gray-500">
            Volver
          </span>
        </button>
    )
}

export default BackButton;