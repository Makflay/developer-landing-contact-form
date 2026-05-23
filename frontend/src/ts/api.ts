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

console.log("import.meta.env.VITE_API_URL", import.meta.env.VITE_API_URL);

const CONTACT_ENDPOINT = `${import.meta.env.VITE_API_URL}/api/contact`;

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
