"use client"
import { ProductTypes, productView } from "@/app/_lib/pixelActions"
import { useEffect } from "react"

type ObjectType = {
    productObject: ProductTypes
}
const ProductViewer = ({productObject}: ObjectType) => {

	useEffect( () => {
		productView(productObject);
	}, [])

  return (<></>)
}

export default ProductViewer