"use client";

import { useState } from "react";
import RedDot from "@/app/_components/RedDot";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { cn } from "@/app/_lib/utils";

const CollapsibleProductSection = ({
  children,
  title,
  collapsed = true,
}: {
  children: React.ReactNode;
  title?: string;
  collapsed?: boolean;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  const toggleIsCollapsed = () => setIsCollapsed(!isCollapsed);
  return (
    <section className={`flex flex-col w-full transition-all duration-300 items-start justify-start border-b border-gray-300 pt-1.5 ${isCollapsed ? "max-h-10" : "max-h-screen"}`}>

    <button onClick={toggleIsCollapsed} className={`group w-full relative flex justify-between ease-in-out ${isCollapsed ? "max-h-10" : "max-h-screen"}`}>
      {title && (
        <h2 className="group-hover:text-gray-600 group-hover:underline underline-offset-1 text-gray-700 text-lg pt-2 font-bold font-tajawal leading-none relative">
          {title}
        </h2>
      )}
      <span className="w-7 h-7 bg-color-bg-surface-0-default grid place-content-center">
        {isCollapsed ? <FaPlus className="text-xs" /> : <FaMinus className="text-xs" />}
      </span>
    </button>
      <span className={cn("transition-all duration-300 py-3 flex justify-start w-full", isCollapsed ? "opacity-0" : "opacity-100")}>
      {children}
      </span>
      </section>
  );
};

export default CollapsibleProductSection;
