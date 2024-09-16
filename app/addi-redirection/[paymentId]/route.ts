import { getOrderById } from "@/sanity/queries/orders";
import { redirect } from "next/navigation";

type Params = {
    paymentId: string
  }

  export async function GET( context: { params: Params }) {
    const paymentId = context.params.paymentId // '1'

    const order = await getOrderById(paymentId);

    if (!order) return new Response("Order not found", { status: 404 });

    if (order.status === "PAID") {
        redirect(`/success/${paymentId}`);
    }

    redirect(`/error-procesando-pago`);
}