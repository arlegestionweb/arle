"use server";

import { sanityWriteClient } from "@/sanity/sanityClient";

export const saveImageToSanity = async (
  formState: {
    status: string;
    message: string;
    image: { url: string; _id: string } | undefined;
  },
  formData: FormData
) => {
  const imageFile = formData.get("imageUpload") as File;

  if (!imageFile) {
    return {
      status: "error",
      image: undefined,
      message: "No image file found",
    };
  }
  const sanityResp = await sanityWriteClient.assets.upload("image", imageFile, {
    filename: imageFile.name,
  });

  if (!sanityResp._id && !sanityResp.url) {
    return {
      status: "error",
      image: undefined,
      message: "Failed to upload image to sanity",
    };
  }

  return {
    status: "success",
    message: sanityResp._id,
    image: {
        url: sanityResp.url,
        _id: sanityResp._id
    }
  };
};
