const SmallWhiteSpinner = () => {
    return (
      <div className="bg-white h-6 w-6 rounded-full flex items-center justify-center">
        <div className="bg-black w-full h-2 transition-all items-center justify-center flex animate-spin">
          <div className="bg-black h-4 w-4 rounded-full " />
        </div>
      </div>
    );
  };
  
  export default SmallWhiteSpinner;