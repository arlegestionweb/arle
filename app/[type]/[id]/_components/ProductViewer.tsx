"use client"
import { ProductTypes, productPixelView } from "@/app/_lib/pixelActions"
import { getOrSetExternalIdPixel } from "@/app/_lib/utils"
import { useEffect } from "react"

type ObjectType = {
    productObject: ProductTypes
}
const ProductViewer = ({productObject}: ObjectType) => {

	useEffect( () => {
		const externalId = getOrSetExternalIdPixel()
		productPixelView(productObject, externalId);
	}, [])

  return (<></>)
}

export default ProductViewer