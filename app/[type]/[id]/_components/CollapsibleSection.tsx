"use client";

import { useState } from "react";
import RedDot from "@/app/_components/RedDot";
import { FaMinus, FaPlus } from "react-icons/fa6";

const CollapsibleProductSection = ({
  children,
  classNames,
  title,
  titleActive,
}: {
  children: React.ReactNode;
  classNames?: string;
  title?: string;
  titleActive?: boolean;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleIsCollapsed = () => setIsCollapsed(!isCollapsed);
  return (
    <section className={`relative border-b border-stone-300 pb-[24px] ${classNames}`}>
      {title && (
        <h2 className="text-zinc-800 text-lg font-bold w-fit font-tajawal leading-snug mb-[20.5px] relative">
          {title}
          {titleActive && <RedDot position="centerRight" />} 
        </h2>
      )}
      <button
        className="absolute top-0 right-0 w-7 h-7 bg-color-bg-surface-0-default grid place-content-center"
        onClick={toggleIsCollapsed}
      >
        {isCollapsed ? <FaPlus className="text-xs" /> : <FaMinus className="text-xs" />}
      </button>
      {!isCollapsed && <>{children}</>}
    </section>
  );
};

export default CollapsibleProductSection;
