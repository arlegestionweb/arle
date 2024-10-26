export type TFormState = {
  success: boolean;
  errors: { path: string, message: string }[] | null;
};