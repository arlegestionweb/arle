import { getOrderById } from "@/sanity/queries/orders";
import { redirect } from "next/navigation";

type Params = {
    paymentId: string
  }

    export async function GET(
      request: Request,
      { params }: { params: Params }
    ) {
    const paymentId = params.paymentId // '1'

    console.log({paymentId});

    const order = await getOrderById(paymentId);

    if (!order) return new Response("Order not found", { status: 404 });

    if (order.status === "PAID") {
        redirect(`/success/${paymentId}`);
    }

    redirect(`/error-procesando-pago`);
}