"use server";
const EMAIL = "arleweb8@gmail.com";
const PASSWORD = "Pagwebarle5440";

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
