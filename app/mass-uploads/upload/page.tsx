import Main from "@/app/_components/Main";

import UploadFiles from "./_components/UploadFiles";
import { unstable_noStore } from "next/cache";


const Page = () => {
  unstable_noStore();
  return (
    <Main extraClasses="z-auto flex flex-col items-center min-h-screen">
      <UploadFiles />
    </Main>
  );
}

export default Page;