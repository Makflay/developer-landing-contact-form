import { sendContactForm, type ContactFormData } from "./api";
import { validateContactForm } from "./validation";

const formId = "contact-form";
const submitId = "contact-submit";
const loadingId = "contact-loading";
const successId = "contact-success";
const errorId = "contact-error";
const invalidInputClass = "contact-form__input--invalid";
const invalidTextareaClass = "contact-form__textarea--invalid";
const loadingFormClass = "contact-form--loading";

type ContactFormFieldName = keyof ContactFormData;

function getInputValue(form: HTMLFormElement, fieldName: string): string {
  const field = form.elements.namedItem(fieldName);

  if (
    field instanceof HTMLInputElement ||
    field instanceof HTMLTextAreaElement
  ) {
    return field.value.trim();
  }

  return "";
}

function getFormData(form: HTMLFormElement): ContactFormData {
  return {
    name: getInputValue(form, "name"),
    phone: getInputValue(form, "phone"),
    email: getInputValue(form, "email"),
    comment: getInputValue(form, "comment"),
  };
}

function getFieldElement(
  form: HTMLFormElement,
  fieldName: ContactFormFieldName,
): HTMLInputElement | HTMLTextAreaElement | null {
  const field = form.elements.namedItem(fieldName);

  if (
    field instanceof HTMLInputElement ||
    field instanceof HTMLTextAreaElement
  ) {
    return field;
  }

  return null;
}

function setStatus(element: HTMLElement, message = ""): void {
  if (message) {
    element.textContent = message;
  }

  element.hidden = !message;
}

function clearStatuses(
  loadingElement: HTMLElement,
  successElement: HTMLElement,
  errorElement: HTMLElement,
): void {
  loadingElement.hidden = true;
  successElement.hidden = true;
  errorElement.hidden = true;
}

function setFieldInvalid(
  form: HTMLFormElement,
  fieldName: ContactFormFieldName,
): void {
  const field = getFieldElement(form, fieldName);

  if (!field) {
    return;
  }

  const invalidClass =
    field instanceof HTMLTextAreaElement ? invalidTextareaClass : invalidInputClass;

  field.classList.add(invalidClass);
  field.setAttribute("aria-invalid", "true");
  field.focus();
}

function clearFieldInvalid(field: HTMLInputElement | HTMLTextAreaElement): void {
  field.classList.remove(invalidInputClass, invalidTextareaClass);
  field.removeAttribute("aria-invalid");
}

function clearInvalidFields(form: HTMLFormElement): void {
  const fields: ContactFormFieldName[] = ["name", "phone", "email", "comment"];

  fields.forEach((fieldName) => {
    const field = getFieldElement(form, fieldName);

    if (field) {
      clearFieldInvalid(field);
    }
  });
}

export function initContactForm(): void {
  const form = document.getElementById(formId);
  const submitButton = document.getElementById(submitId);
  const loadingElement = document.getElementById(loadingId);
  const successElement = document.getElementById(successId);
  const errorElement = document.getElementById(errorId);

  if (
    !(form instanceof HTMLFormElement) ||
    !(submitButton instanceof HTMLButtonElement) ||
    !(loadingElement instanceof HTMLElement) ||
    !(successElement instanceof HTMLElement) ||
    !(errorElement instanceof HTMLElement)
  ) {
    return;
  }

  let isSubmitting = false;
  const submitButtonText = submitButton.textContent?.trim() || "Send message";
  const fields: ContactFormFieldName[] = ["name", "phone", "email", "comment"];

  fields.forEach((fieldName) => {
    const field = getFieldElement(form, fieldName);

    field?.addEventListener("input", () => {
      clearFieldInvalid(field);
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const data = getFormData(form);
    const validation = validateContactForm(data);

    clearStatuses(loadingElement, successElement, errorElement);
    clearInvalidFields(form);

    if (!validation.isValid) {
      setStatus(errorElement, validation.message);
      if (validation.field) {
        setFieldInvalid(form, validation.field);
      }
      return;
    }

    isSubmitting = true;
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    form.classList.add(loadingFormClass);
    form.setAttribute("aria-busy", "true");
    setStatus(loadingElement, "Sending message...");

    try {
      const response = await sendContactForm(data);

      form.reset();
      clearInvalidFields(form);
      setStatus(successElement, response.message || "Message sent successfully.");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      setStatus(errorElement, message);
    } finally {
      isSubmitting = false;
      submitButton.disabled = false;
      submitButton.textContent = submitButtonText;
      form.classList.remove(loadingFormClass);
      form.removeAttribute("aria-busy");
      loadingElement.hidden = true;
    }
  });
}
