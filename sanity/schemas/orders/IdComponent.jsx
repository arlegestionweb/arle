import { useFormValue } from "sanity";

const IdComponent = () => {
  const docId = String(useFormValue(["_id"])).replace("drafts.", "");

  return (
    <>{docId}</>
  )
}

export default IdComponent;