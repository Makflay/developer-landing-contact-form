import type { ContactFormData } from "./api";

export type ContactFormValidationResult = {
  isValid: boolean;
  message: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(
  data: ContactFormData,
): ContactFormValidationResult {
  if (!data.name.trim()) {
    return { isValid: false, message: "Please enter your name." };
  }

  if (!data.phone.trim()) {
    return { isValid: false, message: "Please enter your phone number." };
  }

  if (!data.email.trim()) {
    return { isValid: false, message: "Please enter your email." };
  }

  if (!emailPattern.test(data.email)) {
    return { isValid: false, message: "Please enter a valid email address." };
  }

  if (!data.comment.trim()) {
    return { isValid: false, message: "Please enter your comment." };
  }

  return { isValid: true, message: "" };
}
