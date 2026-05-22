export type ContactFormData = {
  name: string;
  phone: string;
  email: string;
  comment: string;
};

export type ContactFormResponse = {
  success: boolean;
  message: string;
};

const CONTACT_ENDPOINT = "http://localhost:5000/api/contact";

export async function sendContactForm(
  data: ContactFormData,
): Promise<ContactFormResponse> {
  const response = await fetch(CONTACT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = (await response.json()) as ContactFormResponse;

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to send message.");
  }

  return result;
}
