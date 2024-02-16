"use client";
import { TFrontEndOrderSchema } from "@/sanity/queries/orders";
import { successAction as sendInvoice } from "../actions";
import SubmitButton from "./SubmitButton";
import { useFormState } from "react-dom";

const SendInvoice = ({order}: {
  order: TFrontEndOrderSchema;
}) => {
  // console.log({order})
  const [formState, formAction] = useFormState(sendInvoice, null);

  console.log({formState})
  return (
    <form action={formAction}>
      <input type="text" hidden name="order" value={JSON.stringify(order)} readOnly />
      <SubmitButton>enviar factura</SubmitButton>
    </form>
  );
}

export default SendInvoice;