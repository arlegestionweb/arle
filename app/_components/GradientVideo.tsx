// import { useRef, useState } from "react";
import { RiPlayMiniLine } from "react-icons/ri";

type GradientVideoProps = {
  url: string;
  imagenUrl?: string;
  imagenAlt?: string;
  containerclassName?: string;
  children?: React.ReactNode;
  gradientOff?: boolean;
};

function GradientVideo({
  url,
  imagenUrl,
  imagenAlt,
  containerclassName,
  children,
  gradientOff,
}: GradientVideoProps) {


  // const [pauseVideo, setPauseVideo] = useState(false);

  // const videoRef = useRef<HTMLVideoElement>(null);
  // const playButtonHandler = () => {
  //   if (videoRef.current) {
  //     if (!pauseVideo) {
  //       videoRef.current.play();
  //       setPauseVideo(true);
  //     } else {
  //       videoRef.current.pause();
  //       setPauseVideo(false);
  //     }
  //   }
  // };

  return (
    <div className={`relative h-full w-full ${containerclassName}`}>
      <video
        // ref={videoRef}
        className="h-full w-full absolute object-cover"
        playsInline
        loop
        autoPlay
        muted
        preload="metadata"
        poster={imagenUrl}
        >
          <source src={url} />
          {imagenUrl && (
          <img src={imagenUrl} alt={imagenAlt} />
          )}
      </video>
      {/* <div
        className={cn("absolute top-0 transition-all ease-out duration-200 bg-gradient-to-t from-black to-transparent opacity-80 right-0 w-full h-full  flex justify-center items-center", {"opacity-0": pauseVideo})}
        onClick={playButtonHandler}>
        <div className="w-16 h-16 p-[7px] opacity-50 bg-neutral-100 justify-center items-center inline-flex">
          <RiPlayMiniLine
            size={30}
            color={"#000"}
          />
        </div>
      </div> */}
      {/* Gradient */}
      {!gradientOff && (
        <div className={`w-full h-full left-0 bottom-0 absolute bg-gradient-to-t from-black to-transparent opacity-70`} />
      )}

      {/* content */}
      {children}
    </div>
  );
}

export default GradientVideo;
