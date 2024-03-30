const ProductCard = ({ product }: { product: any }) => {
  return (
    <div className="border border-black p-4">
      <h1>{product.variante.codigoDeReferencia}</h1>
      <p>{product.marca}</p>
      <p>{product.titulo}</p>
    </div>
  )
}

export default ProductCard;