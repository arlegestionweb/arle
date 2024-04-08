"use server";

export const uploadImages = (form: FormData) => {
  console.log('File dropped', form.get("imageUpload"))
};
