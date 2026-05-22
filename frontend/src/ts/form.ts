import { sendContactForm, type ContactFormData } from "./api";
import { validateContactForm } from "./validation";

const formId = "contact-form";
const submitId = "contact-submit";
const loadingId = "contact-loading";
const successId = "contact-success";
const errorId = "contact-error";

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

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = getFormData(form);
    const validation = validateContactForm(data);

    clearStatuses(loadingElement, successElement, errorElement);

    if (!validation.isValid) {
      setStatus(errorElement, validation.message);
      return;
    }

    submitButton.disabled = true;
    setStatus(loadingElement, "Sending message...");

    try {
      const response = await sendContactForm(data);

      form.reset();
      setStatus(successElement, response.message || "Message sent successfully.");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      setStatus(errorElement, message);
    } finally {
      submitButton.disabled = false;
      loadingElement.hidden = true;
    }
  });
}
