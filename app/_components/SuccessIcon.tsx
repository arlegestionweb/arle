import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SuccessIcon = ({width, failiure}: {width?: number, failiure?: boolean | false}) => {
    return (
      <div className={`${width ? "w-["+width+"px]" : "w-28"} aspect-square ${failiure ? "bg-red-300" : "bg-green-300"} rounded-full  flex items-center justify-center p-[0.8%] `}>
        <div className={`${failiure ? "bg-red-500" : "bg-green-500"} h-full w-full rounded-full flex items-center justify-center p-[18%]`}>
          {failiure ? (
            <IoMdClose className="w-full h-full text-white"/>
          ):(
        <FaCheck className="w-full h-full text-white animate-vote" />
          )}
        </div>
      </div>
    );
  };
  
  export default SuccessIcon;