import type { ContactFormData } from "./api";

export type ContactFormValidationResult = {
  isValid: boolean;
  message: string;
  field?: keyof ContactFormData;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(
  data: ContactFormData,
): ContactFormValidationResult {
  if (!data.name.trim()) {
    return { isValid: false, message: "Please enter your name.", field: "name" };
  }

  if (!data.phone.trim()) {
    return {
      isValid: false,
      message: "Please enter your phone number.",
      field: "phone",
    };
  }

  if (!data.email.trim()) {
    return {
      isValid: false,
      message: "Please enter your email.",
      field: "email",
    };
  }

  if (!emailPattern.test(data.email)) {
    return {
      isValid: false,
      message: "Please enter a valid email address.",
      field: "email",
    };
  }

  if (!data.comment.trim()) {
    return {
      isValid: false,
      message: "Please enter your comment.",
      field: "comment",
    };
  }

  return { isValid: true, message: "" };
}
