import * as Yup from "yup";

export function initialValues() {
  return {
    selectedLanguage: "",
  };
}

export function validationSchema() {
  return Yup.object({
    selectedLanguage: Yup.string().required(true)
  });
}