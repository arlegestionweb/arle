const PriceRange = () => {
  return (
    <div className="flex w-full relative h-5 items-center bg-purple-300">
      <Ball position={0} />
      <Ball position={100} />
      <Bar />
    </div>
  );
};

export default PriceRange;

const Ball = ({position = 0}: {
  position: number;
}) => {
  return <div style={{left: `${position}%`}} className="absolute top-1/2 -translate-y-1/2 w-5 h-5 p-1 bg-white rounded-full shadow" />;
};


const Bar = () => {
  return (
    <div className="h-1 w-full bg-neutral-200"></div>
  )
}