import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/svg'
 
// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
					background: '#101432',
          borderRadius: '50%',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="22,5" height="18" viewBox="0 0 130 104" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M128.465 75.9424V76.2262C128.465 87.1139 124.425 101.175 104.194 101.175H97.9923V101.162C91.4194 101.162 87.468 98.2724 83.133 88.7522L69.514 52.1032L66.688 44.5051C69.1944 49.4974 73.6573 52.4644 76.2532 53.7802V60.7462L86.1764 88.7522C87.7238 92.1449 89.1176 94.6862 90.4731 96.5696V56.9536H95.601C109.667 56.9536 112.43 66.4867 112.43 73.0141H113.926V46.0531H112.43C112.43 50.7358 110.141 54.1027 100.691 54.1027H96.2915C82.2123 54.1027 76.2404 46.1047 76.2404 37.2424C76.2404 25.5163 86.266 20.137 100.627 20.0338C116.752 20.137 128.056 30.7666 128.056 41.5639H129.552V17.1441L95.0895 17.1183L107.442 0H90.2685V17.1183H87.3401C74.1816 17.1441 64.8465 25.555 64.8465 36.6103C64.8465 38.2228 65.0639 39.7063 65.422 41.0866L61.2915 29.9539L56.5345 17.1312H32.1228H29.9233V19.9821C40.0384 19.9821 42.2506 21.7107 43.5422 25.0131L15.6138 89.165C10.9463 99.0077 6.9821 101.123 0 101.123L0.0255614 101.136H0V104H2.19949H25.4987V101.136C19.1944 101.136 14.0665 100.233 19.2455 87.9137L28.6573 66.3061C28.5038 67.8541 28.67 69.2086 29.0665 70.4212C33.1458 82.8311 63.5805 79.4899 69.0793 90.0809L70.0383 92.5061C71.2532 96.3632 68.7979 101.123 60.0383 101.123V103.987H61.266H62.2378H96.2276H98.0307H130V75.9037H128.683H128.465V75.9424ZM39.3606 41.809L38.913 42.7765L45.0128 28.7671L45.6394 30.3538L65.3197 80.5478L66.445 83.4116C58.8747 70.7438 24.9361 74.8718 39.3606 41.809Z" fill="white"/>
        </svg>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    }
  )
}