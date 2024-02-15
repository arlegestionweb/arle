"use client";
import { TFrontEndOrderSchema } from "@/sanity/queries/orders";
import { successAction as sendInvoice } from "../actions";

const SendInvoice = ({order}: {
  order: TFrontEndOrderSchema;
}) => {
  // console.log({order})
  return (
    <form action={sendInvoice}>
      <input type="text" hidden name="order" value={JSON.stringify(order)} readOnly />
      <button>enviar factura</button>
    </form>
  );
}

export default SendInvoice;