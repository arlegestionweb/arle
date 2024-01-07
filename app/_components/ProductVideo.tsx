import { useRef, useState } from "react";
import { RiPlayMiniLine } from "react-icons/ri";
import { cn } from "../_lib/utils";

type ProductVideoProps = {
  url: string;
};

const ProductVideo = ({ url }: ProductVideoProps) => {
  console.log(url);

  const [pauseVideo, setPauseVideo] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const playButtonHandler = () => {
    console.log("ho");
    if (videoRef.current) {
      if (!pauseVideo) {
        videoRef.current.play();
        setPauseVideo(true);
      } else {
        videoRef.current.pause();
        setPauseVideo(false);
      }
    }
  };
  return (
    <section className="relative h-full w-full">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={url}>
        Your browser does not support the video tag.
      </video>
      <div
        className={cn("absolute top-0 transition-all ease-out duration-200 bg-gradient-to-t from-black to-transparent opacity-80 right-0 w-full h-full  flex justify-center items-center", {"opacity-0": pauseVideo})}
        onClick={playButtonHandler}>
        <div className="w-16 h-16 p-[7px] opacity-50 bg-neutral-100 justify-center items-center inline-flex">
          <RiPlayMiniLine
            size={30}
            color={"#000"}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductVideo;
