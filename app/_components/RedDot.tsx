import dynamic from "next/dynamic";

const positions = {
  topLeft: "-top-1 -left-1",
  topRight: "-top-1 -right-1",
  centerLeft: "-top-1 left-1/2 -translate-x-1/2",
  centerRight: "top-1/2 -right-4 -translate-y-1/2",
};

const RedDot = ({
  position = "topRight",
  active = true,
}: {
  position?: keyof typeof positions;
  active?: boolean;
}) => {
  return (
    <div
      className={`absolute ${positions[position]} ${active ? "" : "hidden"}`}
    >
      <div className="w-2 h-2 relative">
        <div className="w-2 h-2 left-0 top-0 absolute bg-red-700 rounded-full" />
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(RedDot), { ssr: false });
