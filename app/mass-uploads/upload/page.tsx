import Main from "@/app/_components/Main";

import UploadFiles from "./_components/UploadFiles";


const Page = () => {

  return (
    <Main extraClasses="z-auto flex flex-col items-center min-h-screen">
      <UploadFiles />
    </Main>
  );
}

export default Page;