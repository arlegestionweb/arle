"use server";
const EMAIL = "email@gmail.com";
const PASSWORD = "password";

export const validateUser = async (
  formState: { success: boolean; error: string | null },
  formData: FormData
) => {
  if (
    formData.get("email") === EMAIL &&
    formData.get("password") === PASSWORD
  ) {
    return {
      success: true,
      error: null,
    };
  } else {
    return {
      success: false,
      error: "Invalid credentials",
    };
  }
};
