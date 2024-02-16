"use client";
import { TFrontEndOrderSchema } from "@/sanity/queries/orders";
import { successAction as sendInvoice } from "../actions";
import { experimental_useFormStatus as useFormStatus} from "react-dom";

const SendInvoice = ({order}: {
  order: TFrontEndOrderSchema;
}) => {

  const [formState, formAction] = useFormState(sendInvoice, null);
  // console.log({formState})
  return (
    <form action={sendInvoice}>
      <input type="text" hidden name="order" value={JSON.stringify(order)} readOnly />
      <SubmitButton></SubmitButton>
    </form>
  );
}

export default SendInvoice;

function SubmitButton() {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" aria-disabled={pending} className="disabled:bg-red-400">
      Enviar
    </button>
  )
}