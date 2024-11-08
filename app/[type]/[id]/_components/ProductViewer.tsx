"use client"
import { ProductTypes, productPixelView } from "@/app/_lib/pixelActions"
import { getOrSetExternalIdPixel } from "@/app/_lib/utils"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

type ObjectType = {
    productObject: ProductTypes
}
const ProductViewer = ({productObject}: ObjectType) => {
  const searchParams = useSearchParams();

	useEffect( () => {
		const externalId = getOrSetExternalIdPixel()
		const savedData = JSON.parse(localStorage.getItem("shippingData") || "{}");
    const searchfbclid = searchParams.get("fbclid") || null;
    if(searchfbclid) {
      const timeInMillis = Date.now();
      const setFbclid = `fb.1.${timeInMillis}.${searchfbclid}`
      localStorage.setItem("fbclid",setFbclid)
    };
    const fbclid = localStorage.getItem("fbclid") || null;
    const clientData = {
      name: savedData.name as string,
      email: savedData.email as string,
      phone: savedData.phone as string
    }
		productPixelView(productObject, clientData, externalId, fbclid);
	}, [])

  return (<></>)
}

export default ProductViewer