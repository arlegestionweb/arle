const Spinner = () => {
  return (
    <div className="bg-arle-blue h-12 w-12 rounded-full flex items-center justify-center">
      <div className="bg-white w-full h-4 transition-all items-center justify-center flex animate-spin">
        <div className="bg-white h-9 w-9 rounded-full " />
      </div>
    </div>
  );
};

export default Spinner;