"use server";

import { sanityWriteClient } from "@/sanity/sanityClient";

export const saveImageArrayToSanity = async (
  formState: {
    message: string;
    status: string;
    images:
      | {
          _id: string;
          url: string;
        }[]
      | undefined;
  },
  formData: FormData
) => {
  const imageFiles = formData.getAll("imageUpload") as File[];

  if (!imageFiles.length) {
    return {
      status: "error",
      message: "No image files found",
      images: undefined,
    };
  }

  let errors: unknown[] = [];
  const images = await Promise.all(
    imageFiles.map(async (imageFile) => {
      const sanityResp = await sanityWriteClient.assets.upload(
        "image",
        imageFile,
        {
          filename: imageFile.name,
        }
      );

      if (!sanityResp._id && !sanityResp.url) {
        errors.push(sanityResp);
      }

      return {
        url: sanityResp.url,
        _id: sanityResp._id,
      };
    })
  );

  if (errors.length > 0) {
    console.log({ errors });
    return {
      status: "error",
      message: "Error uploading images to sanity",
      images: undefined,
    };
  }
  return {
    status: "success",
    message: "Images uploaded to sanity",
    images: images,
  };
};
