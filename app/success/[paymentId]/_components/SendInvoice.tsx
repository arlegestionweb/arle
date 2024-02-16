import { TFrontEndOrderSchema } from "@/sanity/queries/orders";
import { successAction as sendInvoice } from "../actions";
import SubmitButton from "./SubmitButton";

const SendInvoice = ({order}: {
  order: TFrontEndOrderSchema;
}) => {
  // console.log({order})
  return (
    <form action={sendInvoice}>
      <input type="text" hidden name="order" value={JSON.stringify(order)} readOnly />
      <SubmitButton>enviar factura</SubmitButton>
    </form>
  );
}

export default SendInvoice;