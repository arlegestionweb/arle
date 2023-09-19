import React from "react";

const AboutArle = () => {
  return (
    <div className="w-screen h-[599px] pt-6 px-4 bg-slate-950 border-b border-slate-500 flex-col justify-start items-center gap-[25px] inline-flex">
      <div className="self-stretch justify-center items-start gap-2.5 inline-flex">
        <div className="grow shrink basis-0 px-4 flex-col justify-start items-start gap-2 inline-flex">
          <div className="self-stretch text-center text-zinc-100 text-[28px] font-semibold font-['Lora'] leading-loose">
            About Arlé
          </div>
          <div className="self-stretch text-zinc-100 text-base font-normal font-raleway leading-tight">
            Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar
            elementum tempus hac tellus libero accumsan. Lorem ipsum dolor sit
            amet consectetur adipiscing elit semper dalar elementum tempus hac
            tellus libero accumsan.{" "}
          </div>
        </div>
      </div>
      <div className="self-stretch relative h-[377px] flex-col justify-end items-center gap-2.5 flex">
        {/* <div className="w-80 h-[281px] left-0 top-[96px] absolute bg-gradient-to-b from-black to-black"></div> */}
        <div className="self-stretch h-[92px] px-4 py-6 flex-col justify-end items-center gap-2.5 flex">
          <div className="self-stretch px-4 py-[8.50px] bg-white justify-center items-center gap-1 inline-flex">
            <div className="justify-center items-center gap-2.5 flex">
              <div className="text-zinc-800 text-lg font-medium font-['Inter'] leading-[27px]">
                Listen our poadcast
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutArle;
