const WompiPayButton = ({amount, redirectUrl, reference, currency = "COP"}: {
  amount: number;
  reference: string;
  redirectUrl: string;
  currency?: string;
}) => {
  const publicKey = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY || "somepubclikey";

  if (!publicKey) {
    throw new Error("Wompi public key is not defined");
  }


  return (
    <form action={"https://checkout.wompi.co/p/"} method="Get">
      <input type="hidden" name="public-key" value={process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY} />
      <input type="hidden" name="currency" value={currency} />
      <input type="hidden" name="amount-in-cents" value={amount * 100} />
      <input type="hidden" name="reference" value={reference} />
      <input type="hidden" name="redirect-url" value={redirectUrl} />
      <button type="submit" className="bg-yellow-500 p-5 rounded">
        Pagar con Wompi {amount}
      </button>
    </form>
  );
}

export default WompiPayButton;