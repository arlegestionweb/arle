"use server";

const EMAIL = "julian.m.bustos@gmail.com";
const PASSWORD = "password";

export const validateUser = async (
  formState: { success: boolean; error: string | null},
  formData: FormData
) => {
  console.log({
    username: formData.get("email"),
    password: formData.get("password"),
  });

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


export const generateExcelFile = async () => {
  console.log("Generating excel file");
  // Generate excel file
}
