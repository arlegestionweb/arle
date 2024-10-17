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
		const savedData = JSON.parse(localStorage.getItem("shippingData") || "{}");
    const clientData = {
      name: savedData.name as string,
      email: savedData.email as string,
      phone: savedData.phone as string
    }
		productPixelView(productObject, clientData, externalId);
	}, [])

  return (<></>)
}

export default ProductViewer